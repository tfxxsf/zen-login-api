import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpFromLine, QrCode } from "lucide-react";
import { useFinanceiro } from "@/hooks/useApi";
import { useModals } from "@/components/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";

export default function Financeiro() {
  const { data, isLoading } = useFinanceiro();
  const { openTransfer, openReceive } = useModals();

  const cards = [
    { label: "Saldo Disponível", value: data?.saldo_disponivel ?? "R$ 0,00" },
    { label: "Saldo Bloqueado", value: data?.saldo_bloqueado ?? "R$ 0,00" },
    { label: "Total de Saques", value: data?.total_saques ?? "R$ 0,00" },
    { label: "Total de Entradas", value: data?.total_entradas ?? "R$ 0,00" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Financeiro</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.label} className="p-6 bg-card border-border/40 border-b-2 border-b-primary">
            <p className="text-sm text-muted-foreground mb-2">{c.label}</p>
            {isLoading ? <Skeleton className="h-9 w-24" /> : <h3 className="text-3xl font-bold">{c.value}</h3>}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border/40">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <ArrowUpFromLine className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Realizar Transferência</h3>
              <p className="text-sm text-muted-foreground">Transfira via PIX para qualquer conta</p>
            </div>
          </div>
          <Button className="w-full" onClick={openTransfer}>Solicitar Saque</Button>
        </Card>

        <Card className="p-6 bg-card border-border/40">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <QrCode className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Receber via Pix</h3>
              <p className="text-sm text-muted-foreground">Gere um QR Code para receber pagamentos</p>
            </div>
          </div>
          <Button className="w-full" onClick={openReceive}>Gerar QR Code</Button>
        </Card>
      </div>
    </div>
  );
}
