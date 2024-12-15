import { Stepper } from "./components/Stepper";
import { BudgetData } from "./components/steps/BudgetData";
import { CarData } from "./components/steps/CarData";
import { PaymentData } from "./components/steps/PaymentData";
import { PersonalData } from "./components/steps/PersonalData";
import { Review } from "./components/steps/Review";

export function App() {
  return (
    <div className="w-full p-4 flex justify-center pt-20" >
      <Stepper
      initialStep={0}
        steps={[
          {
            label: 'Cliente',
            content: <PersonalData />
          },
          {
            label: 'Veiculo',
            content: <CarData />
          },
          {
            label: 'Orçamento',
            content: <BudgetData />
          },
          {
            label: 'Pagamento',
            content: <PaymentData />
          },
          {
            label: 'Revisar',
            content: <Review />
          },
        ]}
      />
    </div>
  )
}
