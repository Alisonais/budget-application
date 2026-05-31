import { budgetObject } from "@/components/types/budgetTypes";
import { FormData } from "@/pages/AllSteps";
import { AxiosResponse } from "axios";
import { toast } from "sonner";
import { httpClient } from "./httpClient";

type GetByClientName = {
  data: {
    budgets: Array<any>
  }
}

interface ICreateBudgetResponse {
  id: string;
}

export class BudgetService {

  static async createBudget(data: budgetObject) {
    const res = await httpClient.post<any, AxiosResponse<ICreateBudgetResponse>>('/budget/create', data);
    return res;
  }

  static async getBudget() {
    const { data } = await httpClient.get('/budgets');
    return data
  }

  static async getBudgetById(budgetId: string) {
    const { data } = await httpClient.get(`/budget/${budgetId}`);

    return data
  }

  static async updateBudget(budgetId: string, data: FormData) {

    const response = await httpClient.post(`/budget/update/${budgetId}`, data);
    return response;
  }

  static async deleteBudget(bugetId: string) {
    const response = await httpClient.delete(`/budget/${bugetId}`);
    return response;
  }

  static async serchByClientNameBudget(clientName: string) {
    try {
      const response: GetByClientName = await httpClient.get('/budgets/client', {
        params: {
          client: clientName
        }
      });
      if (response.data.budgets.length === 0) {
        throw new Error('Não há orçamento para este cliente.');
      }
      toast.success('Orçamento listado com sucesso');
      return response
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  static async serchByCarModelBudget(carModel: string) {
    try {
      const response: GetByClientName = await httpClient.get('/budgets/car', {
        params: {
          car: carModel
        }
      });
      if (response.data.budgets.length === 0) {
        throw new Error('Não há orçamento com este modelo.');
      }
      toast.success('Orçamento listado com sucesso');
      return response
    } catch (error: any) {
      toast.error(error.message);
    }
  }
}
