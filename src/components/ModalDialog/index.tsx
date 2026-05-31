import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/dialog";

interface Iprops {
  title?: string;
  description: string;
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function ModalDialog({
  title,
  description,
  children,
  variant = 'default',
}: Iprops) {


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' variant={variant}>{title}</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto w-[380px] rounded-md sm:max-w-[400px] max-h-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
