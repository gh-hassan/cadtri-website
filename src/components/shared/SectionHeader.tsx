// Reusable section title + subtitle block
// Placeholder — to be designed
interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
}

export function SectionHeader({ eyebrow, heading, subheading }: SectionHeaderProps) {
  return (
    <div>
      {eyebrow && <p>{eyebrow}</p>}
      <h2>{heading}</h2>
      {subheading && <p>{subheading}</p>}
    </div>
  );
}
