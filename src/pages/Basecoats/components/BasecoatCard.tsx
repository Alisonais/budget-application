import { Button } from "@/components/Button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";
import { ModalDialog } from "@/components/ModalDialog";
import { UseFormReturn } from "react-hook-form";
import { Basecoat } from "../typesOfBasecoats";
import { FormBasecoat, formBasecoatData } from "./FormBasecoat";

interface IBasecoat {
  basecoat: Basecoat;
  onUpdateBasecoat: (form: UseFormReturn<formBasecoatData>) => void;
  onDeleteBasecoat: (basecoatId: string) => void;
}

export function BasecoatCard({ basecoat, onUpdateBasecoat, onDeleteBasecoat }: IBasecoat) {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle>Nome: {basecoat.colorGroup} {basecoat.colorName}</CardTitle>
        </div>
        <div className="flex gap-2 justify-between">
          <CardDescription>fabricante: {basecoat.oem}</CardDescription>
          <CardDescription>Codigo: {basecoat.colorCode}</CardDescription>
        </div>
        <div className="flex gap-2 justify-center font-bold">
          <CardDescription>Quatidade: {basecoat.quantity}ml</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <ModalDialog variant="destructive" title="Deletar" description="Tem certeza que deseja deletar este orçamento">
          <Button onClick={() => onDeleteBasecoat(basecoat.id!!)} variant={'destructive'}>deletar</Button>
        </ModalDialog>
        <ModalDialog
          title="Editar"
          description={'edição da tinta'}
        >
          <FormBasecoat basecoat={{basecoat:{ ...basecoat}}} onUpdateBasecoat={onUpdateBasecoat} />
        </ModalDialog>
      </CardFooter>
    </Card>
  )
}
