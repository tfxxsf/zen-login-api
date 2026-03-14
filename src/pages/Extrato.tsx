import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export default function Extrato() {
  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border/40 border-b-2 border-b-primary">
          <p className="text-sm text-muted-foreground mb-2">Total de Transações</p>
          <h3 className="text-3xl font-bold">0</h3>
        </Card>
        <Card className="p-6 bg-card border-border/40 border-b-2 border-b-primary">
          <p className="text-sm text-muted-foreground mb-2">Total Processado</p>
          <h3 className="text-3xl font-bold">R$ 0,00</h3>
        </Card>
        <Card className="p-6 bg-card border-border/40 border-b-2 border-b-primary">
          <p className="text-sm text-muted-foreground mb-2">Total de Taxas</p>
          <h3 className="text-3xl font-bold">R$ 0,00</h3>
        </Card>
        <Card className="p-6 bg-card border-border/40 border-b-2 border-b-primary">
          <p className="text-sm text-muted-foreground mb-2">Ticket Médio</p>
          <h3 className="text-3xl font-bold">R$ 0,00</h3>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card className="bg-card border-border/40">
        {/* Filter Bar */}
        <div className="p-4 border-b border-border/40">
          <div className="flex flex-wrap items-center gap-3">
            <Select>
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

            <Select>
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

            <Select>
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
              <Button variant="link" className="text-primary text-sm">
                Limpar filtros
              </Button>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Pesquisar..." 
                  className="pl-10 bg-background"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
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
              <TableRow className="border-0">
                <TableCell colSpan={10} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
                        <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Você ainda não possui registros para exibir.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Mostrar</span>
            <Select defaultValue="20">
              <SelectTrigger className="w-[70px] h-8 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>registros por página</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Próximo
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
