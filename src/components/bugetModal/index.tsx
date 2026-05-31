import { Button } from "@/components/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/dialog";
import { FormData } from "@/pages/AllSteps";
import { carPartItems, itemProps } from "@/utils/carPartItems";
import { useState } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

interface Iprops {
  title?: string;
  description: string;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link',
  form: UseFieldArrayReturn<FormData>;
  type: 'part' | 'labor';
}

export function BudgetModal({
  title,
  description,
  variant,
  form,
  type,
}: Iprops) {

  const [disabledItem, setDisabledItem] = useState(new Set());

  function appendCarPartItem(item: itemProps) {
    setDisabledItem(prev => {
      const newSet = new Set(prev);
      newSet.has(item.id)
        ? newSet.delete(item.id)
        : (
          newSet.add(item.id),
          type === 'labor' ? (
            form.append({
            carPart: item.label,
            price: item.price,
          })
          )
          : (
            form.append({
            carPartChange: item.label,
            priceChange: null,
          })
          )

        );
      return newSet
    });

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' variant={variant}>{title}</Button>
      </DialogTrigger>
      <DialogContent className=" w-[380px] rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
          {
            carPartItems.map((item) => (
              <Button key={item.id} size='sm' variant={disabledItem.has(item.id) ? 'outline' : 'default'} onClick={() => appendCarPartItem(item)}>{item.label}</Button>
            ))
          }
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
