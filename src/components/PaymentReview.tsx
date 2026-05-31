import { FormData } from "@/pages/AllSteps";
import { formatDate } from "@/utils/utils";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";
import { PaymentDataStep, SubTotalData } from "./types/budgetTypes";

type dataPayment = {
  data?: SubTotalData,
  payment?: PaymentDataStep,
}

export function PaymentReview({ data, payment }: dataPayment) {

  const form = useFormContext<FormData>();
  const paymentData = form ? form.getValues('paymentDataStep') : payment;
  const priceData = form ? form.getValues('subTotalData') : data;

  return (
    <div>

      <h2 className="bg-zinc-700 text-white text-center tracking-[2px] font-bold border-[1px] rounded-lg" >Forma de Pagamento</h2>


      <div className=" my-2 flex flex-col gap-1">

        {(!paymentData?.partpayment && !paymentData?.laborpayment) && (
          <div className="flex flex-col gap-2" >
            <p> Pagamento a Combinar </p>
          </div>
        )}

        {paymentData?.partpayment && (
          <div className="flex flex-col gap-2" >
            <p className="font-bold"> Pagamento das peças: </p>
            <div className="flex items-center" >
              <div className="size-4">
                <DoubleArrowRightIcon />
              </div>
              <p className="pl-2"> {paymentData?.partpayment} </p>
            </div>
          </div>
        )}

        {(paymentData?.partpayment && paymentData.laborpayment) && (
          <hr />
        )}

        {(paymentData?.laborpayment && paymentData?.laborpayment?.length > 0) ? (
          <div className="flex flex-col gap-2" >
            <p className="font-bold"> Pagamento da mão de obra: </p>
            <div className="flex flex-col space-y-2" >
              {paymentData.laborpayment.map((item, index) => (
                <div key={index} className="flex flex-row gap-2">
                  <p>{index + 1}º</p>
                  <div>{item.type}: {Number(item.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}, no dia {formatDate({dateTolongFormat: item.createdAt})}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Pagamento a combinar</p>
        )}
      </div>

      <h2 className="bg-zinc-700 text-white text-center tracking-[2px] font-bold border-[1px] rounded-lg" >Valores</h2>

      <div>

        <div>
          {
            priceData?.partPrice !== 0 && (
              <div className="flex justify-between gap-2" >
                <p className="font-semibold"> Valor das Peças: </p>
                <p className="font-semibold"> {Number(priceData?.partPrice).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </p>
              </div>
            )}
        </div>
        <div className=" my-1 flex flex-col gap-1">
          {
            priceData?.laborPrice !== 0 && (
              <div className="flex justify-between gap-2" >
                <p className="font-semibold"> Valor da Mão de Obra: </p>
                <p className="font-semibold"> {Number(priceData?.laborPrice ? priceData.laborPrice : 0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </p>
              </div>
            )}
        </div>

        <div>
          {
            priceData?.totalValue !== 0 && (
              <div className="flex justify-between gap-2" >
                <p className="text-lg font-bold">Valor Estimado do Reparo: </p>
                <p className="font-bold border-t-2 border-zinc-600"> {Number(priceData?.totalValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </p>
              </div>
            )}
        </div>

      </div>

    </div>
  );
}
