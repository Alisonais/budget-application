import { useToast } from "@/hooks/useToast";
import { FormData } from "@/pages/AllSteps";
import { BudgetService } from "@/services/BudgetService";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { ModalDialog } from "../ModalDialog";
import { OptionModalDialog } from "../OptionModalDialog";
import { clearForm, deslogar, handleSendMsgPdf } from "../steps/Review/utils";

interface IProps {
  form: UseFormReturn<FormData>;
  pdfWidth: any;
  pdfHeight: any;
}

export function FooterButton({ form, pdfWidth, pdfHeight }: IProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  function handleSaveBudget() {
    const budget = form.getValues();
    const novoBudget = { budget };
    const promise = async () => {
      const res = await BudgetService.createBudget(novoBudget);
      const id = res.data.id;
      form.setValue('id', id);
      return res;
    };

    useToast(promise, 'Orçamento salvo com sucesso 😎.', 'Erro ao salvar orçamento 😒');
  }

  function handleUpdateBudget() {
    const bugetId = form.getValues('id');

    !form.getValues('createdAt') && form.setValue('createdAt', new Date());
    const data = form.getValues();

    const promise = async () => await BudgetService.updateBudget(bugetId, data);
    setModalOpen(true);

    useToast(promise, 'Orçamento atualizado com sucesso 😎.', 'Erro ao atualizar orçamento 😒');
  }

  function handleHome() {
    localStorage.removeItem('formValues');
    navigate('/budgets');
  };

  async function loadingToPdf() {
    const promise = async () => await handleSendMsgPdf(form, pdfWidth, pdfHeight);
    useToast(promise, 'PDF criado com sucesso 😎.', 'Erro ao crair PDF 😒');
  }

  const statusValue = form.watch('status');

  return (
    <div className='flex flex-row justify-around' data-html2canvas-ignore >

      <div className="mt-8" onClick={() => setModalOpen(!modalOpen)} >
        <OptionModalDialog
          title='Opções'
          description='Escolha a opção desejada'
          buttonLabelClear='Limpar Formulario'
          handleClear={() => clearForm(form)}
          buttonLabelLeave='Deslogar'
          handleLeave={deslogar}
          buttonLabelSaveBudget='Salvar Orçamento'
          handleSaveBudget={handleSaveBudget}
          buttonLabelUpdateBudget='Atualizar Orçamento'
          handleUpdateBudget={handleUpdateBudget}
          id={form.getValues('id') || null}
          handleOpenModal={modalOpen}
        />
      </div>

      <Button
        type='button'
        className="mt-8"
        onClick={() => loadingToPdf()}>
        PDF
      </Button>

      <Button type='button' className="mt-8" onClick={() => form.setValue('status',
        form.getValues('status') === 'APROVADO'
          ? 'PENDENTE'
          : 'APROVADO'
      )} >
        {statusValue}
      </Button>

      <div className="mt-8">
        <ModalDialog variant="default" title="Home" description="Voltar para listagem de orçamentos">
          <Button type="button" onClick={handleHome}>Listar orçamentos</Button>
        </ModalDialog>
      </div>
    </div>
  );
};
