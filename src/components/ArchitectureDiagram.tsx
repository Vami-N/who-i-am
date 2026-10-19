import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import {
  boundary,
  edges,
  nodes,
  scenarios,
  VIEW,
  type DiagramNode,
  type Scenario,
  type ScenarioStep,
} from '../data/architecture';
import { ui } from '../data/ui';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useI18n } from '../lib/i18n';

const STEP_MS = 720;
const PAUSE_MS = 1700;

const nodeById = new Map<string, DiagramNode>(nodes.map((n) => [n.id, n]));
const edgeById = new Map(edges.map((e) => [e.id, e]));

/** Polyligne aux coins arrondis → attribut `d` d’un <path>. */
function roundedPath(points: readonly [number, number][], radius = 12): string {
  const [first, ...rest] = points;
  let d = `M ${first[0]} ${first[1]}`;
  rest.forEach((point, i) => {
    const prev = points[i];
    const next = points[i + 2];
    if (!next) {
      d += ` L ${point[0]} ${point[1]}`;
      return;
    }
    const v1: [number, number] = [point[0] - prev[0], point[1] - prev[1]];
    const v2: [number, number] = [next[0] - point[0], next[1] - point[1]];
    const l1 = Math.hypot(...v1);
    const l2 = Math.hypot(...v2);
    const r = Math.min(radius, l1 / 2, l2 / 2);
    const a: [number, number] = [point[0] - (v1[0] / l1) * r, point[1] - (v1[1] / l1) * r];
    const b: [number, number] = [point[0] + (v2[0] / l2) * r, point[1] + (v2[1] / l2) * r];
    d += ` L ${a[0]} ${a[1]} Q ${point[0]} ${point[1]} ${b[0]} ${b[1]}`;
  });
  return d;
}

const edgePaths = new Map(edges.map((e) => [e.id, roundedPath(e.points)]));

const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

/** Nœud vers lequel le paquet se dirige à cette étape. */
function destination(step: ScenarioStep): string {
  const edge = edgeById.get(step.edge);
  if (!edge) return '';
  return step.reverse ? edge.from : edge.to;
}

function scenarioIndex(scenario: Scenario) {
  const byEdge = new Map<string, number[]>();
  const touched = new Set<string>();
  scenario.steps.forEach((step, i) => {
    byEdge.set(step.edge, [...(byEdge.get(step.edge) ?? []), i]);
    const edge = edgeById.get(step.edge);
    if (edge) {
      touched.add(edge.from);
      touched.add(edge.to);
    }
  });
  return { byEdge, touched };
}

