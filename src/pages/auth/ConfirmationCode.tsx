import { AuthService } from "@/services/AuthService";
import { safelocalStorageGetItem } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Loader } from "../../components/Loader";
import { TLogin } from "../../components/types";

const schema = z.object({
  email: z.string()
    .email('email inválido'),
  code: z.string()
    .min(6, 'O codigo deve ter pelo menos 6 caracteres')
});

export type FormDataLogin = z.infer<typeof schema>;

export function ConfirmationCode() {
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const login = safelocalStorageGetItem<TLogin>('login');
    if (login) {
    }
  }, []);

  const form = useForm<FormDataLogin>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      code: ''
    }
  });

  const handleSubmit = form.handleSubmit(async ({ email, code }) => {
    try {
      const response = await AuthService.confirmAccount({ email, code });
      toast.success(response.success);
      return navigate('/login');
    } catch (err: any) {
      toast.error(err.response.data.error);
    }

  });

  async function handleResendCode() {
    const { email } = { email: form.getValues().email };
    form.setValue("code", '000000');
    try {
      setLoading(true)
      const response = await AuthService.resendCodeConfirmAccount({ email });
      toast.success(response.success);
    } catch (err: any) {
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
      form.setValue("code", '');
    }
  }

  const navigate = useNavigate()
  function handleRegister() {
    navigate('/register');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2,
      }}
    >
      <form onSubmit={(e) => handleSubmit(e)} className="w-full  h-screen justify-center flex md:w-[500px] md:m-[0_auto] px-10 flex-col gap-2">
        <div>
          <h1 className="text-4xl text-center font-bold tracking-[2px]" >RinaldoCar</h1>
          <Label htmlFor="email" >
            Email
          </Label>
          <Input disabled={form.formState.isSubmitting || loading} autoComplete="username" type="email" id="email" {...form.register('email')} />
          {form.formState.errors.email?.message && (
            <small className="text-destructive" >
              {form.formState.errors.email.message}
            </small>
          )}
        </div>

        <div>
          <Label htmlFor="code" >
            Code
          </Label>
          <Input disabled={form.formState.isSubmitting || loading} type="text" id="code" {...form.register('code')} />
          {form.formState.errors.code?.message && (
            <small className="text-destructive" >
              {form.formState.errors.code.message}
            </small>
          )}
        </div>

        <div className=" space-x-2 text-right">
          <p className="inline" >
            ainda não tem acesso? <strong className="cursor-pointer text-blue-500" onClick={handleRegister}>Registrar-se</strong>
          </p>
          {
            form.formState.isSubmitting || loading ? (
              <div className="flex justify-end">
                <Button disabled type="button">
                  <Loader text="processando..." />
                </Button>
              </div>
            ) : (
              <div className="space-x-2">
                <Button variant={"secondary"} className="shadow-xl" type="button" onClick={handleResendCode} >
                  Reenviar
                </Button>
                <Button className="shadow-xl" type="submit" >
                  Confirmar
                </Button>
              </div>
            )
          }
        </div>
      </form>
    </motion.div>
  )
}
