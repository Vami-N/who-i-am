import { profile } from '../data/profile';
import { ui } from '../data/ui';
import { useI18n } from '../lib/i18n';
import { LogoMark } from './Logo';
import { Rich } from './Rich';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { spotlight } from '../lib/spotlight';

// Dépose une photo dans `src/assets/` nommée portrait.jpg / .png / .webp / .avif :
// elle remplace automatiquement le monogramme ci-dessous.
const portraits = import.meta.glob<string>('../assets/portrait.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const portraitUrl: string | undefined = Object.values(portraits)[0];

const AI_TOOLS = ['Claude Code', 'OpenCode'];

function Portrait() {
  const { t } = useI18n();
  const { lat, lon } = profile.coordinates;
  const coords = `${lat.toFixed(3)}° N · ${lon.toFixed(3)}° E`;

  return (
    <figure className={`portrait${portraitUrl ? ' portrait--photo' : ''}`}>
      {portraitUrl ? (
        <img className="portrait__img" src={portraitUrl} alt={t(ui.about.portraitAlt)} width={640} height={720} loading="lazy" />
      ) : (
        <div className="portrait__mark">
          <LogoMark size={220} animated />
        </div>
      )}
      <figcaption className="portrait__caption">
        <span>{profile.initials}</span>
        <span>
          {profile.city.toUpperCase()} · {coords}
        </span>
      </figcaption>
      <span className="corner corner--tl" aria-hidden="true" />
      <span className="corner corner--tr" aria-hidden="true" />
      <span className="corner corner--bl" aria-hidden="true" />
      <span className="corner corner--br" aria-hidden="true" />
    </figure>
  );
}

export function About() {
  const { t } = useI18n();
  const { sheet } = ui.about;

  const rows = [
    [sheet.location, sheet.locationValue],
    [sheet.studies, sheet.studiesValue],
    [sheet.training, sheet.trainingValue],
    [sheet.activity, sheet.activityValue],
    [sheet.languages, sheet.languagesValue],
    [sheet.env, sheet.envValue],
  ] as const;

  return (
    <section id="profile" className="section" aria-labelledby="profile-title">
      <div className="container">
        <SectionHeader index={ui.about.index} label={t(ui.nav.profile)} title={t(ui.about.title)} titleId="profile-title" />

        <div className="about">
          <div className="about__text">
            <Reveal>
              <p className="about__lead">{t(ui.about.p1)}</p>
              <p className="about__p">{t(ui.about.p2)}</p>
            </Reveal>

            <Reveal>
              <h3 className="subhead">{t(ui.about.principlesTitle)}</h3>
              <ol className="principles">
                {ui.about.principles.map((item, i) => (
                  <li key={i} className="principles__item">
                    <span className="principles__n">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h4 className="principles__title">{t(item.title)}</h4>
                      <p className="principles__text">{t(item.text)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal as="aside" className="about__side" delay={100}>
            <Portrait />
            <div className="sheet">
              <h3 className="sheet__title">{t(sheet.title)}</h3>
              <dl className="sheet__list">
                {rows.map(([label, value]) => (
                  <div key={label.en} className="sheet__row">
                    <dt>{t(label)}</dt>
                    <dd>{t(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="card ai" onPointerMove={spotlight}>
            <div className="ai__copy">
              <p className="label">{t(ui.about.ai.eyebrow)}</p>
              <h3 className="ai__title">
                <Rich text={t(ui.about.ai.title)} />
              </h3>
              <p className="ai__text">{t(ui.about.ai.text)}</p>
            </div>
            <div className="ai__flow" aria-hidden="true">
              <ul className="chips">
                {AI_TOOLS.map((tool) => (
                  <li key={tool} className="chip">
                    {tool}
                  </li>
                ))}
              </ul>
              <ol className="ai__steps">
                {ui.about.ai.steps.map((step, i) => (
                  <li key={i}>
                    <span className="ai__step-n">{i + 1}</span>
                    {t(step)}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
