import { useState } from "react";
import { ReportPage } from "@/components/ReportPage";
import { useInfracoes } from "@/hooks/useApi";

export default function Infracoes() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const { data, isLoading } = useInfracoes(filters);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ReportPage
      title="Infrações"
      metrics={data?.metrics ?? [
        { label: "Quantidade de Infrações", value: "0" },
        { label: "Valor Total", value: "R$ 0,00" },
        { label: "Ticket Médio", value: "R$ 0,00" },
        { label: "Prazo", value: "7 dias" },
      ]}
      columns={["ID da transação", "Valor", "Status", "Código END2END", "Saldo Anterior", "Novo Saldo", "Última Atualização"]}
      filters={[
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
