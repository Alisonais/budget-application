import { msg } from '@/lib/msgwhatsapp';
import { safeSessionStorageGetItem, sessionNameKeys } from '@/lib/utils';
import html2pdf from 'html2pdf.js';
import { useEffect, useRef } from 'react';
import { Button } from "../Button";
import { CarReview } from "../CarReview";
import { PaymentReview } from "../PaymentReview";
import { PersonalReview } from "../PersonalReview";
import { RepairReview } from "../RepairReview";
import { FormDataPersonal } from './PersonalData';
const personalData = safeSessionStorageGetItem<FormDataPersonal>(sessionNameKeys[0]);

export function Review() {
  let pdfWidth: number | null = null;
  let pdfHeight: number | null = null;

  const divRef = useRef<any>(null);

  async function handleSendMsgPdf() {
    var element = document.getElementById('element-to-print');
    html2pdf(element, {
      margin: [0, 10, 0, 10],
      Scale: 1,
      jsPDF: {
        format: [pdfWidth, pdfHeight],
        unit: 'px',
        hotfixes: ["px_scaling"]
      }
    });
  };

  function sendmsgWhatsapp(){
    const msgbegning = msg;
    const msgfnish = `https://wa.me/55${personalData?.phone}?text=${encodeURI(msgbegning)}`;
    window.location.href = msgfnish;
    console.log(msgfnish);
  }

  useEffect(() => {
    pdfWidth = divRef.current?.offsetWidth;
    pdfHeight = divRef.current?.offsetHeight;

    console.log(divRef, pdfHeight, pdfWidth)
  }, [divRef])

  return (
    <div ref={divRef} id='element-to-print' className="mb-4">
      <div className="m-2">
        <h1 className="text-center font-bold text-5xl tracking-[8px]" ><a href='https://www.rinaldocar.com.br'>RinaldoCar</a></h1>
        <h2 className="text-center text-xl tracking-[3px]" >Funilaria e Pintura</h2>
        <h3 className="text-center text-base" ><a href={`https://wa.me/5512988399883`} >Telefone: (12) 988399883</a></h3>
        <h3 className="text-center text-base" ><a href="https://www.google.com/maps/place/RINALDO+CAR+Funilaria+e+pintura/@-23.1752022,-45.7920539,20.5z/data=!4m6!3m5!1s0x94cc4c54f3e59481:0x4910313a6ad4ec21!8m2!3d-23.1751189!4d-45.7920526!16s%2Fg%2F1q67h8lp9?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D">Endereço: Rua Joaquin Caetano de Jesus nº 322 - Santa Ines 1 - São José dos Campos</a></h3>
      </div>

      <PersonalReview />
      <CarReview />
      <RepairReview />
      <PaymentReview />

      <div className='flex flex-row justify-around'>
      <Button className="mt-8" onClick={handleSendMsgPdf} data-html2canvas-ignore >
        PDF
      </Button>

      <Button className="mt-8" onClick={sendmsgWhatsapp} data-html2canvas-ignore >
        whatsapp
      </Button>
      </div>

    </div>
  );
}
