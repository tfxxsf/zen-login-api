import { ReportPage } from "@/components/ReportPage";

export default function Infracoes() {
  return (
    <ReportPage
      title="Infrações"
      metrics={[
        { label: "Quantidade de Infrações", value: "0" },
        { label: "Valor Total", value: "R$ 0,00" },
        { label: "Ticket Médio", value: "R$ 0,00" },
        { label: "Prazo", value: "7 dias" },
      ]}
      columns={["ID da transação", "Valor", "Status", "Código END2END", "Saldo Anterior", "Novo Saldo", "Última Atualização"]}
      filters={[
        { placeholder: "Data e hora", icon: "calendar", options: [{ value: "hoje", label: "Hoje" }, { value: "semana", label: "Última semana" }, { value: "mes", label: "Último mês" }] },
        { placeholder: "Valor", icon: "dollar", options: [{ value: "todos", label: "Todos" }, { value: "0-100", label: "R$ 0 - R$ 100" }, { value: "100-500", label: "R$ 100 - R$ 500" }] },
      ]}
    />
  );
}
