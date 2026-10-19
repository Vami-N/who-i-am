import { useEffect, useState } from 'react';
import { LANGS } from '../data/i18n';
import { ui } from '../data/ui';
import { useScrolled, useScrollSpy } from '../hooks/useScroll';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../lib/i18n';
import { Close, Menu, Moon, Sun } from './Icons';
import { LogoMark } from './Logo';

const NAV = [
  { id: 'profile', label: ui.nav.profile },
  { id: 'projects', label: ui.nav.projects },
  { id: 'stack', label: ui.nav.stack },
  { id: 'journey', label: ui.nav.journey },
] as const;

const SECTION_IDS = ['profile', 'projects', 'stack', 'journey', 'beyond', 'contact'] as const;

function LangToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="seg" role="group" aria-label={t(ui.a11y.lang)}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className="seg__btn"
          aria-pressed={lang === code}
          lang={code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { t } = useI18n();
  const { theme, toggle } = useTheme();
  const label = theme === 'dark' ? t(ui.a11y.toLight) : t(ui.a11y.toDark);
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={label} title={label}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}

export function Header() {
  const { t } = useI18n();
  const scrolled = useScrolled();
  const active = useScrollSpy(SECTION_IDS);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled || open ? ' is-solid' : ''}`}>
      <div className="container site-header__bar">
        <a href="#top" className="brand" aria-label={t(ui.a11y.home)} onClick={close}>
          <LogoMark size={30} className="brand__mark" />
          <span className="brand__name">Yvo Neguem</span>
        </a>

        <nav className="nav" aria-label={t(ui.a11y.mainNav)}>
          <ul className="nav__list">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="nav__link" aria-current={active === item.id ? 'true' : undefined}>
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <LangToggle />
          <ThemeToggle />
          <a className="btn btn--primary btn--sm site-header__cta" href="#contact">
            {t(ui.nav.cta)}
          </a>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t(ui.a11y.closeMenu) : t(ui.a11y.openMenu)}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="mobile-nav" hidden={!open}>
        <ul className="container mobile-nav__list">
          {[...NAV, { id: 'beyond', label: ui.nav.beyond }, { id: 'contact', label: ui.nav.contact }].map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="mobile-nav__link" onClick={close}>
                {t(item.label)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
