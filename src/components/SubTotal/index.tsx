import { FormData } from "@/AllSteps";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";

export function SubTotal() {

  const form = useFormContext<FormData>();

  // console.log(form.getValues('budgetDataStep').LaborCost);

  const laborValue = useMemo(() => {
    let laborValue = 0;
    if (form.getValues('budgetDataStep').LaborCost) {
      const laborArray = form.getValues('budgetDataStep').LaborCost;
      if (laborArray.length > 0) {
        const laborObjValue = laborArray.reduce((a, c) => {
          return { carPart: '', price: Number(a.price !== null ? a.price : 0) + Number(c.price !== null ? c.price : 0)};
        });
        laborValue = laborObjValue.price || 0;
      };
      form.setValue('subTotalData.laborPrice', laborValue);
      return laborValue;
    };
  }, [form.getValues('budgetDataStep').LaborCost]);

  const partValue = useMemo(() => {
    let partValue = 0;
    if(form.getValues('budgetDataStep').PartCost){
      const partArray = form.getValues('budgetDataStep').PartCost;
      if(partArray.length > 0){
        const partObjValue = partArray.reduce((a, c) => {
          return {carPartChange: '', priceChange: Number(a.priceChange !== null ? a.priceChange: 0) + Number(c.priceChange !== null ? c.priceChange: 0)};
        });
        partValue = partObjValue.priceChange || 0;
      }
      form.setValue('subTotalData.partPrice', partValue);
      return partValue;
    }
  }, [form.getValues('budgetDataStep').PartCost]);

  const totalValue = useMemo(() => {
    const totalValueReturned = Number(laborValue ? laborValue : 0) + Number(partValue ? partValue : 0);
    form.setValue('subTotalData.totalValue', totalValueReturned);
    return totalValueReturned;
  }, [laborValue, partValue]);

  // console.log('mão de obra',laborValue, 'pecas', partValue, 'total', totalValue);

  useEffect(() => {
  }, []);

  return (
    <div className="text-xl tracking-tighter mt-10 flex flex-col">
      <span>
        Total Mão de Obra: {Number(laborValue? laborValue: 0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
      </span>
      <span>
        Total Peças: {Number(partValue? partValue: 0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
      </span>
      <span className="font-semibold">
        Total Geral: {Number(totalValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
      </span>
    </div>
  );
};
