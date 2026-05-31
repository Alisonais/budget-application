import { AxiosResponse } from "axios";
import { toast } from "sonner";

export function useToast(promise: () => Promise<AxiosResponse<any, any> | (() => Promise<any>) | undefined >, msg: string, errorMsg?: string) {
  return (
    toast.promise(promise, {
      loading: 'Loading...',
      success: () => {
        return msg;
      },
      error: (e) => {
        const error = e.response?.data?.error?.code;
        if (error === 'VALIDATION') {
          return 'Algum campo obrigatório não foi preenchido 😔.'
        }
        return errorMsg || 'Erro ao executar esta ação 😕';
      }
    })
  )
};
