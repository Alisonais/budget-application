import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ModalDialog } from "@/components/ModalDialog";
import { SpinnerLoading } from "@/components/Spinner";
import { cn } from "@/utils/utils";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { BasecoatCard } from "./components/BasecoatCard";
import { FormBasecoat } from "./components/FormBasecoat";
import { useBasecoat } from "./hooks/useBasecoat";

export function Basecoats() {

  const {
    basecoats,
    search,
    setSearch,
    handleCreateBasecoat,
    handleDeleteBasecoat,
    handleUpdateBasecoat,
    handleBudgets,
    listBasecoatBy,
    handleRefetchBasecoat,
    isFetching,
    isFetchingSearchBy,
  } = useBasecoat();

  return (
    <AnimatePresence
      mode="popLayout"
    >
      <div
        className="max-w-[900px] m-[0_auto] flex justify-center items-center flex-col gap-4 p-4 pt-20">
        <h1 className="text-4xl text-center font-bold tracking-[2px]">Rinaldo Car</h1>
        <div className=" w-[400px] max-w-[600px] space-y-4">
          <div
            className="flex justify-center gap-2"
          >
            <ModalDialog
              title="Adicionar"
              description="Adicione uma nova cor">
              <FormBasecoat onCreateBasecoat={handleCreateBasecoat} />
            </ModalDialog>
            <Button size={'sm'} onClick={handleBudgets}>Orçamentos</Button>
          </div>
          <div className={cn(
            isFetchingSearchBy
            ? "flex gap-2 items-center cursor-progress"
            : "flex gap-2 items-center"
          )}>
            <Input placeholder="pesquisar ex: prata polaris" value={search} onChange={(e) => setSearch(e.target.value.toUpperCase())} />
            <Button disabled={isFetchingSearchBy} onClick={listBasecoatBy} size={'sm'}> <MagnifyingGlassIcon size={20} color="white" /> </Button>
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={handleRefetchBasecoat} size={'sm'}> {basecoats.length ?? 0} </Button>
          </div>
        </div>

        <div
          className={cn(
            isFetching
              ? "flex flex-col gap-4 animate-pulse"
              : "flex flex-col gap-4"
          )} >
          {basecoats.length === 0 && (
            <div className="h-[300px] flex gap-4 basecoats-center justify-center">
              <SpinnerLoading className="size-10" />
              <h1 className="text-2xl text-center font-bold tracking-[2px] animate-pulse">Carregando...</h1>
            </div>
          )}
          {
            basecoats && basecoats.map((item) => (
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
                <BasecoatCard
                  basecoat={item}
                  onUpdateBasecoat={handleUpdateBasecoat}
                  onDeleteBasecoat={handleDeleteBasecoat}
                />
              </motion.div>
            ))
          }
        </div>
      </div >
    </AnimatePresence>
  )
};
