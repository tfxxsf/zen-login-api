import { MetricCard } from "@/components/MetricCard";
import { ActionCard } from "@/components/ActionCard";
import { StatCard } from "@/components/StatCard";
import { ChartCard } from "@/components/ChartCard";
import { ConversionPanel } from "@/components/ConversionPanel";
import { useModals } from "@/components/DashboardLayout";
import { 
  Wallet, 
  Lock, 
  TrendingUp,
  QrCode,
  ArrowUpRight,
  CreditCard,
  Code,
  DollarSign,
  Receipt,
  Calculator,
  ShoppingCart
} from "lucide-react";

export default function Index() {
  const { openTransfer, openReceive } = useModals();

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Saldo Disponível" value="R$ 3,50" description="Saldo disponível para saque" icon={Wallet} />
        <MetricCard title="Recebido Hoje" value="R$ 0,00" description="Total faturado no dia" icon={Wallet} />
        <MetricCard title="Bloqueio Cautelar" value="R$ 0,00" description="MEDS em disputa" icon={Lock} />
        <MetricCard title="Faturamento Total" value="R$ 1.001,41" description="Valor total de vendas" icon={TrendingUp} />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ActionCard title="Gerar PIX" description="QR Code para receber" icon={QrCode} onClick={openReceive} />
        <ActionCard title="Solicitar Saque" description="Transferir via PIX" icon={ArrowUpRight} onClick={openTransfer} />
        <ActionCard title="Transações" description="Ver histórico" icon={CreditCard} />
        <ActionCard title="Credenciais API" description="Gerencie suas credenciais" icon={Code} />
      </div>

      {/* Chart and Conversion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard />
        <ConversionPanel />
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Saldo à Receber" value="R$ 0,00" description="Lançamentos futuros" icon={DollarSign} />
        <StatCard title="Ticket Médio" value="R$ 21,31" description="Valor médio por venda" icon={Receipt} />
        <StatCard title="Média diária" value="R$ 69,27" description="Faturamento médio diário" icon={Calculator} />
        <StatCard title="Quantidade de Transações" value="47" description="Total de vendas aprovadas" icon={ShoppingCart} />
      </div>
    </div>
  );
}
