import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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

interface IMetaChatsBudgetProps {
  sellValue: number;
  salestarget: number
}

const chartConfig = {
  meta: {
    label: "meta",
    color: "blue",
  },
  sells: {
    label: "sells",
    color: "red",
  },
} satisfies ChartConfig

export function MetaChatsBudget({ sellValue, salestarget }: IMetaChatsBudgetProps) {

  const chartData = [{ month: "january", meta: salestarget - sellValue < 0 ? 0 : salestarget - sellValue, sells: sellValue }]
  const totalSales = sellValue / salestarget;

  return (
    <Card className="flex flex-col w-[200px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Meta de faturamento</CardTitle>
      </CardHeader>
      <CardContent className="h-[120px] p-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px] w-full max-w-[250px]"

        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={100}
            className=" z-10"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalSales.toLocaleString('pt-BR', {style:'percent', maximumFractionDigits: 0})}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          meta
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
              <RadialBar
              dataKey="sells"
              stackId="a"
              cornerRadius={5}
              fill="blue"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="meta"
              fill="red"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
