import { budgetObject } from "@/components/types/budgetTypes";
import { useToast } from "@/hooks/useToast";
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

  static async handlerRequest<T>(
    requestFn: () => Promise<{ data: T }>,
    messages: { success: string, error?: string }
  ): Promise<T> {
    async function fetchData() {
      const { data } = await requestFn();
      return data;
    }
    const res = fetchData();
    useToast({ promise: Promise.resolve(res), msg: messages.success, errorMsg: messages.error });
    return res;
  }

  static async createBudget(data: budgetObject) {
    return this.handlerRequest(
      () => httpClient.post<any, AxiosResponse<ICreateBudgetResponse>>('/budget/create', data),
      { success: 'Orçamento salvo com sucesso 😎.', error: 'Erro ao salvar orçamento 😔' }
    )
  }

  static async getBudget() {
    try {
      const { data } = await httpClient.get('/budgets');
      return data
    } catch {
      toast.error('Erro ao listar os orçamentos 🙁');
    }
  }

  static async getBudgetById(budgetId: string) {
    try {
      const { data } = await httpClient.get(`/budget/${budgetId}`);
      return data
    } catch {
      toast('Erro ao buscar o orçamento 🙁');
    }
  }

  static async updateBudget(budgetId: string, data: FormData) {
    return this.handlerRequest(
      () => httpClient.post(`/budget/update/${budgetId}`, data),
      { success: 'Orçamento Atualizado com sucesso 😎', error: 'Erro ao atualizar o orçcamento 😔' }
    )
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
