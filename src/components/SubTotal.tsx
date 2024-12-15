import { safeSessionStorageGetItem } from "@/lib/utils";
import { useEffect, useState } from "react";

interface IlaborCost {
  laborCost?: { carPart: string, price: null | number }[],
  partCost?: { carPartChange: string, priceChange: null | number }[]
}

export type FormDataPrice = {
  laborPrice: number,
  partPrice: number
};

export function SubTotal({ laborCost, partCost }: IlaborCost) {
  const initialvalue = safeSessionStorageGetItem<FormDataPrice>('sub-total');

  let sun: any = { price: 0 };
  const [laborPrice, setLaborPrice] = useState(initialvalue?.laborPrice ?? 0);

  let sunPart: any = { priceChange: 0 };
  const [partPrice, setPartPrice] = useState( initialvalue?.partPrice ?? 0);

  let totalValue = Number(laborPrice) + Number(partPrice);


  useEffect(()=>{
    if(laborCost) {
      if (laborCost?.length > 0) {
        sun = laborCost.reduce((a, c) => {
          return { carPart: 'total', price: Number(a.price) + Number(c.price) }
        });
        setLaborPrice(sun.price === null ? 0 : sun.price);
      };
      if (laborCost?.length === 0) {
        setLaborPrice(0);
      };
    }

    if(partCost){
      if (partCost?.length > 0) {
        sunPart = partCost.reduce((a, c) => {
          return { carPartChange: 'total', priceChange: Number(a.priceChange) + Number(c.priceChange) }
        });
        setPartPrice(sunPart.priceChange === null ? 0 : sunPart.priceChange);
      };
      if (partCost?.length === 0) {
        setPartPrice(0);
      };
    }


  },[laborCost, partCost]);

  useEffect(()=> {
    const data = {
      laborPrice: laborPrice,
      partPrice: partPrice
    }
    sessionStorage.setItem('sub-total' ,JSON.stringify(data));
  },[laborPrice, partPrice ])


  return (
    <div className="text-xl tracking-tighter mt-10 flex flex-col">
      <span>
        Total Mão de Obra: {laborPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
      </span>
      <span>
        Total Peças: {partPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
      </span>
      <span className="font-semibold">
        Total Geral: {totalValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
      </span>
    </div>
  );
}
