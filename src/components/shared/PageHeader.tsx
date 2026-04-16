// Top-of-page hero banner for interior pages (About, Services, etc.)
// Placeholder — to be designed
interface PageHeaderProps {
  heading: string;
  subheading?: string;
}

export function PageHeader({ heading, subheading }: PageHeaderProps) {
  return (
    <div>
      <h1>{heading}</h1>
      {subheading && <p>{subheading}</p>}
    </div>
  );
}
