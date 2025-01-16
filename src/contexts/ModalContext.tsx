import { createContext, ReactNode, useState } from "react";

interface Props {
    children: ReactNode;
}

interface ModalContextType {
    openModal: (modalName: string) => void;
    closeModal: (modalName: string) => void;
    isOpenModal: (modalName: string) => boolean;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: Props) {
    const [openModals, setOpenModals] = useState<Set<string>>(new Set());

    function openModal(modalName: string): void {
        setOpenModals(prev => new Set(prev).add(modalName));
    }

    function closeModal(modalName: string): void {
        setOpenModals(prev => {
            const updated = new Set(prev);
            updated.delete(modalName);
            return updated;
        });
    }

    function isOpenModal(modalName: string): boolean {
        return openModals.has(modalName);
    }

    return (
        <ModalContext.Provider
            value={{
                openModal,
                closeModal,
                isOpenModal
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}