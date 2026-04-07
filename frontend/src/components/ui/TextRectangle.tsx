type TextVariant = "heading" | "subheading" | "body" | "label";
type TextAlign = "left" | "center" | "right";

interface TextRectangleProps {
  children: React.ReactNode;
  variant?: TextVariant;
  align?: TextAlign;
  className?: string;
  responsive?: boolean;
  uppercase?: boolean;
  interactive?: boolean;
}

const VariantMap: Record<TextVariant, string> = {
  heading:
    "text-[clamp(2.4rem,10vw,7.5rem)] font-black leading-none tracking-tight",
  subheading: "text-2xl sm:text-3xl font-bold uppercase tracking-wide",
  body: "text-base sm:text-lg font-semibold",
  label: "text-xs font-semibold uppercase tracking-[0.25em]",
};

const AlignMap: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function TextRectangle({
  children,
  variant = "body",
  align = "left",
  className = "",
  responsive = false,
  uppercase = false,
  interactive = false,
}: TextRectangleProps) {
  const baseStyles = `${VariantMap[variant]} ${AlignMap[align]} text-black transition-transform duration-300 ${className}`;

  const interactiveStyles = interactive
    ? "group-hover:translate-x-2 cursor-pointer"
    : "";

  const responsiveStyles = responsive ? "transition-all duration-300" : "";

  const uppercaseClass = uppercase ? "uppercase" : "";

  return (
    <div className={`${baseStyles} ${interactiveStyles} ${responsiveStyles} ${uppercaseClass}`}>
      {children}
    </div>
  );
}
