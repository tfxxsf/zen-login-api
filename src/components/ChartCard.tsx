import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";

const chartData = [
  { date: "27 Fev", entradas: 0.5, saidas: 0.3 },
  { date: "28 Fev", entradas: 0.8, saidas: 0.4 },
  { date: "Mar '26", entradas: 1.2, saidas: 0.6 },
  { date: "02 Mar", entradas: 0.9, saidas: 0.5 },
  { date: "03 Mar", entradas: 1.5, saidas: 0.8 },
  { date: "04 Mar", entradas: 1.8, saidas: 1.0 },
  { date: "05 Mar", entradas: 1.3, saidas: 0.7 },
  { date: "06 Mar", entradas: 1.6, saidas: 0.9 },
  { date: "07 Mar", entradas: 1.4, saidas: 0.8 },
  { date: "08 Mar", entradas: 1.7, saidas: 1.1 },
];

export function ChartCard() {
  return (
    <Card className="bg-card border-border/40 col-span-2">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">Faturamento</CardTitle>
            <CardDescription className="text-xs mt-1">
              Compara entradas e saídas diárias para acompanhamento do fluxo de caixa.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`R$ ${value.toFixed(2)}`, ""]}
            />
            <Legend 
              wrapperStyle={{ fontSize: "12px" }}
              formatter={(value) => value === "entradas" ? "Entradas" : "Saídas"}
            />
            <Line 
              type="monotone" 
              dataKey="entradas" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="saidas" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--muted-foreground))", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
