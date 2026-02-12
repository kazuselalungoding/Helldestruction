
type Size = "small" | "medium" | "large";

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    value?: string;
    size?: Size;
}

const SizeMap: Record<Size, string> = {
    small: "w-24 p-2 text-sm font-bagoss",
    medium: "w-48 p-2 text-base",
    large: "w-72 p-2 text-lg font-bagoss text-primary-800",
};

export default function TextField({ size = "large", ...props}: TextFieldProps) {
    return (
        <>
            <input {...props} className={`border-2 border-neutral-500 ${SizeMap[size]} focus:outline-none focus:ring-2 focus:ring-neutral-500 block`} />
        </>
    )
}