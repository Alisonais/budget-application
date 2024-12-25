
import { FormData } from "@/AllSteps";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { StepHeader } from "@/components/StepHeader";
import { StepperFoter, StepperNextButton, StepperPreviousButton } from "@/components/Stepper";
import { useStepper } from "@/components/Stepper/useStepper";
import { SubTotal } from "@/components/SubTotal";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { useFieldArray, useFormContext } from "react-hook-form";

export function BudgetData() {

  const { nextStep } = useStepper();
  const form = useFormContext<FormData>();

  const laborCost = useFieldArray({
    control: form.control,
    name: 'budgetDataStep.LaborCost'
  });
  const partCost = useFieldArray({
    control: form.control,
    name: 'budgetDataStep.PartCost'
  });

  async function handleNextStep() {
    const isValid = await form.trigger('budgetDataStep');

    if (isValid) {
      nextStep();
    };
  };

  return (
        <div>
          <StepHeader
            title="Dados do Orçamento"
            description="Insira os dados do Orçamento"
          />

          <Label htmlFor="description" >
            Descrição dos Reparos
          </Label>
          <Input id="description" placeholder="Digite a descrição do reparo" {...form.register('budgetDataStep.description')} />

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
                    <Input id="carPart" placeholder="Digite a peça a ser reparada"  {...form.register(`budgetDataStep.LaborCost.${index}.carPart`)} />
                  </div>

                  <div className="flex items-end gap-4" >
                    <div className="w-full">
                      <Label htmlFor="price" >
                        Valor do serviço:
                      </Label>
                      <Input id="price" type="number" placeholder="Digite o valor do reparo da peça" {...form.register(`budgetDataStep.LaborCost.${index}.price`, {
                        setValueAs: (value) => Number(value),
                        onBlur: (value) => (
                          laborCost.update(index, {
                            carPart: form.getValues().budgetDataStep.LaborCost[index].carPart,
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
                    <Input id="carPartChange" placeholder="Digite a peça a ser reparada" {...form.register(`budgetDataStep.PartCost.${index}.carPartChange`)} />
                  </div>

                  <div className="flex items-end gap-4" >
                    <div className="w-full">
                      <Label htmlFor="priceChange" >
                        Valor da peça:
                      </Label>
                      <Input id="priceChange" type="number" placeholder="Digite o valor do reparo da peça" {...form.register(`budgetDataStep.PartCost.${index}.priceChange`, {
                        setValueAs: (value) => Number(value),
                        onBlur: (value) => (
                          partCost.update(index, {
                            carPartChange: form.getValues().budgetDataStep.PartCost[index].carPartChange,
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

          <SubTotal />

          <StepperFoter>
            <StepperPreviousButton />
            <StepperNextButton onClick={handleNextStep} />
          </StepperFoter>
        </div>
  );
}
