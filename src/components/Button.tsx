import { LoaderCircle } from "lucide-react";

interface Props {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
}

export default function Button({ text, onClick, disabled, isLoading }: Props) {
    return (
        <button
            className="p-2 bg-grey rounded-8 w-full text-white font-semibold hover:bg-blue btnAnimation transition-all"
            onClick={onClick}
            disabled={disabled}
        >
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <LoaderCircle className="animate-spin" />
                </div>
            ) : (
                text
            )}
        </button>
    )
}