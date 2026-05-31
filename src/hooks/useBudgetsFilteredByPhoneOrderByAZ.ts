import { listBudgetItem } from "@/components/types/budgetTypes";

export function useBudgetsFilteredByPhoneOrderByAZ(dataBudgets: listBudgetItem[]) {
  const clientPhones = new Set<string>();
  const budgetsFiltered: listBudgetItem[] = []
  dataBudgets.map((item) => {
    const clientPhone = item.client.phone;
    if (!clientPhones.has(clientPhone)) {
      clientPhones.add(clientPhone);
      budgetsFiltered.push(item);
    }
  });

  budgetsFiltered.sort((a, b) => {
    const nameA = a.client.name.toUpperCase();
    const nameB = b.client.name.toUpperCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
});

  return budgetsFiltered;
}
