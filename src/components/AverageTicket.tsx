
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/card";
import { cn } from "@/utils/utils";

interface IAverageTicketProps {
  title: string;
  itemsLenght: number;
  sellValue: number;
  AverageTicketTarget: number;
}


export function AverageTicket({ title, sellValue, itemsLenght, AverageTicketTarget }: IAverageTicketProps) {

  const avaregehourlyRate = sellValue ? sellValue / itemsLenght : 0;

  return (
    <Card className="flex flex-col w-[200px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center p-2">
        <h2 className={cn(
          avaregehourlyRate < AverageTicketTarget
          ? "text-red-500 text-3xl font-semibold"
          : "text-green-500 text-3xl font-semibold"
        )}>
          {avaregehourlyRate.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </h2>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p>
          Meta: {
            (avaregehourlyRate / AverageTicketTarget  ).toLocaleString('pt-BR', {style: 'percent'})
          }
        </p>
      </CardFooter>
    </Card>
  )
}
