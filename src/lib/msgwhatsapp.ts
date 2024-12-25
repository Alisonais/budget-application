import { FormData } from "@/AllSteps";
import { safeSessionStorageGetItem } from "./utils";



export function msg(){

  const formData = safeSessionStorageGetItem<FormData>('formValues');
  const personalData = formData?.personalDataStep;
  const carData = formData?.carDataStep;
  const budgetData = formData?.budgetDataStep;
  const paymentData = formData?.paymentDataStep;
  const priceData = formData?.subTotalData;

  return `Olá, *${personalData?.name}* tudo bem? Segue nosso orçamento, ficou com dúvida? estamos a disposição!

  *Descrição do Veículo*

    - Modelo = ${carData?.model}
    - Cor = ${carData?.color}
    - Ano = ${carData?.year}

  *Descrição do Reparo*
  ${budgetData?.LaborCost.map((item) => (
    `
    - Peça:${item.carPart}.
    - Valor: ${item.price?.toLocaleString('pt-br', {style:'currency', currency: 'BRL'})}.
    `
  )).join('')
  }
  *Peças a Comprar*
  ${budgetData?.PartCost.map((item) => (
    `
    - Peça:${item.carPartChange}.
    - Valor: ${item.priceChange?.toLocaleString('pt-br', {style:'currency', currency: 'BRL'})}.
    `
  )).join('')
  }${budgetData?.description &&
  `*Observação*
    ${budgetData?.description}`}
  *Formas de Pagamento*

  ${paymentData?.onTimePay &&
  ` - Pagamento a vista:
      ${paymentData?.onTimePay}`}

  ${paymentData?.creditPay &&
  ` - Pagamento no Cartão:
      ${paymentData?.creditPay}`}

  *Valores*

    *Mão de obra*: ${priceData?.laborPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
    *Peças*: ${priceData?.partPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}

    *TotalEstimado*: ${(Number(priceData?.laborPrice) + Number(priceData?.partPrice)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}

  *RinaldoCar funilaria e pintura*
  _Método Exclusivo de Reparo_
  _Produtos de Alta Qualidade_
  `
}
