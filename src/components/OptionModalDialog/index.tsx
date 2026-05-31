import { Button } from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/dialog";

interface Iprops {
  title?: string;
  handleClear: () => void;
  handleLeave: () => void;
  handleSaveBudget: () => void;
  handleUpdateBudget: () => void;
  description: string;
  buttonLabelClear: string;
  buttonLabelLeave: string;
  buttonLabelSaveBudget: string;
  buttonLabelUpdateBudget: string;
  id: string | null;
  handleOpenModal: boolean;
}


export function OptionModalDialog({
  title,
  handleClear,
  handleLeave,
  description,
  buttonLabelClear,
  buttonLabelLeave,
  buttonLabelSaveBudget,
  handleSaveBudget,
  handleUpdateBudget,
  buttonLabelUpdateBudget,
  id,
  handleOpenModal,
}: Iprops) {


  return (
    <Dialog open={handleOpenModal} defaultOpen={handleOpenModal}>
      <DialogTrigger asChild>
        <Button variant="default">{title}</Button>
      </DialogTrigger>
      <DialogContent className=" w-[380px] rounded-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleLeave} >
              {buttonLabelLeave}
            </Button>
          </DialogClose>
          <Button onClick={handleClear} >
            {buttonLabelClear}
          </Button>
          {
            id && (
              <Button onClick={handleUpdateBudget} >
                {buttonLabelUpdateBudget}
              </Button>
            )
          }
          <Button onClick={handleSaveBudget} >
            {buttonLabelSaveBudget}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
