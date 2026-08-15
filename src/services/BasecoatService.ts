import { useToast } from "@/hooks/useToast";
import { Basecoat, objBasecoat } from "@/pages/Basecoats/typesOfBasecoats";
import { toast } from "sonner";
import { httpClient } from "./httpClient";

export class BasecoatService {

  static async handlerRequest<T>(
    requestFn: () => Promise<{ data: T }>,
    messages: { success: string, error: string }
  ): Promise<T> {
    async function fetchData() {
      const { data } = await requestFn();
      return data;
    };

    const res = fetchData();

    useToast({ promise: res, msg: messages.success, errorMsg: messages.error });

    return res;
  }

  static async getBasecoats() {
    try {
      const { data } = await httpClient.get('/basecoats');
      return data;
    } catch {
      toast.error('Algo deu errado ao listas as bases');
    }
  };

  static async createBasecoat(dataBasecoat: objBasecoat) {

    return this.handlerRequest(
      () => httpClient.post('/basecoat/create', dataBasecoat),
      { success: 'Base criada com sucesso', error: 'Erro ao criar a base' },
    );
  }

  static async updateBasecoat(basecoatId: string, dataBasecoat: Basecoat) {
    return this.handlerRequest(
      () => httpClient.post(`/basecoat/update/${basecoatId}`, dataBasecoat),
      { success: 'Base atualizada com sucesso', error: 'Erro ao atualizar a base' },
    );
  };

  static async deleteBasecoat(basecoatId: string) {
    return this.handlerRequest(
      () => httpClient.delete(`/basecoat/${basecoatId}`),
      {success: 'Base deletada com sucesso', error: 'Algo deu errado ao deletar a base'},
    );
  };

  static async searchBy(colorGroup: string, colorName: string) {
    async function fetchData() {
      const { data } = await httpClient.get('/basecoat/listcolor', {
        params: {
          colorGroup,
          colorName,
        }
      });
      return data;
    };

    const res = fetchData();

    useToast({ promise: res, msg: 'Bases listadas com sucesso', errorMsg: 'Erro ao listar as bases' })

    return res;

  }
}

export namespace BasecoatService { }
