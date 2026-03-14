import { useState } from "react";
import { ReportPage } from "@/components/ReportPage";
import { useSaidasCripto } from "@/hooks/useApi";

export default function SaidasCripto() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const { data, isLoading } = useSaidasCripto(filters);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ReportPage
      title="Saídas Cripto"
      metrics={data?.metrics ?? [
        { label: "Total de Transações", value: "0" },
        { label: "Total Processado", value: "R$ 0,00" },
        { label: "Total de Taxas", value: "R$ 0,00" },
        { label: "Ticket Médio", value: "R$ 0,00" },
      ]}
      columns={["Status", "Valor", "Taxa", "Código END2END", "Carteira", "Descrição", "Última Atualização", "Saldo Anterior", "Novo Saldo"]}
      filters={[
        { key: "status", placeholder: "Status", icon: "filter", options: [{ value: "todos", label: "Todos" }, { value: "aprovado", label: "Aprovado" }, { value: "pendente", label: "Pendente" }] },
        { key: "periodo", placeholder: "Data e hora", icon: "calendar", options: [{ value: "hoje", label: "Hoje" }, { value: "semana", label: "Última semana" }, { value: "mes", label: "Último mês" }] },
        { key: "valor", placeholder: "Valor", icon: "dollar", options: [{ value: "todos", label: "Todos" }, { value: "0-100", label: "R$ 0 - R$ 100" }, { value: "100-500", label: "R$ 100 - R$ 500" }] },
      ]}
      transactions={data?.transactions}
      isLoading={isLoading}
      totalRecords={data?.total}
      onFilterChange={handleFilterChange}
      onClearFilters={() => setFilters({})}
      onSearch={(q) => handleFilterChange("search", q)}
    />
  );
}
