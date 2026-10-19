import { education, experience, milestones, type JourneyEntry } from '../data/journey';
import { ui } from '../data/ui';
import { formatMonth } from '../lib/format';
import { useI18n } from '../lib/i18n';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';

function Entries({ title, entries }: { title: string; entries: JourneyEntry[] }) {
  const { t } = useI18n();
  return (
    <div className="journey__col">
      <h3 className="subhead">{title}</h3>
      <ol className="rail">
        {entries.map((entry) => (
          <li key={entry.id} className={`rail__item${entry.current ? ' is-current' : ''}`}>
            <span className="rail__dot" aria-hidden="true" />
            <div className="rail__head">
              <h4 className="rail__title">{t(entry.title)}</h4>
              {entry.period ? <span className="rail__period">{t(entry.period)}</span> : null}
            </div>
            {entry.org ? <p className="rail__org">{t(entry.org)}</p> : null}
            {entry.text ? <p className="rail__text">{t(entry.text)}</p> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Journey() {
  const { t, lang } = useI18n();

  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <div className="container">
        <SectionHeader
          index={ui.journey.index}
          label={t(ui.nav.journey)}
          title={t(ui.journey.title)}
          lead={t(ui.journey.lead)}
          titleId="journey-title"
        />

        <Reveal>
          <div className="journey">
            <Entries title={t(ui.journey.experience)} entries={experience} />
            <Entries title={t(ui.journey.education)} entries={education} />
          </div>
        </Reveal>

        <Reveal>
          <h3 className="subhead subhead--spaced">{t(ui.journey.milestones)}</h3>
          <ol className="milestones">
            {[...milestones].reverse().map((m) => (
              <li key={m.id} className="milestones__item">
                <span className="milestones__date">{formatMonth(m.date, lang)}</span>
                <span className="milestones__dot" aria-hidden="true" />
                <span className="milestones__title">{t(m.title)}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
