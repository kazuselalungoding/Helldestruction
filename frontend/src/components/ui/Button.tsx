type Size = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    color?: string;
    size?: Size;
}

const SizeMap: Record<Size, string> = {
    small: "w-28 py-2 text-xs",
    medium: "w-48 py-2.5 text-sm",
    large: "w-72 py-3 text-base",
};

export default function Button ({label, color = "", size = "medium", className = "", ...props}: ButtonProps) {
    return(
        <button
            className={`${SizeMap[size]} rounded-full border border-[#1737ff] px-5 font-semibold uppercase tracking-wide text-[#1737ff] transition hover:bg-[#1737ff] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 ${color} ${className}`}
            {...props}
        >
            {label}
        </button>
    )
}