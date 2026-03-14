import { MetricCard } from "@/components/MetricCard";
import { ActionCard } from "@/components/ActionCard";
import { StatCard } from "@/components/StatCard";
import { ChartCard } from "@/components/ChartCard";
import { ConversionPanel } from "@/components/ConversionPanel";
import { useModals } from "@/components/DashboardLayout";
import { useDashboard } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";
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

function MetricSkeleton() {
  return <Skeleton className="h-[120px] rounded-xl" />;
}

export default function Index() {
  const { openTransfer, openReceive } = useModals();
  const { data, isLoading } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
          </>
        ) : (
          <>
            <MetricCard title="Saldo Disponível" value={data?.saldo_disponivel ?? "R$ 0,00"} description="Saldo disponível para saque" icon={Wallet} />
            <MetricCard title="Recebido Hoje" value={data?.recebido_hoje ?? "R$ 0,00"} description="Total faturado no dia" icon={Wallet} />
            <MetricCard title="Bloqueio Cautelar" value={data?.bloqueio_cautelar ?? "R$ 0,00"} description="MEDS em disputa" icon={Lock} />
            <MetricCard title="Faturamento Total" value={data?.faturamento_total ?? "R$ 0,00"} description="Valor total de vendas" icon={TrendingUp} />
          </>
        )}
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
        <ChartCard chartData={data?.chart_data} isLoading={isLoading} />
        <ConversionPanel conversionData={data?.conversao} isLoading={isLoading} />
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
          </>
        ) : (
          <>
            <StatCard title="Saldo à Receber" value={data?.saldo_a_receber ?? "R$ 0,00"} description="Lançamentos futuros" icon={DollarSign} />
            <StatCard title="Ticket Médio" value={data?.ticket_medio ?? "R$ 0,00"} description="Valor médio por venda" icon={Receipt} />
            <StatCard title="Média diária" value={data?.media_diaria ?? "R$ 0,00"} description="Faturamento médio diário" icon={Calculator} />
            <StatCard title="Quantidade de Transações" value={String(data?.quantidade_transacoes ?? 0)} description="Total de vendas aprovadas" icon={ShoppingCart} />
          </>
        )}
      </div>
    </div>
  );
}
