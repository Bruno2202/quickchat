import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    bgColor?: string;
    color?: string;
    icon?: IconName;
    iconColor?: string;
    placeholderColor?: string;
}

export default function Input({ bgColor, color, icon, iconColor, placeholderColor, ...props }: Props) {
    return (
        <div
            className="flex flex-row items-center justify-center rounded-8"
            style={{ backgroundColor: bgColor }}
        >
            {icon &&
                <div className="flex items-center justify-center h-full px-2">
                    <DynamicIcon color={iconColor} name={icon} />
                </div>
            }
            <input
                {...props}
                style={{ backgroundColor: bgColor, color: color, WebkitTextFillColor: placeholderColor }}
                className={`w-full outline-none ${icon ? "rounded-r-8 pr-2 py-2" : "rounded-8 p-2"} placeholder:font-semibold`}
            />
        </div>
    )
}