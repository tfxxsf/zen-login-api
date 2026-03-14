import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Filter, ChevronLeft, ChevronRight, Calendar, DollarSign } from "lucide-react";

interface MetricItem {
  label: string;
  value: string;
}

interface FilterItem {
  placeholder: string;
  options: { value: string; label: string }[];
  icon?: "filter" | "calendar" | "dollar";
}

interface ReportPageProps {
  title: string;
  metrics: MetricItem[];
  columns: string[];
  filters: FilterItem[];
}

export function ReportPage({ title, metrics, columns, filters }: ReportPageProps) {
  const getIcon = (icon?: string) => {
    switch (icon) {
      case "calendar": return <Calendar className="h-4 w-4" />;
      case "dollar": return <DollarSign className="h-4 w-4" />;
      default: return <Filter className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label} className="p-6 bg-card border-border/40 border-b-2 border-b-primary">
            <p className="text-sm text-muted-foreground mb-2">{m.label}</p>
            <h3 className="text-3xl font-bold">{m.value}</h3>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border/40">
        <div className="p-4 border-b border-border/40">
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((f) => (
              <Select key={f.placeholder}>
                <SelectTrigger className="w-[160px] bg-background">
                  <div className="flex items-center gap-2">
                    {getIcon(f.icon)}
                    <SelectValue placeholder={f.placeholder} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {f.options.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
            <div className="flex-1 min-w-[200px] flex items-center gap-2">
              <Button variant="link" className="text-primary text-sm">Limpar filtros</Button>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Pesquisar..." className="pl-10 bg-background" />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                {columns.map((col) => (
                  <TableHead key={col} className="text-xs">{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-0">
                <TableCell colSpan={columns.length} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center">
                      <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
                        <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground text-sm">Você ainda não possui registros para exibir.</p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Mostrar</span>
            <Select defaultValue="20">
              <SelectTrigger className="w-[70px] h-8 bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>registros por página</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled><ChevronLeft className="h-4 w-4 mr-1" />Anterior</Button>
            <Button variant="outline" size="sm" disabled>Próximo<ChevronRight className="h-4 w-4 ml-1" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
