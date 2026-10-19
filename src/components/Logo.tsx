interface LogoMarkProps {
  size?: number;
  className?: string;
  /** Anime légèrement les nœuds (utilisé sur la grande version). */
  animated?: boolean;
}

/**
 * Le « Y » de Yvo, dessiné comme un point de bifurcation entre services :
 * deux flux qui fusionnent, puis une sortie. Les trois nœuds reprennent,
 * discrètement, les couleurs du drapeau camerounais.
 */
export function LogoMark({ size = 28, className, animated = false }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 15 32 33 48 15" />
        <path d="M32 33v18" />
      </g>
      <g stroke="var(--bg)" strokeWidth="3">
        <circle cx="16" cy="15" r="6" fill="var(--flag-green)" className={animated ? 'logo-node logo-node--1' : undefined} />
        <circle cx="48" cy="15" r="6" fill="var(--flag-yellow)" className={animated ? 'logo-node logo-node--2' : undefined} />
        <circle cx="32" cy="33" r="5" fill="var(--flag-red)" className={animated ? 'logo-node logo-node--3' : undefined} />
        <circle cx="32" cy="51" r="6" fill="currentColor" />
      </g>
    </svg>
  );
}
