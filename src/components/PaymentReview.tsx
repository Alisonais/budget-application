import { safeSessionStorageGetItem, sessionNameKeys } from "@/lib/utils";
import { FormDataPayment } from "./PayInput";
import { FormDataPrice } from "./SubTotal";

export function PaymentReview() {
  const paymentData = safeSessionStorageGetItem<FormDataPayment>(sessionNameKeys[3]);
  const priceData = safeSessionStorageGetItem<FormDataPrice>(sessionNameKeys[4]);
  return (
    <div>

      <h2 className="bg-zinc-700 text-white text-center tracking-[2px] font-bold border-[1px] rounded-lg" >Forma de Pagamento</h2>


      <div className=" my-2 flex flex-col gap-1">

        {(!paymentData?.onTimePay && !paymentData?.creditPay) && (
          <div className="flex flex-col gap-2" >
            <p> Pagamento a Combinar </p>
          </div>
        )}

        {paymentData?.onTimePay && (
          <div className="flex flex-col gap-2" >
            <p className="font-bold"> Pagamento á Vista: </p>
            <p className="pl-2"> {paymentData?.onTimePay} </p>
          </div>
        )}

        {(paymentData?.onTimePay && paymentData.creditPay) && (
          <hr />
        )}

        {paymentData?.creditPay && (
          <div className="flex flex-col gap-2" >
            <p className="font-bold"> Pagamento via Cartão: </p>
            <p className="pl-2"> {paymentData?.creditPay} </p>
          </div>
        )}
      </div>

      <h2 className="bg-zinc-700 text-white text-center tracking-[2px] font-bold border-[1px] rounded-lg" >Valores</h2>

      <div>
        <div className=" my-1 flex flex-col gap-1">
          {
            priceData?.laborPrice && (
              <div className="flex justify-between gap-2" >
                <p className="font-semibold"> Valor da Mão de Obra: </p>
                <p className="font-semibold"> {priceData?.laborPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </p>
              </div>
            )}
        </div>

        <div>
          {
            priceData?.partPrice !== 0 && (
              <div className="flex justify-between gap-2" >
                <p className="font-semibold"> Valor das Peças: </p>
                <p className="font-semibold"> {priceData?.partPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </p>
              </div>
            )}
        </div>

        <div className="flex justify-between gap-2" >
          <p className="text-lg font-bold">Valor Estimado do Reparo: </p>
          <p className="font-bold border-t-2 border-zinc-600"> {(Number(priceData?.laborPrice) + Number(priceData?.partPrice)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </p>
        </div>

      </div>

    </div>
  );
}
