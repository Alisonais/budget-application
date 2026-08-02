import { GroupByMonthType } from "@/components/types";
import { listBudgetItem } from "@/components/types/budgetTypes";
import { safelocalStorageGetItem } from "@/utils/utils";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useDasboard() {
  const salesTarget = 10000;  //meta de vendas
  const carsTarget = 8; //meta de carros
  const partTarget = 24; //meta de pecas por carro
  const totalWorkableHours = (7 * 5) * 4; //horas trabalhaveis no mês
  const avaregeTargetValuePerHour = 50; //meta valor por hora por carro
  const AverageTicketTarget = 500; //meta do ticket médio
  const pricePerPiece = 400; //meta valor por peça

  const [groupByMonth, setGroupByMonth] = useState<GroupByMonthType>({});
  const budgets: listBudgetItem[] = safelocalStorageGetItem('AllBudgets') || [];

  const navigate = useNavigate();

  const valueReduce = useCallback((items: listBudgetItem[]) => {
    let valuebudgetpendent = 0;
    let subtotal = 0;
    const totalvalue = items.reduce((a, v) => {
      if (v.status === 'APROVADO') {
        valuebudgetpendent = v.value.laborPrice;
        subtotal = a + valuebudgetpendent;
      }
      return subtotal
    }, 0);
    return totalvalue
  }, []);

  const monthGroup = useCallback((budgets: listBudgetItem[]) => {
    const monthGroupReduce = budgets.reduce((acc: any, item) => {
      const dateObj = new Date(item.date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const key = `${year}-${month}`;

      if (!acc[key]) {
        acc[key] = [];
      };

      if (item.status === 'APROVADO') {
        acc[key].push(item);
      }


      return acc
    }
      , {});
    setGroupByMonth(monthGroupReduce)
  }, []);

  useEffect(() => {
    monthGroup(budgets);
  }, []);

  function titleLocaleString(chave: string) {
    const [year, month] = chave.split('-');
    const dateToShow = new Date(Number(year), Number(month) - 1);
    const formatedDate = dateToShow.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    return formatedDate;
  };

  function partCount(items: listBudgetItem[]) {
    return items.reduce((acc, item) => {
      if (item.status === 'APROVADO') {
        acc = acc + item.countPart;
        return acc;
      }
      return acc;
    }, 0)
  };

  function carCount(items: listBudgetItem[]) {
    return items.reduce((acc) => {
      acc++
      return acc;
    }, 0)
  };

  function handleListBudgets() {
    navigate('/budgets');
  };

  function handleListBasecoats() {
    navigate('/basecoats');
  };

  return {
    groupByMonth,
    carsTarget,
    partTarget,
    valueReduce,
    titleLocaleString,
    partCount,
    carCount,
    handleListBudgets,
    handleListBasecoats,
    salesTarget,
    totalWorkableHours,
    avaregeTargetValuePerHour,
    AverageTicketTarget,
    pricePerPiece
  };
}
