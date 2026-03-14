import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

// ========== Types ==========

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  document: string;
  phone: string;
  status: string;
  fees: {
    entrada: string;
    taxa_minima: string;
    saque_dashboard: string;
    saque_api: string;
    saque_cripto: string;
  };
}

export interface DashboardData {
  saldo_disponivel: string;
  recebido_hoje: string;
  bloqueio_cautelar: string;
  faturamento_total: string;
  saldo_a_receber: string;
  ticket_medio: string;
  media_diaria: string;
  quantidade_transacoes: number;
  chart_data: { date: string; entradas: number; saidas: number }[];
  conversao: { label: string; value: number }[];
}

export interface Transaction {
  id: string;
  tipo?: string;
  valor: string;
  taxa: string;
  metodo?: string;
  codigo_end2end?: string;
  status: string;
  descricao: string;
  ultima_atualizacao: string;
  saldo_anterior: string;
  novo_saldo: string;
  origem?: string;
  carteira?: string;
  destinatario?: string;
  data?: string;
}

export interface ReportData {
  metrics: { label: string; value: string }[];
  transactions: Transaction[];
  total: number;
  page: number;
  per_page: number;
}

export interface FinanceiroData {
  saldo_disponivel: string;
  saldo_bloqueado: string;
  total_saques: string;
  total_entradas: string;
}

// ========== Query Keys ==========

export const queryKeys = {
  me: ["me"] as const,
  dashboard: ["dashboard"] as const,
  extrato: (filters?: Record<string, string>) => ["extrato", filters] as const,
  entradas: (filters?: Record<string, string>) => ["entradas", filters] as const,
  saidasPix: (filters?: Record<string, string>) => ["saidas-pix", filters] as const,
  saidasCripto: (filters?: Record<string, string>) => ["saidas-cripto", filters] as const,
  infracoes: (filters?: Record<string, string>) => ["infracoes", filters] as const,
  transferencias: (filters?: Record<string, string>) => ["transferencias", filters] as const,
  financeiro: ["financeiro"] as const,
};

// ========== Hooks ==========

export function useMe() {
  return useQuery<UserProfile>({
    queryKey: queryKeys.me,
    queryFn: async () => {
      const { data } = await api.get("/me");
      return data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: queryKeys.dashboard,
    queryFn: async () => {
      const { data } = await api.get("/dashboard");
      return data;
    },
    staleTime: 30 * 1000,
  });
}

function useReport(endpoint: string, queryKeyFn: (filters?: Record<string, string>) => readonly unknown[], filters?: Record<string, string>) {
  return useQuery<ReportData>({
    queryKey: queryKeyFn(filters),
    queryFn: async () => {
      const { data } = await api.get(`/${endpoint}`, { params: filters });
      return data;
    },
    staleTime: 30 * 1000,
  });
}

export function useExtrato(filters?: Record<string, string>) {
  return useReport("extrato", queryKeys.extrato, filters);
}

export function useEntradas(filters?: Record<string, string>) {
  return useReport("entradas", queryKeys.entradas, filters);
}

export function useSaidasPix(filters?: Record<string, string>) {
  return useReport("saidas-pix", queryKeys.saidasPix, filters);
}

export function useSaidasCripto(filters?: Record<string, string>) {
  return useReport("saidas-cripto", queryKeys.saidasCripto, filters);
}

export function useInfracoes(filters?: Record<string, string>) {
  return useReport("infracoes", queryKeys.infracoes, filters);
}

export function useTransferencias(filters?: Record<string, string>) {
  return useReport("transferencias", queryKeys.transferencias, filters);
}

export function useFinanceiro() {
  return useQuery<FinanceiroData>({
    queryKey: queryKeys.financeiro,
    queryFn: async () => {
      const { data } = await api.get("/financeiro");
      return data;
    },
    staleTime: 30 * 1000,
  });
}

// ========== Mutations ==========

export function useTransfer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { valor: string; chave_pix: string; tipo_chave: string; cpf?: string; descricao?: string }) => {
      const { data } = await api.post("/transfer", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      queryClient.invalidateQueries({ queryKey: ["saidas-pix"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.financeiro });
    },
  });
}

export function useReceive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { valor: string; descricao?: string }) => {
      const { data } = await api.post("/receive", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      queryClient.invalidateQueries({ queryKey: ["entradas"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.financeiro });
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      try {
        await api.post("/auth/logout");
      } catch {
        // ignore
      }
      localStorage.removeItem("tk");
      window.location.href = "/login";
    },
  });
}
