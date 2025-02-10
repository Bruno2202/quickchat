import { useState, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react"

interface Props {
    children: ReactNode;
    text: string;
    position: "topRight" | "bottomRight" | "topLeft" | "bottomLeft";
}

export default function CursorTooltip({ children, text, position }: Props) {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [tooltip, setTooltip] = useState<string | null>(null);

    const adjustedPosition = (): number[] => {
        switch (position) {
            case "topRight":
                return [cursorPosition.x + 20, cursorPosition.y - 40];

            case "bottomRight":
                return [cursorPosition.x + 20, cursorPosition.y + 20];

            case "topLeft":
                return [cursorPosition.x - 80, cursorPosition.y - 40];

            case "bottomLeft":
                return [cursorPosition.x - 80, cursorPosition.y + 20];

            default:
                return [cursorPosition.x, cursorPosition.y];
        }
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPosition({ x: e.x, y: e.y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <AnimatePresence>
                {tooltip && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        className="fixed px-3 py-2 bg-black text-white text-sm rounded-8 shadow-lg z-10"
                        style={{
                            left: `${adjustedPosition()[0]}px`,
                            top: `${adjustedPosition()[1]}px`,
                        }}
                    >
                        {tooltip}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="items-center justify-center">
                <div
                    className="cursor-pointer"
                    onMouseEnter={() => setTooltip(text)}
                    onMouseLeave={() => setTooltip(null)}
                >
                    {children}
                </div>
            </div>
        </>
    );
}