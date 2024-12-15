import { safeSessionStorageGetItem, sessionNameKeys } from "@/lib/utils";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { FormDataBudget } from "./steps/BudgetData";

export function RepairReview() {
  const budgetData = safeSessionStorageGetItem<FormDataBudget>(sessionNameKeys[2]);
  console.log(budgetData?.PartCost[0])
  return (
    <div>

      {budgetData?.description && (
        <>
          <h2 className="bg-zinc-700 text-white text-center tracking-[2px] font-bold border-[1px] rounded-lg" > Observação sobre o Reparo </h2>
          <div className="flex items-center my-1" >
            <div className="size-4">
            <DoubleArrowRightIcon />
            </div>
            <p className="pl-2" > {budgetData?.description}. </p>
          </div></>
      )}

      <h2 className="bg-zinc-700 text-white text-center tracking-[2px] font-bold border-[1px] rounded-lg" > Descrição dos Reparos </h2>
      <div className=" my-1 flex flex-col gap-1">
        {
          budgetData?.LaborCost.map((item, index) => (
            <div key={index} className="" >
              <div className="flex items-center gap-2">
                <div className="size-4">
                  <DoubleArrowRightIcon />
                </div>
                <p className="max-w-max" > {item.carPart}. </p>
              </div>
              <p className="text-right font-bold"> {item.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </p>
            </div>
          ))
        }
      </div>

      {budgetData?.PartCost[0] && (
        <>
          <h2 className="bg-zinc-700 text-white text-center tracking-[2px] font-bold border-[1px] rounded-lg" > Peças </h2>

          <div className=" my-1 flex flex-col gap-1">
            {
              budgetData?.PartCost.map((item, index) => (
                <div key={index} className="flex justify-between" >
                  <div className="flex items-center gap-2">
                    <div className="size-4">
                      <DoubleArrowRightIcon />
                    </div>
                    <p> {item.carPartChange} </p>
                  </div>
                  <p className="text-right font-bold"> {item.priceChange?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </p>
                </div>
              ))
            }
          </div></>
      )}

    </div>
  );
}
