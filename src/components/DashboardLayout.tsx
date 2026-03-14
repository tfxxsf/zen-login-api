import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { TransferModal } from "@/components/TransferModal";
import { ReceiveModal } from "@/components/ReceiveModal";
import { ReactNode, createContext, useContext } from "react";

interface ModalContextType {
  openTransfer: () => void;
  openReceive: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  openTransfer: () => {},
  openReceive: () => {},
});

export const useModals = () => useContext(ModalContext);

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [transferOpen, setTransferOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ openTransfer: () => setTransferOpen(true), openReceive: () => setReceiveOpen(true) }}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar 
            onOpenTransfer={() => setTransferOpen(true)} 
            onOpenReceive={() => setReceiveOpen(true)} 
          />
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
        <TransferModal open={transferOpen} onOpenChange={setTransferOpen} />
        <ReceiveModal open={receiveOpen} onOpenChange={setReceiveOpen} />
      </SidebarProvider>
    </ModalContext.Provider>
  );
}