export function ArchitectureDiagram() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, '');

  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];
  const total = scenario.steps.length;

  // step ∈ [0, total-1] : un paquet voyage ; step === total : pause / repos.
  const [step, setStep] = useState(total);
  const [hovered, setHovered] = useState<string | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const packetRef = useRef<SVGGElement>(null);
  const pathRefs = useRef(new Map<string, SVGPathElement>());
  const visibleRef = useRef(true);

  const { byEdge, touched } = useMemo(() => scenarioIndex(scenario), [scenario]);

  // Ne fait tourner l’animation que lorsque le schéma est visible.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry?.isIntersecting ?? true;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Boucle d’animation du paquet.
  useEffect(() => {
    const packet = packetRef.current;
    if (packet) packet.style.opacity = '0';
    if (reduced) {
      setStep(total);
      return;
    }

    const cycle = total * STEP_MS + PAUSE_MS;
    const start = performance.now();
    let lastStep = -2;
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visibleRef.current || document.hidden || !packet) return;

      // (le timestamp de rAF peut précéder `start` d'une fraction de frame)
      const elapsed = Math.max(0, performance.now() - start) % cycle;
      const index = elapsed < total * STEP_MS ? Math.floor(elapsed / STEP_MS) : total;
      if (index !== lastStep) {
        lastStep = index;
        setStep(index);
      }

      if (index >= total) {
        packet.style.opacity = '0';
        return;
      }
      const current = scenario.steps[index];
      const path = pathRefs.current.get(current.edge);
      if (!path) return;
      const progress = easeInOut((elapsed - index * STEP_MS) / STEP_MS);
      const length = path.getTotalLength();
      const point = path.getPointAtLength((current.reverse ? 1 - progress : progress) * length);
      packet.setAttribute('transform', `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
      packet.dataset.dir = current.reverse ? 'back' : 'fwd';
      packet.style.opacity = '1';
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [scenario, total, reduced]);

  const running = step < total;
  const currentStep = running ? scenario.steps[step] : undefined;
  const hotNode = currentStep ? destination(currentStep) : '';
  const hoveredNode = hovered ? nodeById.get(hovered) : undefined;

  const caption = hoveredNode
    ? { tag: hoveredNode.title, text: t(hoveredNode.desc), kind: 'node' as const }
    : currentStep
      ? { tag: `${step + 1}/${total}`, text: t(currentStep.label), kind: 'step' as const }
      : { tag: t(scenario.title), text: t(scenario.summary), kind: 'summary' as const };

  const selectScenario = (id: string) => {
    if (id === scenarioId) return;
    setScenarioId(id);
    setStep(scenarios.find((s) => s.id === id)?.steps.length ?? 0);
  };

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const dir = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    event.preventDefault();
    const next = scenarios[(i + dir + scenarios.length) % scenarios.length];
    selectScenario(next.id);
    document.getElementById(`${uid}-tab-${next.id}`)?.focus();
  };

  return (
    <div className="diagram" ref={wrapRef}>
      <div className="diagram__bar">
        <div>
          <p className="diagram__eyebrow">{t(ui.diagram.eyebrow)}</p>
          <p className="diagram__note">{t(ui.diagram.note)}</p>
        </div>
        <div className="tabs" role="tablist" aria-label={t(ui.diagram.scenarios)}>
          {scenarios.map((s, i) => {
            const selected = s.id === scenarioId;
            return (
              <button
                key={s.id}
                id={`${uid}-tab-${s.id}`}
                type="button"
                role="tab"
                className="tabs__tab"
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectScenario(s.id)}
                onKeyDown={(event) => onTabKey(event, i)}
              >
                {t(s.title)}
              </button>
            );
          })}
        </div>
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${scenarioId}`}>
        <svg
          className="diagram__svg"
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          role="img"
          aria-label={t(ui.diagram.label)}
          onClick={() => setHovered(null)}
        >
          <defs>
            {(['dim', 'lit', 'hot'] as const).map((tone) => (
              <marker
                key={tone}
                id={`${uid}-arrow-${tone}`}
                viewBox="0 0 10 10"
                refX="8.5"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M1 1.5 8.8 5 1 8.5z" className={`arrow arrow--${tone}`} />
              </marker>
            ))}
          </defs>

          <g className="boundary">
            <rect x={boundary.x} y={boundary.y} width={boundary.w} height={boundary.h} rx={22} />
            <text x={boundary.x + 18} y={boundary.y + 21}>
              {t(ui.diagram.boundary)}
            </text>
          </g>

          <g className="edges">
            {edges.map((edge) => {
              const used = byEdge.get(edge.id) ?? [];
              const inScenario = used.length > 0;
              const isCurrent = running && used.includes(step);
              const isPast = !isCurrent && inScenario && (!running || used.some((i) => i < step));
              const tone = isCurrent ? 'hot' : isPast ? 'lit' : 'dim';
              return (
                <path
                  key={edge.id}
                  ref={(el) => {
                    if (el) pathRefs.current.set(edge.id, el);
                    else pathRefs.current.delete(edge.id);
                  }}
                  d={edgePaths.get(edge.id)}
                  className={`edge edge--${tone}${edge.dashed ? ' edge--dashed' : ''}${inScenario ? ' is-scenario' : ''}`}
                  markerEnd={`url(#${uid}-arrow-${tone})`}
                />
              );
            })}
          </g>

          <g className="nodes">
            {nodes.map((node) => {
              const classes = [
                'node',
                `node--${node.kind}`,
                touched.has(node.id) ? 'is-scenario' : '',
                hotNode === node.id ? 'is-hot' : '',
                hovered === node.id ? 'is-hover' : '',
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <g
                  key={node.id}
                  className={classes}
                  transform={`translate(${node.x} ${node.y})`}
                  tabIndex={0}
                  role="group"
                  aria-label={`${node.title} — ${t(node.desc)}`}
                  onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(node.id)}
                  onPointerLeave={(event) => event.pointerType === 'mouse' && setHovered(null)}
                  onClick={(event) => {
                    event.stopPropagation();
                    setHovered(node.id);
                  }}
                  onFocus={() => setHovered(node.id)}
                  onBlur={() => setHovered(null)}
                >
                  <rect className="node__box" width={node.w} height={node.h} rx={11} />
                  <rect className="node__tick" x={0} y={10} width={3} height={node.h - 20} rx={1.5} />
                  <text className="node__title" x={node.w / 2} y={node.sub ? node.h / 2 - 2 : node.h / 2 + 5} textAnchor="middle">
                    {node.title}
                  </text>
                  {node.sub ? (
                    <text className="node__sub" x={node.w / 2} y={node.h / 2 + 13} textAnchor="middle">
                      {t(node.sub)}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>

          <g ref={packetRef} className="packet" style={{ opacity: 0 }}>
            <circle className="packet__glow" r={10} />
            <circle className="packet__core" r={4} />
          </g>
        </svg>

        <div className={`diagram__caption diagram__caption--${caption.kind}`}>
          <span className="diagram__tag">{caption.tag}</span>
          <p>{caption.text}</p>
        </div>
        <p className="diagram__hint">
          <span className="diagram__hint-hover">{t(ui.diagram.hint)}</span>
          <span className="diagram__hint-touch">{t(ui.diagram.hintTouch)}</span>
        </p>

        <ol className="visually-hidden" aria-label={t(ui.diagram.stepsLabel)}>
          {scenario.steps.map((s, i) => (
            <li key={i}>{t(s.label)}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
