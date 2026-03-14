import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout><Index /></DashboardLayout>} />
          <Route path="/extrato" element={<DashboardLayout><Extrato /></DashboardLayout>} />
          <Route path="/gerente" element={<DashboardLayout><Gerente /></DashboardLayout>} />
          
          <Route path="/entradas" element={<DashboardLayout><Entradas /></DashboardLayout>} />
          <Route path="/saidas-pix" element={<DashboardLayout><SaidasPix /></DashboardLayout>} />
          <Route path="/saidas-cripto" element={<DashboardLayout><SaidasCripto /></DashboardLayout>} />
          <Route path="/infracoes" element={<DashboardLayout><Infracoes /></DashboardLayout>} />
          <Route path="/transferencias" element={<DashboardLayout><Transferencias /></DashboardLayout>} />
          <Route path="/ajuda" element={<DashboardLayout><Ajuda /></DashboardLayout>} />
          <Route path="/configuracoes" element={<DashboardLayout><Configuracoes /></DashboardLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
