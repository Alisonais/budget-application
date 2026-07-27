import { arrayListBudgets, listBudgetItem } from "@/components/types/budgetTypes";
import { BudgetService } from "@/services/BudgetService";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useBudgetsFilteredByPhoneOrderByAZ } from "./useBudgetsFilteredByPhoneOrderByAZ";

interface IuseQueryListBudgets {
  state?: Dispatch<SetStateAction<listBudgetItem[]>>
}

export function useQueryListBudgets({ state }: IuseQueryListBudgets) {
  return useQuery({
    queryKey: ['listBudgets'],
    queryFn: async (): Promise<arrayListBudgets> => {
      const res = await BudgetService.getBudget();
      localStorage.setItem('AllBudgets', JSON.stringify(res.budgets));
      const budgetsFiltered = useBudgetsFilteredByPhoneOrderByAZ(res.budgets);
      localStorage.setItem('budgets', JSON.stringify(budgetsFiltered));
      if (state) {
        state(res.budgets)
      };
      return res;
    },
  });
}
