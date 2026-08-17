import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

interface IUseToast {
  promise: Promise<any> | (() => Promise<AxiosResponse<any, any> | (() => Promise<any>) | undefined>);
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
      error: (err) => {
        let custonErrorMsg = [];
        if (err instanceof AxiosError) {
          const errors = err.response?.data.error.message;

          if (Array.isArray(errors) && errors.length > 0) {
            custonErrorMsg = errors.map((item: any) => item.error);

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }
              }>
                <strong style={{ fontWeight: 600 }}> {errorMsg} </strong>
                < ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.875rem' }
                }>
                  {
                    custonErrorMsg?.map((msg, index) => (
                      <li key={index} > {msg} </li>
                    ))}
                </ul>
              </div>
            )
          }
        }
      }
    })
  )
};
