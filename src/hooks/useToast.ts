import { AxiosResponse } from "axios";
import { toast } from "sonner";

interface IUseToast {
  promise: Promise<any> | (() => Promise<AxiosResponse<any, any> | (() => Promise<any>) | undefined>) ;
  msg: string;
  errorMsg?: string
}

export function useToast({ promise, msg, errorMsg }: IUseToast) {
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
