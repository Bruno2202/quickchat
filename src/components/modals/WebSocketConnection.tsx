import { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { LoaderCircle, Wifi } from "lucide-react";
import CursorTooltip from "../CursorTooltip";

export default function WebSocketConnection() {
    const { isConnecting } = useContext(SocketContext)!;

    return (
        <div className="text-xs font-medium absolute left-2 top-2 z-10">
            {!isConnecting ? (
                <CursorTooltip text="Conectado ao WebSocket" position="bottomRight">
                    <Wifi size={20} className="text-green" />
                </CursorTooltip>
            ) : (
                <CursorTooltip text="Conectando ao WebSocket" position="bottomRight">
                    <div className="flex flex-row text-lightGrey gap-2 animate-pulse">
                        <LoaderCircle size={20} className="animate-spin" />
                    </div>
                </CursorTooltip>
            )}
        </div>
    );
}