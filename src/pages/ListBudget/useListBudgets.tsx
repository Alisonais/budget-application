import { listBudgetItem } from "@/components/types/budgetTypes";
import { useQueryListBudgets } from "@/hooks/useQueryListBudgets";
import { useToast } from "@/hooks/useToast";
import { BudgetService } from "@/services/BudgetService";
import { safelocalStorageGetItem } from "@/utils/utils";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useListBudgets() {

  const [items, setItems] = useState<listBudgetItem[]>([]);
  const navigate = useNavigate();
  const [serchValue, setSerchValue] = useState('');
  const [searchByName, setSearchByName] = useState(false);
  const [searchByCar, setSearchByCar] = useState(false);

  const { data, isLoading, isFetching, refetch } = useQueryListBudgets({state:setItems});

  const loadBudgets = useCallback( () => {
    try {
      setItems(data?.budgets || []);
    } catch (error) {
      toast.error('Algo deu errado ao listar Orçamentos')
    }
  }, [data]);


  useEffect(() => {
    loadBudgets();
  }, []);

  function handleNewBudget() {
    localStorage.removeItem('formValues');
    navigate('/steppers');
  };
  function handleDasboard() {
    navigate('/dashboard');
  };

  function handledeleteBudget(data: listBudgetItem) {
    const budgetId = data.id;
    setItems(prev => prev.filter((item) => item.id !== budgetId));
    const promise = async () => await BudgetService.deleteBudget(budgetId);

    useToast(promise, 'Orçamento deletado com sucesso  😎',);
  }

  async function listBudgetBy() {
    if (!searchByName && !searchByCar) {
      return loadBudgets();
    };
    if (searchByName) {
      const response = await BudgetService.serchByClientNameBudget(serchValue);
      if (response?.data.budgets) {
        return setItems(response?.data.budgets);
      };
    }
    if (searchByCar) {
      const response = await BudgetService.serchByCarModelBudget(serchValue);
      if (response?.data.budgets) {
        return setItems(response?.data.budgets);
      }
    };
  };

  function handleBudgetsPending() {
    const budgets: listBudgetItem[] = safelocalStorageGetItem('AllBudgets') || [];
    const budgetsFiltered = budgets.filter((item) => item.status === 'PENDENTE');
    setItems(budgetsFiltered);
  };

  function handleBudgetsAproved() {
    const budgets: listBudgetItem[] = safelocalStorageGetItem('AllBudgets') || [];
    const budgetsFiltered = budgets.filter((item) => item.status === 'APROVADO');
    setItems(budgetsFiltered);
  };

  function handleAllBudgets() {
    refetch()
    const budgets: listBudgetItem[] = safelocalStorageGetItem('AllBudgets') || [];
    setItems(budgets);
  };

  return {
    items,
    isLoading,
    isFetching,
    serchValue,
    setSerchValue,
    searchByName,
    setSearchByName,
    searchByCar,
    setSearchByCar,
    handleNewBudget,
    handleDasboard,
    handledeleteBudget,
    listBudgetBy,
    handleBudgetsPending,
    handleBudgetsAproved,
    handleAllBudgets,
  };
}
