import { PayTextObservation } from "../PayTextObservation";

export function PayInput() {

  // const form = useFormContext<FormData>();
  // const laborPayment = form ? form.getValues('paymentDataStep.laborpayment') : undefined;

  return (
    <div className="flex flex-col gap-4" >

     {/* {
      laborPayment?.map(()=> (
        <div>alison</div>
      ))
     } */}


     <div>alison</div>

      <PayTextObservation
        id="creditPay"
        label="Pagamento da Mão de Obra"
        formToRegister="paymentDataStep.laborpayment"
      />

    </div>
  );
};


