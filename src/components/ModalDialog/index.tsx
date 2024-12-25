import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/dialog";


export function ModalDialog({ title, handle }: { title?: string, handle: () => void }) {


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{title}</Button>
      </DialogTrigger>
      <DialogContent className=" w-[380px] rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja limpar o formulário
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handle} >
              Limpar Formulario
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
