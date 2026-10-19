import { useEffect, useState } from 'react';

/** Heure locale (HH:mm) dans un fuseau donné, rafraîchie toutes les 15 s. */
export function useClock(timeZone: string): string {
  const format = () =>
    new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
