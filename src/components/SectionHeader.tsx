import { Reveal } from './Reveal';
import { Rich } from './Rich';

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  lead?: string;
  titleId: string;
}

export function SectionHeader({ index, label, title, lead, titleId }: SectionHeaderProps) {
  return (
    <Reveal as="header" className="section-head">
      <p className="section-head__index">
        <span className="section-head__num">{index}</span>
        <span>{label}</span>
      </p>
      <h2 id={titleId} className="section-head__title">
        <Rich text={title} />
      </h2>
      {lead ? <p className="section-head__lead">{lead}</p> : null}
    </Reveal>
  );
}
