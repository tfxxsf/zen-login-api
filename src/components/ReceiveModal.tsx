import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QrCode } from "lucide-react";

interface ReceiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickValues = [10, 20, 50, 100];

export function ReceiveModal({ open, onOpenChange }: ReceiveModalProps) {
  const [valor, setValor] = useState("0,00");
  const [descricao, setDescricao] = useState("");

  const handleQuickValue = (value: number) => {
    const current = parseFloat(valor.replace(".", "").replace(",", ".")) || 0;
    const newValue = current + value;
    setValor(newValue.toFixed(2).replace(".", ","));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border/40">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            Adicionar saldo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Valor */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Valor *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
              <Input
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="pl-10 bg-background border-border/60"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {quickValues.map((v) => (
                <Button
                  key={v}
                  variant="outline"
                  size="sm"
                  className="text-xs border-border/60"
                  onClick={() => handleQuickValue(v)}
                >
                  +R$ {v.toFixed(2).replace(".", ",")}
                </Button>
              ))}
            </div>
          </div>

          {/* Taxa info */}
          <div className="text-xs text-muted-foreground space-y-0.5">
            <p>*Taxa de transferência: 0.00%</p>
            <p>*Taxa mínima: R$ 0.60</p>
          </div>

          {/* Descrição */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Descrição</Label>
            <Textarea
              placeholder="Do que se trata?"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="bg-background border-border/60 min-h-[80px]"
            />
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            Gerar QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
