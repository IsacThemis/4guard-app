import { useQuery } from "@tanstack/react-query";
import { MOCK_INVENTORY, MOCK_ALERTS, MOCK_OPERATIONAL_KPIs, MOCK_DETAILED_INCIDENTS, type QualityIncident } from "./mockData";

export function useInventory() {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 500));
      return MOCK_INVENTORY;
    }
  });
}

export function useQualityIncident(folioId: string) {
  return useQuery<QualityIncident | null>({
    queryKey: ["quality-incident", folioId],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 400));
      return MOCK_DETAILED_INCIDENTS[folioId] || null;
    }
  });
}

export function useAlerts() {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      return MOCK_ALERTS;
    }
  });
}

export function useOperationalKPIs() {
  return useQuery({
    queryKey: ["kpis-operational"],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 400));
      return MOCK_OPERATIONAL_KPIs;
    }
  });
}
