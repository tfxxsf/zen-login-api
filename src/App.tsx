import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Extrato from "./pages/Extrato";
import Entradas from "./pages/Entradas";
import SaidasPix from "./pages/SaidasPix";
import SaidasCripto from "./pages/SaidasCripto";
import Infracoes from "./pages/Infracoes";
import Transferencias from "./pages/Transferencias";
import Configuracoes from "./pages/Configuracoes";
import Gerente from "./pages/Gerente";
import Financeiro from "./pages/Financeiro";
import Ajuda from "./pages/Ajuda";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedDashboard = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <DashboardLayout>{children}</DashboardLayout>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedDashboard><Index /></ProtectedDashboard>} />
          <Route path="/extrato" element={<ProtectedDashboard><Extrato /></ProtectedDashboard>} />
          <Route path="/gerente" element={<ProtectedDashboard><Gerente /></ProtectedDashboard>} />
          <Route path="/entradas" element={<ProtectedDashboard><Entradas /></ProtectedDashboard>} />
          <Route path="/saidas-pix" element={<ProtectedDashboard><SaidasPix /></ProtectedDashboard>} />
          <Route path="/saidas-cripto" element={<ProtectedDashboard><SaidasCripto /></ProtectedDashboard>} />
          <Route path="/infracoes" element={<ProtectedDashboard><Infracoes /></ProtectedDashboard>} />
          <Route path="/transferencias" element={<ProtectedDashboard><Transferencias /></ProtectedDashboard>} />
          <Route path="/ajuda" element={<ProtectedDashboard><Ajuda /></ProtectedDashboard>} />
          <Route path="/configuracoes" element={<ProtectedDashboard><Configuracoes /></ProtectedDashboard>} />
          <Route path="/financeiro" element={<ProtectedDashboard><Financeiro /></ProtectedDashboard>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
