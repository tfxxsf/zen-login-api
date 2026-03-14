import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useExtrato } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";

export default function Extrato() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const { data, isLoading } = useExtrato({ ...filters, page: String(page), per_page: String(perPage) });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const metrics = data?.metrics ?? [
    { label: "Total de Transações", value: "0" },
    { label: "Total Processado", value: "R$ 0,00" },
    { label: "Total de Taxas", value: "R$ 0,00" },
    { label: "Ticket Médio", value: "R$ 0,00" },
  ];

  const transactions = data?.transactions ?? [];
  const totalPages = Math.ceil((data?.total ?? 0) / perPage);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label} className="p-6 bg-card border-border/40 border-b-2 border-b-primary">
            <p className="text-sm text-muted-foreground mb-2">{m.label}</p>
            {isLoading ? <Skeleton className="h-9 w-24" /> : <h3 className="text-3xl font-bold">{m.value}</h3>}
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border/40">
        <div className="p-4 border-b border-border/40">
          <div className="flex flex-wrap items-center gap-3">
            <Select onValueChange={(val) => handleFilterChange("status", val)}>
              <SelectTrigger className="w-[150px] bg-background">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="recusado">Recusado</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(val) => handleFilterChange("periodo", val)}>
              <SelectTrigger className="w-[180px] bg-background">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Data e hora" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hoje">Hoje</SelectItem>
                <SelectItem value="semana">Última semana</SelectItem>
                <SelectItem value="mes">Último mês</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(val) => handleFilterChange("valor", val)}>
              <SelectTrigger className="w-[150px] bg-background">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Valor" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="0-100">R$ 0 - R$ 100</SelectItem>
                <SelectItem value="100-500">R$ 100 - R$ 500</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1 min-w-[200px] flex items-center gap-2">
              <Button variant="link" className="text-primary text-sm" onClick={() => setFilters({})}>
                Limpar filtros
              </Button>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar..."
                  className="pl-10 bg-background"
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead className="text-xs">Tipo</TableHead>
                <TableHead className="text-xs">Valor</TableHead>
                <TableHead className="text-xs">Taxa</TableHead>
                <TableHead className="text-xs">Método</TableHead>
                <TableHead className="text-xs">Código END2END</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Descrição</TableHead>
                <TableHead className="text-xs">Última Atualização</TableHead>
                <TableHead className="text-xs">Saldo Anterior</TableHead>
                <TableHead className="text-xs">Novo Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i} className="border-border/40">
                    {Array.from({ length: 10 }).map((_, j) => (
                      <TableCell key={j}><Skeleton className="h-4 w-16" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : transactions.length > 0 ? (
                transactions.map((tx) => (
                  <TableRow key={tx.id} className="border-border/40">
                    <TableCell className="text-sm">{tx.tipo ?? "-"}</TableCell>
                    <TableCell className="text-sm">{tx.valor}</TableCell>
                    <TableCell className="text-sm">{tx.taxa}</TableCell>
                    <TableCell className="text-sm">{tx.metodo ?? "-"}</TableCell>
                    <TableCell className="text-sm font-mono text-xs">{tx.codigo_end2end ?? "-"}</TableCell>
                    <TableCell className="text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tx.status === "aprovado" ? "bg-primary/20 text-primary" :
                        tx.status === "pendente" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-destructive/20 text-destructive"
                      }`}>
                        {tx.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{tx.descricao}</TableCell>
                    <TableCell className="text-sm">{tx.ultima_atualizacao}</TableCell>
                    <TableCell className="text-sm">{tx.saldo_anterior}</TableCell>
                    <TableCell className="text-sm">{tx.novo_saldo}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-0">
                  <TableCell colSpan={10} className="py-20 text-center">
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
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Mostrar</span>
            <Select defaultValue={String(perPage)} onValueChange={(val) => { setPerPage(Number(val)); setPage(1); }}>
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
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-4 w-4 mr-1" />Anterior
            </Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
              Próximo<ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
