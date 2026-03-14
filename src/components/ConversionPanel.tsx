import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Layers, CreditCard, FileText, RefreshCcw } from "lucide-react";

const conversionData = [
  { label: "Conversão Geral", value: 40.87, icon: TrendingUp },
  { label: "Pix", value: 40.87, icon: Layers },
  { label: "Cartão de Crédito", value: 0, icon: CreditCard },
  { label: "Boleto", value: 0, icon: FileText },
  { label: "Taxa de estorno", value: 0, icon: RefreshCcw },
];

export function ConversionPanel() {
  return (
    <Card className="bg-card border-border/40">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">Conversão</CardTitle>
            <CardDescription className="text-xs mt-1">
              Relação entre pagamentos gerados e concluídos.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {conversionData.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-primary" />
                <span className="text-foreground">{item.label}</span>
              </div>
              <span className="font-semibold">{item.value}%</span>
            </div>
            <Progress value={item.value} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
