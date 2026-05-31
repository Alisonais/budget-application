import { FormData } from "@/pages/AllSteps";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { BudgetModal } from "./bugetModal";
import { Button } from "./Button";
import { Input } from "./Input";

type budgetDataInputParams = {
  type: 'labor' | 'part';
  budgetItem: UseFieldArrayReturn<FormData>;
  form: UseFormReturn<FormData>;
  title: string;
}


export function BudgetDataInput({ type, budgetItem, form, title }: budgetDataInputParams) {

  return (
    <>
      <h2 key={Math.random()} className="text-xl font-semibold tracking-tighter" >{title}</h2>

      <div className="space-y-2" >
        {budgetItem.fields.map((item, index) => (
          <div key={Math.random()}>
            <div key={item.id}>
              <h1> {index + 1}º </h1>
              <div>
                <Label
                  htmlFor={type === 'labor' ? 'carPart' : 'carPartChange'}
                >
                  {type === 'labor' ? 'Serviço a ser realizado:' : 'Peça a ser trocada:'}
                </Label>

                <Input
                  id={type === 'labor' ? 'carPart' : 'carPartChange'}
                  placeholder="Digite o nome da peça..."
                  {...form.register(type === 'labor'
                    ? (`budgetDataStep.LaborCost.${index}.carPart`)
                    : (`budgetDataStep.PartCost.${index}.carPartChange`)
                  )}
                />
              </div>

              <div className="flex items-end gap-4" >

                <div className="w-full">
                  <Label
                    htmlFor={type === 'labor' ? 'price' : 'priceChange'}
                  >
                    {type === 'labor' ? 'Valor do serviço:' : 'Valor da peça:'}
                  </Label>

                  <Input
                    id={type === 'labor' ? 'price' : 'priceChange'}
                    type="number"
                    placeholder="Digite o valor..."
                    {...form.register(type === 'labor'
                      ? `budgetDataStep.LaborCost.${index}.price`
                      : `budgetDataStep.PartCost.${index}.priceChange`,
                      {
                        setValueAs: (value) => Number(value),
                        onBlur: (value) => (
                          type === 'labor'
                            ? (budgetItem.update(index, {
                              carPart: form.getValues().budgetDataStep.LaborCost[index].carPart,
                              price: value.target.value
                            }))
                            : (budgetItem.update(index, {
                              carPartChange: form.getValues().budgetDataStep.PartCost[index].carPartChange,
                              priceChange: value.target.value
                            }))
                        )
                      }
                    )}
                  />

                </div>
                <Button
                  variant="destructive" type="button"
                  onClick={() => budgetItem.remove(index)}
                >
                  <TrashIcon className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-2 justify-end">
          <Button
            className="border-dashed"
            type="button"
            size="sm"
            variant="outline"
            onClick={() => budgetItem.append({
              carPart: '', price: null
            })}
          >
            <PlusCircledIcon className="size-4 mr-1" />
            Adicionar novo campo
          </Button>
          <BudgetModal
            form={budgetItem}
            type={type}
            variant="outline"
            title="Adicionar rápido"
            description={type === 'labor'
              ? "Selecione as peças a serem reparadas"
              : "Selecione as peças a serem trocadas"
            }
          />
        </div>

      </div>
    </>
  )
}
