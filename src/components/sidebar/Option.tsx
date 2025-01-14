import { LucideIcon } from "lucide-react";

interface OptionProps {
    Icon: LucideIcon;
    text: string;
}

export default function Option({ Icon, text }: OptionProps) {
    return (
        <div className="flex flex-row gap-2 p-2 rounded-8 font-semibold text-lightGrey hover:bg-grey hover:text-white transition-colors cursor-pointer">
            <Icon />
            <p className="font-semibold">{text}</p>
        </div>
    );
}
