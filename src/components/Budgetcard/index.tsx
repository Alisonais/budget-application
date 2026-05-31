import { formateDateToMounth } from "@/utils/utils";
import { WhatsappLogo } from "@phosphor-icons/react";
import { Button } from "../Button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { ModalCardBudget } from "../ModalCardBudget";
import { ModalDialog } from "../ModalDialog";
import { listBudgetItem } from "../types/budgetTypes";
interface IProps {
  data: listBudgetItem
  onDeleteBudget: (data: listBudgetItem) => void;
}

export function Budgetcard({ data, onDeleteBudget }: IProps) {


  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardDescription>{formateDateToMounth(data.date)}
        </CardDescription>
        <div className="flex flex-row justify-between items-center">
          <CardTitle>Nome: {data.client.name}</CardTitle>
          <a href={`https://wa.me/${data.client.phone}`}><CardDescription><WhatsappLogo size={32} color="green" /></CardDescription></a>
        </div>
        <div className="flex gap-2 justify-between">
          <CardDescription>Carro: {data.car.model}</CardDescription>
          <CardDescription>Cor: {data.car.color}</CardDescription>
        </div>
        <div className="flex gap-2 justify-center font-bold">
          <CardDescription>Total: {data.value.totalValue.
            toLocaleString('pt-br', { style: "currency", currency: 'BRL' })}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <ModalDialog variant="destructive" title="Deletar" description="Tem certeza que deseja deletar este orçamento">
          <Button onClick={() => onDeleteBudget(data)} variant={'destructive'}>deletar</Button>
        </ModalDialog>
        {data.status === 'APROVADO'
          ? <span className="px-4 py-1 rounded-md text-white bg-green-500">{data.status}</span>
          : <span className="px-4 py-1 rounded-md text-white bg-zinc-500/50">{data.status}</span>
        }
        {/* <Button onClick={() => formpage(data.id)} >Editar</Button> */}
        <ModalDialog
          title="Visualizar"
          description={data.status}
        >
          <ModalCardBudget cardBudgetId={data.id} />
        </ModalDialog>
      </CardFooter>

    </Card>
  );
};
