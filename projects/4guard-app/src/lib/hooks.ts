import { useQuery } from "@tanstack/react-query";
import { MOCK_INVENTORY, MOCK_ALERTS, MOCK_OPERATIONAL_KPIs } from "./mockData";

export function useInventory() {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      // Simulate API latency
      await new Promise(r => setTimeout(r, 500));
      return MOCK_INVENTORY;
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
