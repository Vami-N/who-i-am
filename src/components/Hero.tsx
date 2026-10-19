import { profile } from '../data/profile';
import { featured, infra } from '../data/projects';
import { coreStack } from '../data/stack';
import { ui } from '../data/ui';
import { useClock } from '../hooks/useClock';
import { useI18n } from '../lib/i18n';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { ArrowRight, Download, Pin } from './Icons';
import { Reveal } from './Reveal';
import { Rich } from './Rich';
import { Ticker } from './Ticker';

const activePlatforms = [...featured, ...infra].filter((p) => p.status === 'active' || p.status === 'building').length;

export function Hero() {
  const { t } = useI18n();
  const time = useClock(profile.timeZone);

  const stats = [
    { value: '≈\u00a030\u00a0h', label: ui.hero.stats.freelance },
    { value: String(activePlatforms), label: ui.hero.stats.platforms },
    { value: String(coreStack.length), label: ui.hero.stats.core },
    { value: '3', label: ui.hero.stats.languages },
  ];

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__meta">
            {profile.availableForWork ? (
              <span className="pill pill--live">
                <span className="pill__dot" aria-hidden="true" />
                {t(ui.hero.available)}
              </span>
            ) : null}
            <span className="pill">
              <Pin size={14} />
              <span>
                {profile.city}, {t(ui.hero.country)}
              </span>
              <span className="pill__sep" aria-hidden="true" />
              <time className="pill__time" dateTime={time}>
                {time} WAT
              </time>
            </span>
          </div>

          <p className="hero__role">{t(ui.hero.role)}</p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__title-line">Yvo Vami</span>
            <span className="hero__title-line">Neguem</span>
          </h1>
          <p className="hero__tagline">
            <Rich text={t(ui.hero.tagline)} />
          </p>
          <p className="hero__lead">{t(ui.hero.lead)}</p>

          <div className="hero__cta">
            <a className="btn btn--primary btn--lg" href="#projects">
              {t(ui.hero.ctaProjects)}
              <ArrowRight />
            </a>
            <a className="btn btn--ghost btn--lg" href="#contact">
              {t(ui.hero.ctaContact)}
            </a>
            {profile.cvUrl ? (
              <a className="btn btn--text btn--lg" href={profile.cvUrl} download>
                <Download />
                {t(ui.hero.ctaCv)}
              </a>
            ) : null}
          </div>
        </div>

        <Reveal className="hero__visual" delay={120}>
          <ArchitectureDiagram />
        </Reveal>
      </div>

      <div className="container">
        <dl className="stats">
          {stats.map((stat) => (
            <div key={stat.value + stat.label.en} className="stats__item">
              <dt className="stats__value">{stat.value}</dt>
              <dd className="stats__label">{t(stat.label)}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Ticker />
    </section>
  );
}
