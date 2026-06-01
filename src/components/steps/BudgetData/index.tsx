import { BudgetDataInput } from "@/components/BudgetDataInput";
import { Input } from "@/components/Input";
import { StepHeader } from "@/components/StepHeader";
import { StepperFoter, StepperNextButton, StepperPreviousButton } from "@/components/Stepper";
import { useStepper } from "@/components/Stepper/useStepper";
import { SubTotal } from "@/components/SubTotal";
import { Textarea } from "@/components/textarea";
import { FormData } from "@/pages/AllSteps";
import { formatDate } from "@/utils/utils";
import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";
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
      localStorage.setItem('formValues', JSON.stringify(form.getValues()));
      nextStep();
    };
  };

  useEffect(()=> {
    const date = new Date(form.getValues('createdAt'));


    console.log(date instanceof Date);
    console.log(date);


    if (date instanceof Date) {
      const dateToInput = formatDate({dateInUnix: date.getTime()});
      form.setValue('createdAt', dateToInput as any);
    };

  },[]);

  return (
    <div>
      <StepHeader
        title="Dados do Orçamento"
        description="Insira os dados do Orçamento"
      />

      <div className="flex gap-2 flex-col">
        <Label htmlFor="description" >
          Data
        </Label>
        <Input type="date" id="createdAt" placeholder="Insira a data do reparo" {...form.register('createdAt')} />

        <Label htmlFor="description" >
          Descrição dos Reparos
        </Label>
        <Textarea id="description" placeholder="Digite a descrição do reparo" {...form.register('budgetDataStep.description')} />
      </div>



      <div className="pt-6 space-y-6" >

        <BudgetDataInput budgetItem={laborCost} form={form} title="Mão de Obra" type="labor" />

        <BudgetDataInput budgetItem={partCost} form={form} title="Peças" type="part" />

      </div>

      <SubTotal />

      <StepperFoter>
        <StepperPreviousButton />
        <StepperNextButton onClick={handleNextStep} />
      </StepperFoter>
    </div>
  );
}
