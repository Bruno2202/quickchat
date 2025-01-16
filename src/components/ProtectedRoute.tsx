import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const { userData } = useContext(UserContext)!;

    if (!userData || !userData.getUsername) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            {children}
        </>
    );
}