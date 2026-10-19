import { layers, type Level } from '../data/stack';
import { ui } from '../data/ui';
import { useI18n } from '../lib/i18n';
import { Star } from './Icons';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';

const LEVELS: Level[] = ['core', 'regular', 'explore'];

export function Stack() {
  const { t } = useI18n();

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="container">
        <SectionHeader
          index={ui.stack.index}
          label={t(ui.nav.stack)}
          title={t(ui.stack.title)}
          lead={t(ui.stack.lead)}
          titleId="stack-title"
        />

        <Reveal>
          <ul className="legend" aria-label={t(ui.stack.legendLabel)}>
            {LEVELS.map((level) => (
              <li key={level} className={`legend__item legend__item--${level}`}>
                {level === 'core' ? <Star size={12} /> : <span className="legend__swatch" aria-hidden="true" />}
                {t(ui.stack.legend[level])}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <ol className="layers">
            {layers.map((layer, i) => (
              <li key={layer.id} className="layers__row">
                <div className="layers__label">
                  <span className="layers__n">L{i + 1}</span>
                  <span className="layers__name">{t(layer.name)}</span>
                </div>
                <ul className="layers__items">
                  {layer.items.map((item) => (
                    <li key={item.name} className={`chip chip--${item.level}`}>
                      {item.level === 'core' ? <Star size={11} className="chip__star" /> : null}
                      {item.name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
