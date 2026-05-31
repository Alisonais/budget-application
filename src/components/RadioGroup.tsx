import { FormData } from "@/pages/AllSteps";
import { formatDate } from "@/utils/utils";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import React, { createContext, useContext } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";
import { Textarea } from "./textarea";
import { type } from "./types/budgetTypes";

interface IRadioGroupContextValue {
  value: string | null,
  setValeu: (selectedValue: string) => void,
  error: boolean,
}
const RadioGroupContext = createContext({} as IRadioGroupContextValue);

interface IRadioGroupProps {
  children: React.ReactNode,
  value: string | null,
  onChangeValue: (value: string) => void,
  error?: boolean,
}
export function RadioGroup({
  children,
  value,
  onChangeValue,
  error = false,
}: IRadioGroupProps) {
  return (
    <RadioGroupContext.Provider
      value={{
        value,
        setValeu: onChangeValue,
        error,
      }}
    >
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </RadioGroupContext.Provider >
  )
}

interface IRadioGroupContainerProps {
  label: string,
  children: React.ReactNode,
}
export function RadioGroupContainer({ label, children }: IRadioGroupContainerProps) {
  return (
    <>
      <Label>{label}</Label>
      <div className="flex gap-2">
        {children}
      </div>
    </>
  )
}

interface IRadioGroupItemProps {
  children: React.ReactNode,
  value: string
}
export function RadioGroupItem({ children, value }: IRadioGroupItemProps) {

  const { value: selectedvalue, setValeu } = useContext(RadioGroupContext);
  const isSelected = value === selectedvalue;

  return (
    <Button onClick={() => setValeu(value)} type="button" variant={isSelected ? 'default' : 'outline'}>
      {children}
    </Button>
  )
}

interface IRadioGroupLabelNumberProps{
  type: React.HTMLInputTypeAttribute,
  label: string,
  value: number | undefined,
  setValue: (value: number) => void,
}
export function RadioGroupLabelNumber({ type, label, value, setValue }: IRadioGroupLabelNumberProps) {

  return (
    <div>
      <Label htmlFor='RadioGroupLabel'>{label}</Label>
      <Input value={value} onChange={(e) => setValue(Number(e.target.value))} type={type} />
    </div>
  )
}
interface IRadioGroupLabelStringProps{
  type: React.HTMLInputTypeAttribute,
  label: string,
  value: string | undefined,
  setValue: (value: string) => void,
}
export function RadioGroupLabelString({ type, label, value, setValue }: IRadioGroupLabelStringProps) {

  return (
    <div>
      <Label htmlFor='RadioGroupLabel'>{label}</Label>
      <Input value={value} onChange={(e) => setValue(e.target.value)} type={type} />
    </div>
  )
}

interface IRadioButtonIcon {
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  item: UseFieldArrayReturn<FormData>
  index: number;
}
export function RadioButtonIcon({ variant, item, index }: IRadioButtonIcon) {
  return (
    <Button
      className="shadow-xl"
      variant={variant} type="button"
      onClick={() => item.remove(index)}
    >
      <TrashIcon className="size-4" />
    </Button>
  )
}

interface IRadioAddItem {
  label: string;
  item: UseFieldArrayReturn<FormData>;
  form: UseFormReturn<FormData>;
}
export function RadioAddItem({ label, item, form }: IRadioAddItem) {
  const rateFactor = 2;
  const laborValue = form.getValues('subTotalData.laborPrice') / rateFactor;

  return (
    <div className="flex gap-2 justify-end">
      <Button
        className="border-dashed"
        type="button"
        size="sm"
        variant="outline"
        onClick={() => item.append({
          type: type.PIX,
          budgetId: '',
          value: laborValue,
          createdAt: formatDate({dateInUnix: new Date().getTime()}),
        })}
      >
        <PlusCircledIcon className="size-4 mr-1" />
        {label}
      </Button>
    </div>
  )
}

interface ICompositionTextAreaProps {
  label: string,
  value: string,
  setValue: (value: string) => void,
}
export function CompositionTextArea({ label, value, setValue }: ICompositionTextAreaProps) {

  return (
    <div>
      <Label htmlFor='RadioGroupLabel'>{label}</Label>
      <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}
