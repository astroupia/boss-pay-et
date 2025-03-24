interface SectionTitleProps {
  title: string;
  className?: string;
}

export function SectionTitle({ title, className = "" }: SectionTitleProps) {
  return <h2 className={`text-base font-medium mb-2 ${className}`}>{title}</h2>;
}
