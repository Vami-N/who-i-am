import { coreStack } from '../data/stack';
import { Star } from './Icons';

/** Bandeau défilant de la stack centrale (typographie seule, sans logos). */
export function Ticker() {
  const list = () => (
    <ul className="ticker__list">
      {coreStack.map((name) => (
        <li key={name} className="ticker__item">
          <span>{name}</span>
          <Star className="ticker__star" size={14} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {list()}
        {list()}
      </div>
    </div>
  );
}
