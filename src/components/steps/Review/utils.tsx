import { FormData } from '@/AllSteps';
import { msg } from '@/lib/msgwhatsapp';
import html2pdf from 'html2pdf.js';
import { UseFormReturn } from 'react-hook-form';

export async function handleSendMsgPdf(form:UseFormReturn<FormData>, pdfWidth: number | null, pdfHeight: number | null ) {
  const name = form.getValues('personalDataStep.name');
  const car = form.getValues('carDataStep.model');
  const color = form.getValues('carDataStep.color');
  var element = document.getElementById('element-to-print');
  html2pdf(element, {
    margin: [0, 10, 0, 10],
    filename: `${name}-${car}-${color}.pdf` || 'Orçamento.pdf',
    Scale: 1,
    jsPDF: {
      format: [pdfWidth, pdfHeight],
      unit: 'px',
      hotfixes: ["px_scaling"]
    }
  });
};

export function sendmsgWhatsapp(form:UseFormReturn<FormData>) {
  const msgbegning = msg();
  const msgfnish = `https://wa.me/55${form.getValues('personalDataStep.phone')}?text=${encodeURI(msgbegning)}`;
  window.location.href = msgfnish;
};

export function clearForm(form:UseFormReturn<FormData>){

  console.log(form);
  sessionStorage.removeItem('formValues');
  form.reset();
  window.location.reload();
}

