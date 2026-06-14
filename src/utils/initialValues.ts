import { IBudgetData, laborpayment } from "@/components/types/budgetTypes";
import { formatDate } from "./utils";

export function initialValues(initialvalue: IBudgetData) {

  return {
    id: initialvalue?.id ?? '',
    status: initialvalue?.status ?? 'PENDENTE',
    createdAt: initialvalue?.createdAt ?? new Date(),
    personalDataStep: {
      name: initialvalue?.personalDataStep.name ?? '',
      phone: initialvalue?.personalDataStep.phone ?? '',
      adress: initialvalue?.personalDataStep.adress ?? '',
      neighborhood: initialvalue?.personalDataStep.neighborhood ?? '',
      city: initialvalue?.personalDataStep.city ?? ''
    },
    carDataStep: {
      model: initialvalue?.carDataStep.model ?? '',
      brand: initialvalue?.carDataStep.brand ?? '',
      plate: initialvalue?.carDataStep.plate ?? '',
      year: initialvalue?.carDataStep.year ?? null,
      color: initialvalue?.carDataStep.color ?? ''
    },
    budgetDataStep: {
      description: initialvalue?.budgetDataStep?.description ?? '',
      LaborCost: initialvalue?.budgetDataStep?.LaborCost?.map((item: any) => ({
        carPart: item.carPart ?? '',
        price: item.price ?? null,
      })),
      PartCost: initialvalue?.budgetDataStep?.PartCost?.map((item: any) => ({
        carPartChange: item.carPartChange ?? '',
        priceChange: item.priceChange ?? null,
      })),
    },
    subTotalData: {
      laborPrice: initialvalue?.subTotalData?.laborPrice ?? null,
      partPrice: initialvalue?.subTotalData?.partPrice ?? null,
      totalValue: initialvalue?.subTotalData?.totalValue ?? null,
    },
    paymentDataStep: {
      partpayment: initialvalue?.paymentDataStep?.partpayment ?? '',
      laborpayment: initialvalue?.paymentDataStep?.laborpayment
        && initialvalue?.paymentDataStep?.laborpayment.map((item: laborpayment) => ({
          id: item.id ?? '',
          createdAt: formatDate({ dateInUnix: + item.createdAt}) ?? formatDate({ dateInUnix: new Date().getTime() }),
          budgetId: item.budgetId ?? '',
          type: item.type ?? 'CREDIT',
          value: item.value ?? null,
        })),
    }
  }
}
