import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { FormData } from "@/pages/AllSteps";
import { Basecoat, listBasecoatRequestType } from "@/pages/Basecoats/typesOfBasecoats";
import { BasecoatService } from "@/services/BasecoatService";
import { formatToUppercase } from "@/utils/utils";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { UseFormReturn } from "node_modules/react-hook-form/dist/types/form";
import { useEffect, useRef, useState } from "react";

interface InputSelectProps {
  form: UseFormReturn<FormData>;
}


export function InputColorSelect({ form }: InputSelectProps) {

  const [open, setOpen] = useState(false);
  const [itemsCard, setItemsCard] = useState<Basecoat[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  async function handleGetItem(color: string) {

    if (color.length < 1) {
      return;
    }

    const stringColorGroup = color.split(' ')[0].toUpperCase();
    const stringColorName = color.split(' ')[1]?.toUpperCase() ?? '';

    const res: listBasecoatRequestType = await BasecoatService.searchBy(stringColorGroup, stringColorName ?? '');
    console.log(res.data.basecoats);
    setItemsCard(res.data.basecoats);

    setOpen(true);
  };

  function setItemValue(colorGroup: string, ColorName: string, oem: string) {
    form.setValue('carDataStep.color', `${colorGroup} ${ColorName}`);

    form.setValue('carDataStep.brand', oem);
  }

  // function filterItemSelect(value: string) {
  //   const itemsfiltered = items.filter((item) => {
  //     const nameUpercase = item.client.name.toUpperCase();
  //     const valueUpercase = value.toUpperCase();
  //     return nameUpercase.includes(valueUpercase);
  //   })
  //   setItemsCard(itemsfiltered);
  // }

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
      <div className="flex gap-2">
        <Input {...form.register(`carDataStep.color`, {
          onChange: ((e => (
            form.setValue('carDataStep.color', formatToUppercase(e.target.value))
          )))
        })} />
        <Button variant={'outline'} type="button" onClick={() => (handleGetItem(form.getValues('carDataStep.color')))}>
          <Search />
        </Button>
      </div>
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
                onClick={() => setItemValue(item.colorGroup, item.colorName, item.oem)}
                className="text-lg flex gap-2 justify-between cursor-pointer"
              >
                <p> {`${item.colorGroup} ${item.colorName}`} </p>
                <p>{item.quantity}ml</p>

              </Label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
