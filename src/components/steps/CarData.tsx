import { safeSessionStorageGetItem } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../Input";
import { Label } from "../Label";
import { StepHeader } from "../StepHeader";
import { StepperFoter, StepperNextButton, StepperPreviousButton } from "../Stepper";
import { useStepper } from "../Stepper/useStepper";



const schema = z.object({
  model: z.string().min(1, 'Imforme o modelo do veiculo'),

  brand: z.string(),

  plate: z.string(),

  year: z.number().min(1900, 'Informe o ano do veiculo').max(new Date().getFullYear() + 1, 'Informe o ano do veiculo'),

  color: z.string().min(1, 'Informe a cor do veiculo'),
});

export type FormDataCar = z.infer<typeof schema>;

export function CarData() {

  const { nextStep } = useStepper();
  let formIsDurty = false;

  const initialValue = safeSessionStorageGetItem<FormDataCar>('car-data')

  const form = useForm<FormDataCar>({
    resolver: zodResolver(schema),
    defaultValues: {
      model:initialValue?.model?? '',
      color:initialValue?.color?? '',
      brand:initialValue?.brand?? '',
      plate:initialValue?.plate?? '',
      year:initialValue?.year?? undefined,
    }
  });

  useEffect(()=>{
    formIsDurty = form.formState.isDirty;
  },[form.formState.isDirty]);

  const handleSubmit = form.handleSubmit(async (formData) => {
    if(!initialValue || formIsDurty){
    await new Promise(resolve => setTimeout(resolve, 500));
    sessionStorage.setItem('car-data', JSON.stringify(formData));
    }
    nextStep();
  });

  function toUpperCase(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <form onSubmit={handleSubmit} >
      <StepHeader
        title="Dados do veiculo"
        description="Insira os dados do Veiculo"
      />

      <div className="grid grid-cols-2 gap-2" >

        <div className="space-y-2" >
          <Label htmlFor="model" >
            Modelo
          </Label>
          <Input id="model" {...form.register('model', {
            onChange: (value) => (
              value.target.value = toUpperCase(value.target.value)
            )
          }
          )} />
          {form.formState.errors.model?.message && (
            <small className="text-destructive" >
              {form.formState.errors.model.message}
            </small>
          )}
        </div>

        <div className="space-y-2" >
          <Label htmlFor="brand" >
            Marca
          </Label>
          <Input id="brand" {...form.register('brand', {
            onChange: (value) => (
              value.target.value = toUpperCase(value.target.value)
            )
          }
          )} />
          {form.formState.errors.brand?.message && (
            <small className="text-destructive" >
              {form.formState.errors.brand.message}
            </small>
          )}
        </div>



        <div className="space-y-2" >
          <Label htmlFor="plate" >
            Placa
          </Label>
          <Input id="plate" {...form.register('plate')} />
          {form.formState.errors.plate?.message && (
            <small className="text-destructive" >
              {form.formState.errors.plate.message}
            </small>
          )}
        </div>

        <div className="space-y-2" >
          <Label htmlFor="year" >
            Ano
          </Label>
          <Input id="year" type="number" {...form.register('year',
            { setValueAs: value => Number(value) }
          )}
          />
          {form.formState.errors.year?.message && (
            <small className="text-destructive" >
              {form.formState.errors.year.message}
            </small>
          )}
        </div>

        <div className="space-y-2" >
          <Label htmlFor="color" >
            Cor
          </Label>
          <Input id="color" {...form.register('color', {
            onChange: (value) => (
              value.target.value = toUpperCase(value.target.value)
            )
          }
          )} />
          {form.formState.errors.color?.message && (
            <small className="text-destructive" >
              {form.formState.errors.color.message}
            </small>
          )}
        </div>

      </div>

      <StepperFoter>
        <StepperPreviousButton />
        <StepperNextButton
          disabled={form.formState.isSubmitting}
          preventDefault
          type="submit"
        />
      </StepperFoter>
    </form>
  );
}
