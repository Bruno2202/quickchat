interface Props {
    text: string;
    onPress?: () => void;
}

export default function Button({ text, onPress }: Props) {

    return (
        <button onClick={onPress} className="p-2 bg-grey rounded-8 w-full text-white font-semibold hover:bg-blue transition-colors ">
            {text}
        </button>
    )
}