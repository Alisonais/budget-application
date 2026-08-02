import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Loader } from "@/components/Loader";
import { useQuerySearchBasecoatBy } from "@/hooks/useQuerySearchBasecoatBy";
import { FormData } from "@/pages/AllSteps";
import { Basecoat } from "@/pages/Basecoats/typesOfBasecoats";
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
  const [searchBy, setSearchBy] = useState({ colorGroup: '', colorName: '' });
  const ref = useRef<HTMLDivElement>(null);

  const { refetch, isFetching } = useQuerySearchBasecoatBy({ state: setItemsCard, colorGroup: searchBy.colorGroup, colorName: searchBy.colorName });



  function setItemValue(colorGroup: string, ColorName: string, oem: string) {
    form.setValue('carDataStep.color', `${colorGroup} ${ColorName}`);

    form.setValue('carDataStep.brand', oem);
  };

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

  function listBasecoatBy(color: string) {
    if (!color) {
      return;
    }

    const colorGroup = color.split(' ')[0];
    const colorName = color.split(' ')[1] ?? '';
    setSearchBy({ colorGroup, colorName });
  }

  useEffect(() => {
    if (searchBy.colorGroup.length > 1) {
      refetch();
      setOpen(true);
    }
  }, [searchBy]);

  return (
    <div ref={ref}>
      <div className="flex gap-2">
        <Input {...form.register(`carDataStep.color`, {
          onChange: ((e => (
            form.setValue('carDataStep.color', formatToUppercase(e.target.value))
          )))
        })} />
        <Button variant={'outline'} type="button" onClick={() => (listBasecoatBy(form.getValues('carDataStep.color')))}>
          {isFetching
            ? <Loader color='text-black'/>
            : <Search />
          }
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
