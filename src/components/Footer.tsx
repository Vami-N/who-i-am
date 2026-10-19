import { profile } from '../data/profile';
import { ui } from '../data/ui';
import { useI18n } from '../lib/i18n';
import { ArrowUp } from './Icons';
import { LogoMark } from './Logo';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__id">
          <LogoMark size={24} />
          <p>
            © {year} {profile.name} — {profile.city}
          </p>
        </div>
        <p className="footer__built">{t(ui.footer.built)}</p>
        <a className="footer__top" href="#top">
          {t(ui.footer.top)}
          <ArrowUp size={16} />
        </a>
      </div>
    </footer>
  );
}
