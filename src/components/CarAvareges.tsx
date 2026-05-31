
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/card";
import { cn } from "@/utils/utils";

interface ICarAvaregesProps {
  quantities: number;
  title: string;
  target: number
}


export function CarAvareges({ quantities, title, target }: ICarAvaregesProps) {

  return (
    <Card className="flex flex-col w-[200px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center p-2">
        <h2 className={cn(
          quantities < target
          ? "text-red-500 text-3xl font-semibold"
            : "text-green-500 text-3xl font-semibold"
        )}>
          {quantities}
        </h2>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p>
          Meta: {
            (quantities / target).toLocaleString('pt-BR', { style: 'percent' })
          }
        </p>
      </CardFooter>
    </Card>
  )
}
