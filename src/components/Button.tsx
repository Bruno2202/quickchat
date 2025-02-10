interface Props {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({ text, onClick, disabled }: Props) {

    return (
        <button
            className="p-2 bg-grey rounded-8 w-full text-white font-semibold hover:bg-blue btnAnimation transition-all"
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}