import { useAuth } from "@/hooks/useAuth";
import { safelocalStorageGetItem } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useCallback, useLayoutEffect } from "react";
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

  password: z.string()
    .min(6, 'A senha deve ter no minimo 6 caracteres')
});

export type FormDataLogin = z.infer<typeof schema>;


export function Login() {

  const navigate = useNavigate();
  const { signIn } =useAuth();

  useLayoutEffect(() => {
    const login = safelocalStorageGetItem<TLogin>('login');
    if (login) {
    }
  }, []);

  const form = useForm<FormDataLogin>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = form.handleSubmit(async ({email, password}) => {
    try{
      await signIn({email, password});
      toast.success('logado com sucesso');
    } catch(err:any) {
      toast.error('Credenciais Inválidas');
    }
  });


  const handleRegister = useCallback(()=> {
    navigate('/register');
  }, []);

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
          <Input disabled={form.formState.isSubmitting} autoComplete="username" type="email" id="email" {...form.register('email')} />
          {form.formState.errors.email?.message && (
            <small className="text-destructive" >
              {form.formState.errors.email.message}
            </small>
          )}
        </div>

        <div>
          <Label htmlFor="password" >
            Senha
          </Label>
          <Input disabled={form.formState.isSubmitting} autoComplete="new-password" type="password" id="password" {...form.register('password')} />
          {form.formState.errors.password?.message && (
            <small className="text-destructive" >
              {form.formState.errors.password.message}
            </small>
          )}
        </div>

        <div className=" space-x-2 text-right">
          <p className="inline" >
            ainda não tem acesso? <strong className="cursor-pointer text-blue-500" onClick={handleRegister}>Registrar-se</strong>
          </p>
          <Button disabled={form.formState.isSubmitting} className="shadow-xl" type="submit" >
            {form.formState.isSubmitting ? <Loader text='Entrando ...' /> : 'Entrar'}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
