import { FormDataPayment } from "@/components/PayInput";
import { FormDataBudget } from "@/components/steps/BudgetData";
import { FormDataCar } from "@/components/steps/CarData";
import { FormDataPersonal } from "@/components/steps/PersonalData";
import { FormDataPrice } from "@/components/SubTotal";
import { safeSessionStorageGetItem, sessionNameKeys } from "./utils";

const personalData = safeSessionStorageGetItem<FormDataPersonal>(sessionNameKeys[0]);
const carData = safeSessionStorageGetItem<FormDataCar>(sessionNameKeys[1]);
const budgetData = safeSessionStorageGetItem<FormDataBudget>(sessionNameKeys[2]);
const paymentData = safeSessionStorageGetItem<FormDataPayment>(sessionNameKeys[3]);
const priceData = safeSessionStorageGetItem<FormDataPrice>(sessionNameKeys[4]);


export const msg = `Olá, *${personalData?.name}* tudo bem? Segue nosso orçamento, ficou com dúvida? estamos a disposição!

*Descrição do Veículo*

  > Modelo = ${carData?.model}
  > Cor = ${carData?.color}
  > Ano = ${carData?.year}

_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

*Descrição do Reparo*
${budgetData?.LaborCost.map((item) => (
  `
  >Peça:${item.carPart}.
  >Valor: ${item.price?.toLocaleString('pt-br', {style:'currency', currency: 'BRL'})}.
  `
)).join('')
}
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

*Peças a Comprar*
${budgetData?.PartCost.map((item) => (
  `
  >Peça:${item.carPartChange}.
  >Valor: ${item.priceChange?.toLocaleString('pt-br', {style:'currency', currency: 'BRL'})}.
  `
)).join('')
}
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

*Observação*

  ${budgetData?.description}
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

*Formas de Pagamento*

>Pagamento a vista:
${paymentData?.onTimePay}

>Pagamento no Cartão:
${paymentData?.creditPay}

_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

*Valores*

  *Mão de obra*: ${priceData?.laborPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
  *Peças*: ${priceData?.partPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}

  *TotalEstimado*: ${(Number(priceData?.laborPrice) + Number(priceData?.partPrice)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}

*RinaldoCar funilaria e pintura*
_Método Exclusivo de Reparo_
_Produtos de Alta Qualidade_
`
