import { FormData } from "@/pages/AllSteps";
import { BudgetService } from "@/services/BudgetService";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { CarReview } from "./CarReview";
import { PaymentReview } from "./PaymentReview";
import { PersonalReview } from "./PersonalReview";
import { RepairReview } from "./RepairReview";

interface IModalCardBudgetProps {
  cardBudgetId: any;
};

export function ModalCardBudget({ cardBudgetId }: IModalCardBudgetProps) {

  const form = useForm<FormData>();
  const navigate = useNavigate();

  async function formpage(budgetId: string) {
    const { budget } = await BudgetService.getBudgetById(budgetId);
    navigate('/steppers', { state: budget })
  }

  useEffect(() => {
    async function getBudget() {
      const { budget } = await BudgetService.getBudgetById(cardBudgetId);


      form.reset(budget);
    }
    getBudget();
  }, []);


  const personal = form.getValues('personalDataStep');
  const car = form.getValues('carDataStep');
  const budget = form.getValues('budgetDataStep');
  const payment = form.getValues('paymentDataStep');
  const subtotal = form.getValues('subTotalData');

  return (
    <div>
      <div className="flex justify-end pb-2">
        <Button className="bg-zinc-700" type="button" onClick={() => formpage(cardBudgetId)}>Editar</Button>
      </div>
      <PersonalReview data={personal} />
      <CarReview data={car} />
      <RepairReview data={budget} />
      <PaymentReview data={subtotal} payment={payment} />
    </div>
  )
}
