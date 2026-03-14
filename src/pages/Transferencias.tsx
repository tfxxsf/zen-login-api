import { ReportPage } from "@/components/ReportPage";

export default function Transferencias() {
  return (
    <ReportPage
      title="Transferências Internas"
      metrics={[
        { label: "Total de Transferências", value: "0" },
        { label: "Total Processado", value: "R$ 0,00" },
        { label: "Total de Taxas", value: "R$ 0,00" },
        { label: "Ticket Médio", value: "R$ 0,00" },
      ]}
      columns={["ID", "Destinatário", "Valor", "Status", "Data", "Saldo Anterior", "Novo Saldo"]}
      filters={[
        { placeholder: "Data e hora", icon: "calendar", options: [{ value: "hoje", label: "Hoje" }, { value: "semana", label: "Última semana" }, { value: "mes", label: "Último mês" }] },
        { placeholder: "Valor", icon: "dollar", options: [{ value: "todos", label: "Todos" }, { value: "0-100", label: "R$ 0 - R$ 100" }, { value: "100-500", label: "R$ 100 - R$ 500" }] },
      ]}
    />
  );
}
