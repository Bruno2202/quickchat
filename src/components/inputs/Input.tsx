interface Props {
    maxLength: number;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ maxLength, type, placeholder, onChange }: Props) {
    return (
        <input
            maxLength={maxLength}
            onChange={onChange}
            className="outline-none border border-1 rounded-8 p-2 placeholder:font-semibold"
            type={type} placeholder={placeholder}
        />
    )
}