
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/card";
import { cn } from "@/utils/utils";

interface IValueByHoursProps {
  sellValue: number;
  totalWorkableHours: number;
  avaregeTargetValuePerHour: number
}


export function ValueByHours({ sellValue, avaregeTargetValuePerHour, totalWorkableHours }: IValueByHoursProps) {

  const avaregehourlyRate = sellValue / totalWorkableHours



  return (
    <Card className="flex flex-col w-[200px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Valor médio por hora</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center p-2">
        <h2 className={cn(
          avaregehourlyRate < avaregeTargetValuePerHour
          ? "text-red-500 text-3xl font-semibold"
          : "text-green-500 text-3xl font-semibold"
        )}>
          {avaregehourlyRate.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </h2>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p>
          Meta: {
            (avaregehourlyRate / avaregeTargetValuePerHour  ).toLocaleString('pt-BR', {style: 'percent'})
          }
        </p>
      </CardFooter>
    </Card>
  )
}
