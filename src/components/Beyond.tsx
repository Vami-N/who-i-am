import { exploring, tiles } from '../data/beyond';
import { ui } from '../data/ui';
import { useI18n } from '../lib/i18n';
import { spotlight } from '../lib/spotlight';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';

export function Beyond() {
  const { t } = useI18n();

  return (
    <section id="beyond" className="section" aria-labelledby="beyond-title">
      <div className="container">
        <SectionHeader
          index={ui.beyond.index}
          label={t(ui.nav.beyond)}
          title={t(ui.beyond.title)}
          lead={t(ui.beyond.lead)}
          titleId="beyond-title"
        />

        <ul className="bento">
          {tiles.map((tile, i) => (
            <Reveal key={tile.id} as="li" delay={(i % 3) * 70} className={`bento__cell${tile.size ? ` bento__cell--${tile.size}` : ''}`}>
              <article className="card tile" onPointerMove={spotlight}>
                <p className="tile__path">{tile.path}</p>
                <h3 className="tile__title">{t(tile.title)}</h3>
                <p className="tile__text">{t(tile.text)}</p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <h3 className="subhead subhead--spaced">{t(ui.beyond.exploring)}</h3>
          <ul className="explore">
            {exploring.map((item) => (
              <li key={item.id} className="explore__item">
                <h4 className="explore__title">{t(item.title)}</h4>
                <p className="explore__text">{t(item.text)}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
