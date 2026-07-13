import { Budgetcard } from "@/components/Budgetcard";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SpinnerLoading } from "@/components/Spinner";
import { Switch } from "@/components/switch";
import { ChartLineUp, MagnifyingGlass, NotePencil } from "@phosphor-icons/react";
import { AnimatePresence } from "motion/react";
import * as motion from 'motion/react-client';
import { useListBudgets } from "./useListBudgets";

export function ListBudget() {

  const {
    items,
    isLoading,
    isPending,
    serchValue,
    setSerchValue,
    searchByName,
    setSearchByName,
    searchByCar,
    setSearchByCar,
    handleNewBudget,
    handleDasboard,
    handledeleteBudget,
    listBudgetBy,
    handleBudgetsPending,
    handleBudgetsAproved,
    handleAllBudgets,
  } = useListBudgets();

  return (
    <AnimatePresence
      mode="popLayout"
    >
      <div
        className="max-w-[900px] m-[0_auto] flex justify-center items-center flex-col gap-4 p-4 pt-20">
        <h1 className="text-4xl text-center font-bold tracking-[2px]">Rinaldo Car</h1>
        <div className=" w-[400px] max-w-[600px] space-y-4">
          <div className="flex gap-2 items-center">
            <Input placeholder="Pesquisar orçamentos" value={serchValue} onChange={(e) => setSerchValue(e.target.value)} />
            <MagnifyingGlass size={35} color="white" className="bg-zinc-900 p-1 rounded-md" onClick={listBudgetBy} />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 text-xs">
              <Switch checked={searchByName} onCheckedChange={() => searchByCar ? (setSearchByName(!searchByName), setSearchByCar(false)) : setSearchByName(!searchByName)} id="searchByName" />
              <label htmlFor="searchByName">Pesquisar por nome</label>
            </div>
            <div className="flex gap-2 text-xs">
              <Switch checked={searchByCar} onCheckedChange={() => searchByName ? (setSearchByCar(!searchByCar), setSearchByName(false)) : setSearchByCar(!searchByCar)} id="searchByCarModel" />
              <label htmlFor="searchByCarModel">Pesquisar por modelo</label>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <Button size={'sm'} onClick={handleAllBudgets}>{items?.length}</Button>
            <Button size={'sm'} onClick={handleBudgetsPending}>Pendente</Button>
            <Button size={'sm'} onClick={handleBudgetsAproved}>Aprovado</Button>
            <Button size={'sm'} onClick={handleDasboard}><ChartLineUp size={16} /></Button>
            <Button size={'sm'} onClick={handleNewBudget}><NotePencil size={16} /></Button>

          </div>
        </div>

        <div
          className="flex flex-col gap-4" >

          {isLoading && (
            <div className="h-[300px] flex gap-4 items-center justify-center relative">
              <SpinnerLoading className="size-10" />
              <h1 className="text-2xl text-center font-bold tracking-[2px] animate-pulse">Carregando...</h1>
            </div>
          )}
          {!items && (
            <div className="h-[300px] flex gap-4 items-center justify-center">
              <h1 className="text-xl text-center font-bold tracking-[2px]">Não Há orçamentos para exibir 😕</h1>
            </div>
          )}
          {
            items && items?.map((item) => (
              <motion.div
                initial={{
                  opacity: 0,
                  x: 50,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: 50,
                }}
                transition={{
                  duration: 0.3,
                  type: 'spring',
                  bounce: 0.1
                }}
                key={item.id}
                layout
              >
                <Budgetcard key={item.id} data={item} onDeleteBudget={handledeleteBudget} />
              </motion.div>
            ))
          }
        </div>
      </div >
    </AnimatePresence>
  );
}
