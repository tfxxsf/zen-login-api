import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Phone, Loader2 } from "lucide-react";
import { useTransfer } from "@/hooks/useApi";
import { toast } from "sonner";

interface TransferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickValues = [10, 20, 50, 100];

export function TransferModal({ open, onOpenChange }: TransferModalProps) {
  const [valor, setValor] = useState("0,00");
  const [chavePix, setChavePix] = useState("");
  const [cpf, setCpf] = useState("");
  const [descricao, setDescricao] = useState("");
  const [showSaldo, setShowSaldo] = useState(true);
  const [tipoChave, setTipoChave] = useState("telefone");
  const transfer = useTransfer();

  const handleQuickValue = (value: number) => {
    const current = parseFloat(valor.replace(".", "").replace(",", ".")) || 0;
    const newValue = current + value;
    setValor(newValue.toFixed(2).replace(".", ","));
  };

  const handleMaxValue = () => {
    setValor("3,50");
  };

  const handleSubmit = async () => {
    if (!valor || valor === "0,00") {
      toast.error("Informe um valor.");
      return;
    }
    if (!chavePix) {
      toast.error("Informe a chave PIX.");
      return;
    }

    try {
      await transfer.mutateAsync({
        valor,
        chave_pix: chavePix,
        tipo_chave: tipoChave,
        cpf: cpf || undefined,
        descricao: descricao || undefined,
      });
      toast.success("Transferência realizada com sucesso!");
      onOpenChange(false);
      setValor("0,00");
      setChavePix("");
      setCpf("");
      setDescricao("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro ao realizar transferência.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border/40">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Realizar Transferência</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex justify-center">
            <div className="bg-primary/20 text-primary px-6 py-2 rounded-full font-medium flex items-center gap-2">
              <span className="text-lg">◆</span> PIX
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Valor *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
              <Input value={valor} onChange={(e) => setValor(e.target.value)} className="pl-10 bg-background border-border/60" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {quickValues.map((v) => (
                <Button key={v} variant="outline" size="sm" className="text-xs border-border/60" onClick={() => handleQuickValue(v)}>
                  +R$ {v.toFixed(2).replace(".", ",")}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="text-xs border-border/60" onClick={handleMaxValue}>
                Saq. Max.
              </Button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-0.5">
            <div className="flex items-center gap-2">
              <span>Saldo disponível: <strong className="text-foreground">R$ {showSaldo ? "3,50" : "***"}</strong></span>
              <button onClick={() => setShowSaldo(!showSaldo)} className="text-muted-foreground hover:text-foreground">
                {showSaldo ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p>*Taxa de transferência: 1.50%</p>
            <p>*Taxa mínima: R$ 0.60</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Dados do destinatário</h4>
            <div className="space-y-1.5">
              <Label className="text-sm">Chave PIX *</Label>
              <div className="flex gap-2">
                <Select value={tipoChave} onValueChange={setTipoChave}>
                  <SelectTrigger className="w-16 bg-background border-border/60"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telefone"><Phone className="h-4 w-4" /></SelectItem>
                    <SelectItem value="cpf">CPF</SelectItem>
                    <SelectItem value="email">@</SelectItem>
                    <SelectItem value="aleatoria">Chave</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Digite a chave PIX..." value={chavePix} onChange={(e) => setChavePix(e.target.value)} className="flex-1 bg-background border-border/60" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm">CPF</Label>
                <Input placeholder="111.111.111-00" value={cpf} onChange={(e) => setCpf(e.target.value)} className="bg-background border-border/60" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Descrição</Label>
                <Input placeholder="Do que se trata?" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="bg-background border-border/60" />
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            onClick={handleSubmit}
            disabled={transfer.isPending}
          >
            {transfer.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Processando...</>
            ) : (
              "Confirmar pagamento"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
