import { useEffect } from 'react';
import { About } from './components/About';
import { Beyond } from './components/Beyond';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Journey } from './components/Journey';
import { Projects } from './components/Projects';
import { Stack } from './components/Stack';
import { ui } from './data/ui';
import { I18nProvider, useI18n } from './lib/i18n';

function Page() {
  const { t } = useI18n();

  // Liens profonds (ex. https://ton-site.com/#contact) : le contenu étant rendu côté
  // client, le navigateur ne trouve pas l'ancre au chargement — on la rejoint ici.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        {t(ui.a11y.skip)}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Journey />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  );
}
