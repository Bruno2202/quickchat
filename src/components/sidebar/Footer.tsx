import { GrGithub } from "react-icons/gr";
import CursorTooltip from "../CursorTooltip";

export default function Footer() {
    return (
        <div className="flex flex-col gap-2 items-center justify-center  text-lightGrey text-xs">
            <CursorTooltip text="Github" position="topRight">
                <div
                    className="flex flex-row justify-center items-center gap-1 font-semibold opacity-40 hover:opacity-100 transition-all"
                    onClick={() => window.open('https://github.com/Bruno2202/quickchat')}
                >
                    <GrGithub size={24} />
                    QuickChat⚡
                </div>
            </CursorTooltip>
        </div>
    );
}