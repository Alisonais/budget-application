
import { storageKeys } from '@/config/storageKeys';
import { FormData } from '@/pages/AllSteps';
import html2pdf from 'html2pdf.js';
import { UseFormReturn } from 'react-hook-form';

export async function handleSendMsgPdf(form:UseFormReturn<FormData>, pdfWidth: number | null, pdfHeight: number | null ): Promise<any> {

  const name = form.getValues('personalDataStep.name').split(' ')[0];
  const car = form.getValues('carDataStep.model');
  const color = form.getValues('carDataStep.color');
  const element = document.getElementById('element-to-print');
  const opt = {
    margin: [0, 10, 0, 10],
    filename: `${name}-${car}-${color}.pdf` || 'Orçamento.pdf',
    Scale: 1,
    jsPDF: {
      format: [pdfWidth, pdfHeight],
      unit: 'px',
      hotfixes: ["px_scaling"]
    }
  };
  await html2pdf().set(opt).from(element).then().save();
};

export function clearForm(form:UseFormReturn<FormData>){

  localStorage.removeItem('formValues');
  form.reset();
  window.location.reload();
}

export function deslogar() {
  localStorage.removeItem(storageKeys.accessToken);
  window.location.reload();
}

