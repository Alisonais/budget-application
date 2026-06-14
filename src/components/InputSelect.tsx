
import { FormData } from "@/pages/AllSteps";
import { formatName } from "@/utils/formatName";
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from 'react-hook-form';
import { Input } from "./Input";
import { Label } from "./Label";
import { listBudgetItem } from "./types/budgetTypes";

interface InputSelectProps {
  items: listBudgetItem[];
  form: UseFormReturn<FormData>;
}

export function InputSelect({ items, form }: InputSelectProps) {

  const [open, setOpen] = useState(false);
  const [itemsCard, setItemsCard] = useState(items);
  const ref = useRef<HTMLDivElement>(null);

  function handleGetItem(item: listBudgetItem) {
    setOpen(false);
    form.reset({
      "personalDataStep": item.client,
      "carDataStep": item.car,
      "status": 'PENDENTE',
      "paymentDataStep": {
        "laborpayment": [],
        "partpayment": ''
      },
      'createdAt': new Date(),
    })
  };

  function filterItemSelect(value: string) {
    const itemsfiltered = items.filter((item) => {
      const nameUpercase = item.client.name.toUpperCase();
      const valueUpercase = value.toUpperCase();
      return nameUpercase.includes(valueUpercase);
    })
    setItemsCard(itemsfiltered);
  }

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickFora);
    return () => {
      document.removeEventListener('mousedown', handleClickFora);
    };
  }, [ref]);

  return (
    <div ref={ref}>
      <Input onFocus={() => setOpen(true)} {...form.register(`personalDataStep.name`, {
        onChange: ((value => (
          filterItemSelect(value.target.value),
          value.target.value = formatName(value.target.value)
        )))
      })} />
      <AnimatePresence initial={false}>
        {(open && itemsCard.length > 0) && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key="box"
            className=" bg-white p-4 shadow-xl border rounded-xl border-solid border-black absolute flex flex-col mt-2 max-h-[200px] inset-shadow-indigo-500 overflow-auto"
          >
            {itemsCard.map((item) => (
              <Label
                key={item.id}
                onClick={() => handleGetItem(item)}
                className="text-lg flex gap-2 justify-between cursor-pointer"
              >
                <p> {item.client.name} </p>
                <p> Tel: {item.client.phone.slice(-4).padStart(6, '*')} </p>

              </Label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
