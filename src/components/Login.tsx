import { useAuth } from "@/hooks/useAuth";
import { safeSessionStorageGetItem } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";

const schema = z.object({
  usuario: z.string()
    .min(2, 'O usuario deve ter no minimo 2 caracteres'),

  Senha: z.string()
    .min(4, 'A senha deve ter no minimo 4 caracteres')
});

export type FormDataLogin = z.infer<typeof schema>;

export type TLogin = { signedIn: boolean }

export function Login() {

  useLayoutEffect(() => {
    const login = safeSessionStorageGetItem<TLogin>('login');
    if (login) {
      setSigned(true);
    }
  }, []);
  const { setSigned } = useAuth();

  const form = useForm<FormDataLogin>({
    resolver: zodResolver(schema),
    defaultValues: {
      usuario: '',
      Senha: ''
    }
  });

  const handleSubmit = form.handleSubmit(async (formData) => {


    if (formData.usuario === 'ri' && formData.Senha === '1234') {
      sessionStorage.setItem('login', JSON.stringify({ signedIn: true }));
      setSigned(true);
    }
  })

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{
        duration:2,
      }}
    >
      <form onSubmit={(e) => handleSubmit(e)} className="w-full  h-screen justify-center flex md:w-[500px] md:m-[0_auto] px-10 flex-col gap-2">
        <div>
          <h1 className="text-4xl text-center font-bold tracking-[2px]" >RinaldoCar</h1>
          <Label htmlFor="usuario" >
            Usuario
          </Label>
          <Input id="usuario" {...form.register('usuario')} />
          {form.formState.errors.usuario?.message && (
            <small className="text-destructive" >
              {form.formState.errors.usuario.message}
            </small>
          )}
        </div>

        <div>
          <Label htmlFor="senha" >
            Senha
          </Label>
          <Input id="senha" {...form.register('Senha')} />
          {form.formState.errors.Senha?.message && (
            <small className="text-destructive" >
              {form.formState.errors.Senha.message}
            </small>
          )}
        </div>

        <div className="text-right">
          <Button className="shadow-xl" type="submit" >
            Entrar
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
