// contexts/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isParcelaModalOpen: boolean;
  openParcelaModal: () => void;
  closeParcelaModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isParcelaModalOpen, setIsParcelaModalOpen] = useState(false);

  const openParcelaModal = () => {
    setIsParcelaModalOpen(true);
  };

  const closeParcelaModal = () => {
    setIsParcelaModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isParcelaModalOpen,
        openParcelaModal,
        closeParcelaModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
