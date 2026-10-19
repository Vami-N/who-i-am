import type { PointerEvent } from 'react';

/** Suit le curseur pour le halo lumineux des cartes (variables CSS --mx / --my). */
export function spotlight(event: PointerEvent<HTMLElement>): void {
  if (event.pointerType !== 'mouse') return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  el.style.setProperty('--my', `${event.clientY - rect.top}px`);
}
