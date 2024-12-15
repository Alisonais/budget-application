import { safeSessionStorageGetItem } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../Input";
import { Label } from "../Label";
import { StepHeader } from "../StepHeader";
import { StepperFoter, StepperNextButton } from "../Stepper";
import { useStepper } from "../Stepper/useStepper";

const schema = z.object({
  name: z.string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .regex(/^[a-zA-Z ]+$/, 'O nome deve conter apenas letras e espaços'),

  adress: z.string(),

  neighborhood: z.string(),

  city: z.string(),

  phone: z.string()
    .min(10, 'O número de telefone deve ter pelo menos 10 dígitos')
    .regex(/^\d{2}9\d{8}$/, 'Formato de número de telefone brasileiro inválido'),
});

export type FormDataPersonal = z.infer<typeof schema>;

export function PersonalData() {

  const { nextStep } = useStepper();
  let formIsDurty = false;

  const initialValue = safeSessionStorageGetItem<FormDataPersonal>('personal-data');

  const form = useForm<FormDataPersonal>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialValue?.name ?? '',
      adress: initialValue?.adress ?? '',
      city: initialValue?.city ?? '',
      neighborhood: initialValue?.neighborhood ?? '',
      phone: initialValue?.phone ?? ''
    },
  });

  useEffect(()=>{
    formIsDurty = form.formState.isDirty;
  },[form.formState.isDirty]);

  const handleSubmit = form.handleSubmit(async (formData) => {
    if (!initialValue || formIsDurty) {
      await new Promise(resolve => setTimeout(resolve, 500));
      sessionStorage.setItem('personal-data', JSON.stringify(formData));
    };
    nextStep();
  });


  function formatName(string: string) {
    return string.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, (l: any) => l.toUpperCase());
  }

  return (
    <form onSubmit={handleSubmit} >
      <StepHeader
        title="Dados do Cliente"
        description="Insira os dados do Cliente"
      />

      <div className="space-y-2" >
        <div className="space-y-2" >
          <Label htmlFor="name" >
            Nome
          </Label>
          <Input id="name" {...form.register('name', {
            onChange: ((value => (
              value.target.value = formatName(value.target.value)
            )))
          })} />
          {form.formState.errors.name?.message && (
            <small className="text-destructive" >
              {form.formState.errors.name.message}
            </small>
          )}
        </div>

        <div className="space-y-2" >
          <Label htmlFor="phone" >
            Telefone
          </Label>
          <Input id="phone" type="tel" {...form.register('phone')} />
          {form.formState.errors.phone?.message && (
            <small className="text-destructive" >
              {form.formState.errors.phone.message}
            </small>
          )}
        </div>

        <div className="space-y-2" >
          <Label htmlFor="adress" >
            Endereço
          </Label>
          <Input id="adress" {...form.register('adress', {
            onChange: (value) => (
              value.target.value = formatName(value.target.value)
            )
          })} />
          {form.formState.errors.adress?.message && (
            <small className="text-destructive" >
              {form.formState.errors.adress.message}
            </small>
          )}
        </div>

        <div className="space-y-2" >
          <Label htmlFor="neighborhood" >
            Bairro
          </Label>
          <Input id="neighborhood" {...form.register('neighborhood', {
            onChange: (value) => (
              value.target.value = formatName(value.target.value)
            )
          })} />
          {form.formState.errors.neighborhood?.message && (
            <small className="text-destructive" >
              {form.formState.errors.neighborhood.message}
            </small>
          )}
        </div>

        <div className="space-y-2" >
          <Label htmlFor="city" >
            Cidade
          </Label>
          <Input id="city" {...form.register('city', {
            onChange: (value) => (
              value.target.value = formatName(value.target.value)
            )
          })} />
          {form.formState.errors.city?.message && (
            <small className="text-destructive" >
              {form.formState.errors.city.message}
            </small>
          )}
        </div>
      </div>

      <StepperFoter>
        <StepperNextButton
          disabled={form.formState.isSubmitting}
          preventDefault
          type="submit"
        />
      </StepperFoter>
    </form>
  );
};
