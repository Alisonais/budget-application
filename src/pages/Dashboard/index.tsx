import { AverageTicket } from "@/components/AverageTicket";
import { Button } from "@/components/Button";
import { CarAvareges } from "@/components/CarAvareges";
import { ColorChart } from "@/components/ColorChart";
import { MetaChatsBudget } from "@/components/MetaChatsBudget";
import { ValueByHours } from "@/components/ValueByHours";
import { useDasboard } from "./useDasboard";

export function Dashboard() {

  const {
    carCount,
    carsTarget,
    groupByMonth,
    handleListBudgets,
    handleListBasecoats,
    partCount,
    partTarget,
    titleLocaleString,
    valueReduce,
    salesTarget,
    avaregeTargetValuePerHour,
    totalWorkableHours,
    AverageTicketTarget,
    pricePerPiece
  } = useDasboard()


  return (
    <div className="max-w-[900px] m-[0_auto] flex justify-center items-center flex-col gap-4 p-4 pt-20">
      <h1 className="text-4xl text-center font-bold tracking-[2px]">Dashboard</h1>
      <div className="flex gap-2" >
      <Button size={'sm'} onClick={handleListBasecoats}>Tintas</Button>
        <Button size={'sm'} onClick={handleListBudgets}>Orçamentos</Button>
      </div>

      {Object.entries(groupByMonth).map(([chave, items]) => (
        <div key={chave}>
          <h1 className="text-2xl text-center font-semibold tracking-[2px]"> - {titleLocaleString(chave)} - </h1>

          <div className="grid grid-cols-2 grid-rows-5 gap-4">
            <MetaChatsBudget
              sellValue={valueReduce(items)}
              salestarget={salesTarget}
            />

            <ValueByHours
              sellValue={valueReduce(items)}
              avaregeTargetValuePerHour={avaregeTargetValuePerHour}
              totalWorkableHours={totalWorkableHours}
            />

            <AverageTicket
              title="Ticket Médio"
              sellValue={valueReduce(items)}
              itemsLenght={items.length}
              AverageTicketTarget={AverageTicketTarget}
            />

            <AverageTicket
              title="valor por Peça"
              sellValue={valueReduce(items)}
              itemsLenght={partCount(items)}
              AverageTicketTarget={pricePerPiece}
            />

            <CarAvareges
              title="Quantidade de carros"
              quantities={carCount(items)}
              target={carsTarget}
            />

            <CarAvareges
              title="Quantidade de peças"
              quantities={partCount(items)}
              target={partTarget}
            />

            <div className="col-span-2 row-span-2">
              <ColorChart budgets={items} />
            </div>
          </div>

        </div>

      ))}
    </div>
  );
}
