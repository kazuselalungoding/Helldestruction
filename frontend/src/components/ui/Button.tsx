type Size = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    color?: string;
    size?: Size;
}

const SizeMap: Record<Size, string> = {
    small: "w-24 p-2 text-sm font-bagoss",
    medium: "w-48 p-2 text-base bg-black",
    large: "w-72 p-2 text-lg font-bagoss font-bold text-white bg-black",
};

export default function Button ({label, color, size = "medium", ...props}: ButtonProps) {
    return(
        <button className={`${SizeMap[size]} ${color}`} {...props}>
            {label}
        </button>
    )
}