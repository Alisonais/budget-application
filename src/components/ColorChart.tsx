import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/Charts";
import { useEffect, useState } from "react";
import { listBudgetItem } from "./types/budgetTypes";

interface IColorChartProps {
  budgets: listBudgetItem[];
}

const chartConfig = {
  quatity: {
    label: "quatity",
    color: "blue",
  },
} satisfies ChartConfig


export function ColorChart({ budgets }: IColorChartProps) {

  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    const valueChart = budgets.reduce((acc: any, currentCar) => {
      if(currentCar.status === 'APROVADO') {
        const color = currentCar.car.color.split(' ')[0];
      const existingColor = acc.find((item: any) => item?.color === color);
      if (existingColor) {
        existingColor.quantity++;
      } else {
        acc.push({
          color: color,
          quantity: 1,
        });
      }
      return acc;
      }
      return acc;
    }, []);

    setChartData(valueChart);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cores Pintadas</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="color"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent  />}
            />
            <Bar dataKey="quantity" fill="gray" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
