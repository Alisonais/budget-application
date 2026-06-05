import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { basecoatInitialValues, objBasecoat } from "../typesOfBasecoats";

interface IFormBasecoat {
  basecoat?: objBasecoat,
  onCreateBasecoat?: (form: UseFormReturn<formBasecoatData>) => void,
  onUpdateBasecoat?: (form: UseFormReturn<formBasecoatData>) => void,
}

const schema = z.object({
  id: z.string().optional(),
  colorGroup: z.string(),
  colorName: z.string(),
  oem: z.string(),
  quantity: z.number(),
  colorCode: z.string().optional(),
});

export type formBasecoatData = z.infer<typeof schema>;

export function FormBasecoat({ basecoat, onCreateBasecoat, onUpdateBasecoat }: IFormBasecoat) {

  const basecoatForm = useForm<formBasecoatData>({
    resolver: zodResolver(schema),
    defaultValues: basecoatInitialValues(basecoat ? basecoat : {})
  })

  return (
    <FormProvider {...basecoatForm}>
      <div className="space-y-2">

        <div className="space-y-1" >
          <Label htmlFor="group" >
            Grupo de cor:
          </Label>
          <Input id="group" type="text" placeholder="Adicione o grupo de cor da tinta" {...basecoatForm.register('colorGroup')}
          />
          {basecoatForm.formState.errors.colorGroup && (
            <small className="text-destructive" >
              {basecoatForm.formState.errors.colorGroup.message}
            </small>
          )}
        </div>

        <div className="space-y-1" >
          <Label htmlFor="color" >
            Nome da cor:
          </Label>
          <Input id="color" type="text" placeholder="Adicione o nome da tinta" {...basecoatForm.register('colorName')}
          />
          {basecoatForm.formState.errors.colorName && (
            <small className="text-destructive" >
              {basecoatForm.formState.errors.colorName.message}
            </small>
          )}
        </div>

        <div className="space-y-1" >
          <Label htmlFor="oem" >
            Fabricante:
          </Label>
          <Input id="oem" type="text" placeholder="Adicione o fabricante da tinta" {...basecoatForm.register('oem')}
          />
          {basecoatForm.formState.errors.oem && (
            <small className="text-destructive" >
              {basecoatForm.formState.errors.oem.message}
            </small>
          )}
        </div>

        <div className="space-y-1" >
          <Label htmlFor="code" >
            Codigo da cor:
          </Label>
          <Input id="code" type="text" placeholder="Adicione o codigo da tinta" {...basecoatForm.register('colorCode')}
          />
          {basecoatForm.formState.errors.colorCode && (
            <small className="text-destructive" >
              {basecoatForm.formState.errors.colorCode.message}
            </small>
          )}
        </div>

        <div className="space-y-1" >
          <Label htmlFor="quantity" >
            Quantidade em ml:
          </Label>
          <Input id="quantity" type="number" placeholder="Adicione a quantidade da tinta" {...basecoatForm.register('quantity')}
          />
          {basecoatForm.formState.errors.quantity && (
            <small className="text-destructive" >
              {basecoatForm.formState.errors.quantity.message}
            </small>
          )}
        </div>

        <div className="flex justify-end">
          {onCreateBasecoat && (
            <DialogClose>
              <Button onClick={() => onCreateBasecoat(basecoatForm)}>Adicionar</Button>
            </DialogClose>
          )}
          {onUpdateBasecoat && (
            <DialogClose>
              <Button onClick={() => onUpdateBasecoat(basecoatForm)}>Atualizar</Button>
            </DialogClose>
          )}
        </div>
      </div>
    </FormProvider >
  )
};
