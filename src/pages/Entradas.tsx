import { useState } from "react";
import { ReportPage } from "@/components/ReportPage";
import { useEntradas } from "@/hooks/useApi";

export default function Entradas() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const { data, isLoading } = useEntradas(filters);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => setFilters({});

  return (
    <ReportPage
      title="Entradas"
      metrics={data?.metrics ?? [
        { label: "Total de Transações", value: "0" },
        { label: "Total Processado", value: "R$ 0,00" },
        { label: "Total de Taxas", value: "R$ 0,00" },
        { label: "Ticket Médio", value: "R$ 0,00" },
      ]}
      columns={["Código END2END", "Status", "Valor", "Taxa", "Descrição", "Última Atualização", "Saldo Anterior", "Novo Saldo"]}
      filters={[
        { key: "periodo", placeholder: "Data e hora", icon: "calendar", options: [{ value: "hoje", label: "Hoje" }, { value: "semana", label: "Última semana" }, { value: "mes", label: "Último mês" }] },
        { key: "valor", placeholder: "Valor", icon: "dollar", options: [{ value: "todos", label: "Todos" }, { value: "0-100", label: "R$ 0 - R$ 100" }, { value: "100-500", label: "R$ 100 - R$ 500" }] },
      ]}
      transactions={data?.transactions}
      isLoading={isLoading}
      totalRecords={data?.total}
      page={data?.page}
      perPage={data?.per_page}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClear}
      onSearch={(q) => handleFilterChange("search", q)}
    />
  );
}
