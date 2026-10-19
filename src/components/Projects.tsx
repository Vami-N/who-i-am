import { Fragment, type CSSProperties } from 'react';
import type { NodeKind } from '../data/architecture';
import {
  archive,
  featured,
  infra,
  type ArchiveProject,
  type FeaturedProject,
  type InfraProject,
  type PipelineItem,
  type ProjectStatus,
} from '../data/projects';
import { ui } from '../data/ui';
import { formatMonth } from '../lib/format';
import { useI18n } from '../lib/i18n';
import { spotlight } from '../lib/spotlight';
import { ArrowUpRight, Check } from './Icons';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';

const KIND_VAR: Record<NodeKind, string> = {
  client: 'var(--text-dim)',
  edge: 'var(--flag-yellow)',
  gateway: 'var(--flag-yellow)',
  service: 'var(--flag-green)',
  bus: 'var(--flag-red)',
  data: 'var(--blue)',
  identity: 'var(--text-dim)',
  external: 'var(--text-dim)',
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  const { t } = useI18n();
  return (
    <span className={`status status--${status}`}>
      <span className="status__dot" aria-hidden="true" />
      {t(ui.projects.status[status])}
    </span>
  );
}

function ProjectLinks({ links }: { links?: { demo?: string; repo?: string } }) {
  const { t } = useI18n();
  if (!links || (!links.demo && !links.repo)) return null;
  return (
    <ul className="project__links">
      {links.demo ? (
        <li>
          <a className="link-arrow" href={links.demo} target="_blank" rel="noreferrer noopener">
            {t(ui.projects.seeDemo)} <ArrowUpRight size={15} />
            <span className="visually-hidden"> {t(ui.a11y.external)}</span>
          </a>
        </li>
      ) : null}
      {links.repo ? (
        <li>
          <a className="link-arrow" href={links.repo} target="_blank" rel="noreferrer noopener">
            {t(ui.projects.seeCode)} <ArrowUpRight size={15} />
            <span className="visually-hidden"> {t(ui.a11y.external)}</span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}

function Pipeline({ items }: { items: PipelineItem[] }) {
  const { t } = useI18n();
  return (
    <ol className="pipeline">
      {items.map((item, i) => (
        <li key={i} className="pipeline__item" style={{ '--kind': KIND_VAR[item.kind], '--i': i } as CSSProperties}>
          <span className="pipeline__dot" aria-hidden="true" />
          <span className="pipeline__label">
            {t(item.label)
              .split(' + ')
              .map((part, j) => (
                <Fragment key={part}>
                  {j > 0 ? <span className="pipeline__plus">+</span> : null}
                  {part}
                </Fragment>
              ))}
          </span>
          {item.sub ? <span className="pipeline__sub">{t(item.sub)}</span> : null}
        </li>
      ))}
    </ol>
  );
}

function FeaturedCard({ project, index, wide }: { project: FeaturedProject; index: number; wide?: boolean }) {
  const { t, lang } = useI18n();
  const chips = [...project.stack, ...(project.concepts ? project.concepts[lang] : [])];

  return (
    <article className={`card project${wide ? ' project--wide' : ''}`} onPointerMove={spotlight}>
      <header className="project__head">
        <span className="project__index">{String(index + 1).padStart(2, '0')}</span>
        <StatusBadge status={project.status} />
      </header>

      <div className="project__body">
        <div className="project__main">
          <h3 className="project__name">{project.name}</h3>
          <p className="project__tagline">{t(project.tagline)}</p>
          <p className="project__desc">{t(project.description)}</p>
          <ul className="checks">
            {t(project.highlights).map((line) => (
              <li key={line}>
                <Check size={16} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="project__arch">
          <p className="label">{t(ui.projects.architecture)}</p>
          <Pipeline items={project.pipeline} />
          {project.integrations.length > 0 ? (
            <>
              <p className="label">{t(ui.projects.integrations)}</p>
              <ul className="integrations">
                {project.integrations.map((integration) => (
                  <li key={integration.label} className="integrations__item">
                    <strong>{integration.label}</strong>
                    <span>{t(integration.role)}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>

      <footer className="project__foot">
        <p className="project__role">
          <span className="label">{t(ui.projects.role)}</span>
          {t(project.role)}
        </p>
        <ul className="chips">
          {chips.map((chip) => (
            <li key={chip} className="chip">
              {chip}
            </li>
          ))}
        </ul>
        <ProjectLinks links={project.links} />
      </footer>
    </article>
  );
}

function InfraCard({ project }: { project: InfraProject }) {
  const { t, lang } = useI18n();
  return (
    <article className="card infra" onPointerMove={spotlight}>
      <header className="project__head">
        <span className="project__index">{project.date ? formatMonth(project.date, lang) : project.label ? t(project.label) : ''}</span>
        <StatusBadge status={project.status} />
      </header>

      <div className="infra__body">
        <div className="infra__title">
          <h3 className="infra__name">{t(project.name)}</h3>
          <p className="project__tagline">{t(project.tagline)}</p>
        </div>

        <div className="infra__detail">
          <p className="project__desc">{t(project.description)}</p>

          {project.specs ? (
            <div className="spec" role="group" aria-label={t(ui.projects.spec.title)}>
              <dl className="spec__list">
                {project.specs.map((row) => (
                  <div key={row.label.en} className="spec__row">
                    <dt>{t(row.label)}</dt>
                    <dd>{t(row.value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <ul className="chips">
            {project.stack.map((chip) => (
              <li key={chip} className="chip">
                {chip}
              </li>
            ))}
          </ul>
          <ProjectLinks links={project.links} />
        </div>
      </div>
    </article>
  );
}

function ArchiveRow({ project }: { project: ArchiveProject }) {
  const { t } = useI18n();
  const { lang } = useI18n();
  return (
    <li className="archive__row">
      <span className="archive__date">{project.date ? formatMonth(project.date, lang) : '—'}</span>
      <div className="archive__main">
        <h4 className="archive__name">
          {t(project.name)}
          <span className="archive__cat">{t(project.category)}</span>
        </h4>
        <p className="archive__desc">{t(project.description)}</p>
      </div>
      <ul className="archive__tags">
        {t(project.tags).map((tag) => (
          <li key={tag} className="chip chip--quiet">
            {tag}
          </li>
        ))}
      </ul>
      <ProjectLinks links={project.links} />
    </li>
  );
}

export function Projects() {
  const { t } = useI18n();
  const [first, ...others] = featured;

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          index={ui.projects.index}
          label={t(ui.nav.projects)}
          title={t(ui.projects.title)}
          lead={t(ui.projects.lead)}
          titleId="projects-title"
        />

        <div className="featured">
          <Reveal>
            <FeaturedCard project={first} index={0} wide />
          </Reveal>
          <div className="featured__duo">
            {others.map((project, i) => (
              <Reveal key={project.id} delay={i * 90}>
                <FeaturedCard project={project} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>

        <h3 className="subhead subhead--spaced">{t(ui.projects.infraTitle)}</h3>
        <div className="infra-grid">
          {infra.map((project, i) => (
            <Reveal key={project.id} delay={i * 90}>
              <InfraCard project={project} />
            </Reveal>
          ))}
        </div>

        <h3 className="subhead subhead--spaced">{t(ui.projects.archiveTitle)}</h3>
        <Reveal>
          <ul className="archive">
            {archive.map((project) => (
              <ArchiveRow key={project.id} project={project} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
