interface Props {
    onClick?: () => void;
}

export default function OpacityOverlay({ onClick }: Props) {
    return (
        <div onClick={onClick} className="absolute w-full h-full bg-black opacity-40"></div>
    );
}