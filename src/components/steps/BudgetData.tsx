
import { safeSessionStorageGetItem } from "@/lib/utils";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../Button";
import { Input } from "../Input";
import { Label } from "../Label";
import { StepHeader } from "../StepHeader";
import { StepperFoter, StepperNextButton, StepperPreviousButton } from "../Stepper";
import { useStepper } from "../Stepper/useStepper";
import { SubTotal } from "../SubTotal";

const schema = z.object({
  description: z.string(),
  LaborCost: z.array(
    z.object({
      carPart: z.string(),
      price: z.number().nullable()
    })
  ),
  PartCost: z.array(
    z.object({
      carPartChange: z.string(),
      priceChange: z.number().nullable()
    })
  )
});

export type FormDataBudget = z.infer<typeof schema>;

export function BudgetData() {

  const { nextStep } = useStepper();
  let formIsDurty = false;

  const initialValue = safeSessionStorageGetItem<FormDataBudget>('Budget-data');

  const form = useForm<FormDataBudget>({
    defaultValues: {
      description: initialValue?.description ?? '',
      LaborCost: initialValue?.LaborCost.map(( item) => ({
        carPart: item.carPart ?? '',
        price: item.price ?? null,
      })),
      PartCost: initialValue?.PartCost.map((item) => ({
        carPartChange: item.carPartChange ?? '',
        priceChange: item.priceChange ?? null,
      })),
    }
  });

  useEffect(()=>{
    formIsDurty = form.formState.isDirty;
  },[form.formState.isDirty]);

  const handleSubmit = form.handleSubmit(async (formData) => {
    if (!initialValue || formIsDurty) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      sessionStorage.setItem('Budget-data', JSON.stringify(formData));
    }

    console.log(form.formState.isDirty);

    nextStep();
  })



  const laborCost = useFieldArray({
    control: form.control,
    name: 'LaborCost'
  })
  const partCost = useFieldArray({
    control: form.control,
    name: 'PartCost'
  })

  return (
    <form onSubmit={handleSubmit}>
      <StepHeader
        title="Dados do Orçamento"
        description="Insira os dados do Orçamento"
      />

      <Label htmlFor="description" >
        Descrição dos Reparos
      </Label>
      <Input id="description" placeholder="Digite a descrição do reparo" {...form.register('description')} />

      <div className="pt-6 space-y-6" >

        <h2 className="text-xl font-semibold tracking-tighter" >Mão de Obra</h2>

        <div className="space-y-2" >

          {laborCost.fields.map((item, index) => (
            <div key={item.id}>
              <h1> {index + 1}º </h1>
              <div>
                <Label htmlFor="carPart" >
                  Serviço a ser realizado:
                </Label>
                <Input id="carPart" placeholder="Digite a peça a ser reparada"  {...form.register(`LaborCost.${index}.carPart`)} />
              </div>

              <div className="flex items-end gap-4" >
                <div className="w-full">
                  <Label htmlFor="price" >
                    Valor do serviço:
                  </Label>
                  <Input id="price" type="number" placeholder="Digite o valor do reparo da peça" {...form.register(`LaborCost.${index}.price`, {
                    setValueAs: (value) => Number(value),
                    onBlur: (value) => (
                      console.log('form', form.getValues().LaborCost[index].carPart),
                      laborCost.update(index, {
                        carPart: form.getValues().LaborCost[index].carPart,
                        price: value.target.value
                      })
                    )
                  })} />
                </div>
                <Button
                  variant="destructive" type="button"
                  onClick={() => laborCost.remove(index)}
                >
                  <TrashIcon className="size-4" />
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              className="border-dashed"
              type="button"
              size="sm"
              variant="outline"
              onClick={() => laborCost.append({
                carPart: '', price: null
              })}
            >
              <PlusCircledIcon className="size-4 mr-1" />
              Adicionar novo campo
            </Button>
          </div>

        </div>

        <hr />

        <h2 className="text-xl font-semibold tracking-tighter" >Peças</h2>

        <div className="space-y-2" >

          {partCost.fields.map((item, index) => (
            <div key={item.id}>
              <h1> {index + 1}º </h1>
              <div>
                <Label className="w-[200px]" htmlFor="carPartChange" >
                  Peça a ser trocada:
                </Label>
                <Input id="carPartChange" placeholder="Digite a peça a ser reparada" {...form.register(`PartCost.${index}.carPartChange`)} />
              </div>

              <div className="flex items-end gap-4" >
                <div className="w-full">
                  <Label htmlFor="priceChange" >
                    Valor da peça:
                  </Label>
                  <Input id="priceChange" type="number" placeholder="Digite o valor do reparo da peça" {...form.register(`PartCost.${index}.priceChange`, {
                    setValueAs: (value) => Number(value),
                    onBlur: (value) => (
                      partCost.update(index, {
                        carPartChange: form.getValues().PartCost[index].carPartChange,
                        priceChange: value.target.value
                      })
                    )
                  })} />
                </div>
                <Button variant="destructive" type="button" onClick={() => partCost.remove(index)} >
                  <TrashIcon className="size-4" />
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              className="border-dashed"
              type="button"
              size="sm"
              variant="outline"
              onClick={() => partCost.append({
                carPartChange: '', priceChange: null
              })}
            >
              <PlusCircledIcon className="size-4 mr-1" />
              Adicionar novo campo
            </Button>
          </div>

        </div>

        <hr />

      </div>

      <SubTotal
        laborCost={form.getValues('LaborCost')} partCost={form.getValues('PartCost')}
      />

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
