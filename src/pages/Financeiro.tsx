import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpFromLine, QrCode, Wallet, TrendingUp } from "lucide-react";

export default function Financeiro() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Financeiro</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border/40 border-b-2 border-b-primary">
          <p className="text-sm text-muted-foreground mb-2">Saldo Disponível</p>
          <h3 className="text-3xl font-bold">R$ 3,50</h3>
        </Card>
        <Card className="p-6 bg-card border-border/40 border-b-2 border-b-primary">
          <p className="text-sm text-muted-foreground mb-2">Saldo Bloqueado</p>
          <h3 className="text-3xl font-bold">R$ 0,00</h3>
        </Card>
        <Card className="p-6 bg-card border-border/40 border-b-2 border-b-primary">
          <p className="text-sm text-muted-foreground mb-2">Total de Saques</p>
          <h3 className="text-3xl font-bold">R$ 0,00</h3>
        </Card>
        <Card className="p-6 bg-card border-border/40 border-b-2 border-b-primary">
          <p className="text-sm text-muted-foreground mb-2">Total de Entradas</p>
          <h3 className="text-3xl font-bold">R$ 1.001,41</h3>
        </Card>
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
          <Button className="w-full">Solicitar Saque</Button>
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
          <Button className="w-full">Gerar QR Code</Button>
        </Card>
      </div>
    </div>
  );
}
