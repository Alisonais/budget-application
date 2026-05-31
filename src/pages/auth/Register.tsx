import { AuthService } from "@/services/AuthService";
import { safelocalStorageGetItem } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useLayoutEffect } from "react";
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
  name: z.string()
    .min(2, 'O nome deve ter no minimo 2 caracteres'),
  phone: z.string()
    .min(11, 'Este não é um numero de telefone válido'),
  email: z.string()
    .email('Este capo deve tr um email válido'),
  password: z.string()
    .min(4, 'A senha deve ter no minimo 4 caracteres')
});

export type FormDataLogin = z.infer<typeof schema>;

export function Register() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const login = safelocalStorageGetItem<TLogin>('login');
    if (login) {
    }
  }, []);

  const form = useForm<FormDataLogin>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: ''
    }
  });

  const handleSubmit = form.handleSubmit(async ({
    name, email, password, phone
  }) => {
    try {
      const response = await AuthService.signUp({ name, email, password, phone });
      toast.success(response);
      navigate('/confirmation-code');
    } catch  {
      toast.error('Erro ao criar usuario 🙄.')
    }
  });

  function handleLogin() {
    navigate('/login');
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2,
      }}
    >
      <form onSubmit={(e) => handleSubmit(e)} className="w-full  h-screen justify-center flex md:w-[500px] md:m-[0_auto] px-10 flex-col gap-2 ">

        <h1 className="text-4xl text-center font-bold tracking-[2px]" >RinaldoCar</h1>

        <div>
          <Label htmlFor="usuario" >
            Nome
          </Label>
          <Input disabled={form.formState.isSubmitting} id="name" type="text" autoComplete="name" {...form.register('name')} />
          {form.formState.errors.name?.message && (
            <small className="text-destructive" >
              {form.formState.errors.name.message}
            </small>
          )}
        </div>

        <div>
          <Label htmlFor="phone" >
            Telefone
          </Label>
          <Input disabled={form.formState.isSubmitting} id="phone" autoComplete="phone" {...form.register('phone')} />
          {form.formState.errors.phone?.message && (
            <small className="text-destructive" >
              {form.formState.errors.phone.message}
            </small>
          )}
        </div>

        <div>
          <Label htmlFor="email" >
            Email
          </Label>
          <Input disabled={form.formState.isSubmitting} id="email" type="email" autoComplete="username" {...form.register('email')} />
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
          <Input disabled={form.formState.isSubmitting} id="pasword" type="password" autoComplete="new-password" {...form.register('password')} />
          {form.formState.errors.password?.message && (
            <small className="text-destructive" >
              {form.formState.errors.password.message}
            </small>
          )}
        </div>

        <div className="space-x-2 text-right">
          <p className="inline" >
            já tem acesso? <strong className="cursor-pointer text-blue-500" onClick={handleLogin}>Logar!</strong>
          </p>
          <Button disabled={form.formState.isSubmitting} className="shadow-xl" type="submit" >
            {form.formState.isSubmitting ? <Loader text='Registrando ...' /> : 'Registrar'}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
