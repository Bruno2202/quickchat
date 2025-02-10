import { LucideIcon } from "lucide-react";

interface OptionProps {
    Icon: LucideIcon;
    text: string;
    onClick: () => void;
}

export default function Option({ Icon, text, onClick }: OptionProps) {
    return (
        <div onClick={onClick} className="flex flex-row gap-2 p-2 rounded-8 font-semibold text-lightGrey hover:bg-grey hover:text-white  cursor-pointer  btnAnimation">
            <Icon />
            <p className="font-semibold">{text}</p>
        </div>
    );
}
