import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import { ui } from '../data/ui';
import { useClock } from '../hooks/useClock';
import { cleanUrl } from '../lib/format';
import { useI18n } from '../lib/i18n';
import { ArrowUpRight, Check, Copy, Mail } from './Icons';
import { Reveal } from './Reveal';
import { Rich } from './Rich';

function CopyButton({ value }: { value: string }) {
  const { t } = useI18n();
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setDone(false), 2000);
    } catch {
      /* presse-papiers indisponible : le lien mailto reste utilisable */
    }
  };

  return (
    <button type="button" className="btn btn--ghost btn--lg" onClick={copy}>
      {done ? <Check /> : <Copy />}
      <span aria-live="polite">{done ? t(ui.contact.copied) : t(ui.contact.copy)}</span>
    </button>
  );
}

/** Heure locale de Yaoundé : utile pour caler une réunion avec un client à l’étranger. */
function LocalClock() {
  const { t } = useI18n();
  const time = useClock(profile.timeZone);
  const [hours, minutes] = time.split(':');

  return (
    <aside className="contact__side" aria-label={`${profile.city} — ${t(ui.contact.timezoneValue)}`}>
      <p className="label">
        {profile.city} · {t(ui.contact.timezoneValue)}
      </p>
      <p className="clock">
        <time dateTime={time}>
          {hours}
          <span className="clock__colon">:</span>
          {minutes}
        </time>
      </p>
      <dl className="contact__meta">
        <div>
          <dt>{t(ui.contact.timezone)}</dt>
          <dd>{t(ui.contact.timezoneValue)}</dd>
        </div>
        <div>
          <dt>{t(ui.contact.languages)}</dt>
          <dd>{t(ui.contact.languagesValue)}</dd>
        </div>
        <div>
          <dt>{t(ui.about.sheet.location)}</dt>
          <dd>
            {profile.city}, {t(ui.hero.country)}
          </dd>
        </div>
      </dl>
    </aside>
  );
}

export function Contact() {
  const { t } = useI18n();
  const { contact } = profile;

  const email = cleanUrl(contact.email);
  const github = cleanUrl(contact.github);
  const linkedin = cleanUrl(contact.linkedin);
  const whatsappDigits = contact.whatsapp.replace(/\D/g, '');

  const mailto = email
    ? `mailto:${email}?subject=${encodeURIComponent(t(ui.contact.emailSubject))}&body=${encodeURIComponent(t(ui.contact.emailBody))}`
    : null;
  const whatsapp = whatsappDigits ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(t(ui.contact.whatsappText))}` : null;
  const hasChannel = Boolean(email || github || linkedin || whatsapp);

  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal>
          <div className="contact card">
            <div className="contact__grid">
              <div className="contact__main">
                <p className="section-head__index">
                  <span className="section-head__num">{ui.contact.index}</span>
                  <span>{t(ui.nav.contact)}</span>
                </p>
                <h2 id="contact-title" className="contact__title">
                  <Rich text={t(ui.contact.title)} />
                </h2>
                <p className="contact__text">{t(ui.contact.text)}</p>

                {hasChannel ? (
                  <div className="contact__actions">
                    {mailto && email ? (
                      <>
                        <a className="btn btn--primary btn--lg" href={mailto}>
                          <Mail />
                          {t(ui.contact.email)}
                        </a>
                        <CopyButton value={email} />
                      </>
                    ) : null}
                    {whatsapp ? (
                      <a className="btn btn--ghost btn--lg" href={whatsapp} target="_blank" rel="noreferrer noopener">
                        {t(ui.contact.whatsapp)}
                        <ArrowUpRight />
                        <span className="visually-hidden"> {t(ui.a11y.external)}</span>
                      </a>
                    ) : null}
                    {linkedin ? (
                      <a className="btn btn--ghost btn--lg" href={linkedin} target="_blank" rel="noreferrer noopener">
                        {t(ui.contact.linkedin)}
                        <ArrowUpRight />
                        <span className="visually-hidden"> {t(ui.a11y.external)}</span>
                      </a>
                    ) : null}
                    {github ? (
                      <a className="btn btn--ghost btn--lg" href={github} target="_blank" rel="noreferrer noopener">
                        {t(ui.contact.github)}
                        <ArrowUpRight />
                        <span className="visually-hidden"> {t(ui.a11y.external)}</span>
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <p className="contact__empty">{import.meta.env.DEV ? t(ui.contact.devHint) : t(ui.contact.empty)}</p>
                )}
              </div>

              <LocalClock />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
