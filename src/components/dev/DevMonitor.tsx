import { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { UserContext } from "../../contexts/UserContext";

export default function DevMonitor() {
    const { socket } = useContext(SocketContext)!;
    const { userData } = useContext(UserContext)!;

    return (
        <div className="flex p-4 absolute top-0 right-0 flex-col text-xs bg-slate-800 ">
            <p className="text-orange">Socket: {socket?.id}</p>
            <p className="text-orange">UserId: {userData?.getId}</p>
            <p className="text-orange">Username: {userData?.getUsername}</p>
        </div>
    );
}