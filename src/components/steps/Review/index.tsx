import { FormData } from '@/AllSteps';
import { Button } from '@/components/Button';
import { CarReview } from '@/components/CarReview';
import { ModalDialog } from '@/components/ModalDialog';
import { PaymentReview } from '@/components/PaymentReview';
import { PersonalReview } from '@/components/PersonalReview';
import { RepairReview } from '@/components/RepairReview';
import { MapPin, WhatsappLogo } from "@phosphor-icons/react";
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { clearForm, handleSendMsgPdf, sendmsgWhatsapp } from './utils';


export function Review() {
  let pdfWidth: number | null = null;
  let pdfHeight: number | null = null;

  const form = useFormContext<FormData>();

  const divRef = useRef<any>(null);

  useEffect(() => {
    sessionStorage.setItem('formValues', JSON.stringify(form.getValues()));

    pdfWidth = divRef.current?.offsetWidth;
    pdfHeight = divRef.current?.offsetHeight;

  }, [divRef]);

  return (
    <div>
      <div ref={divRef} id='element-to-print' className="mb-4">
        <div className="flex flex-col gap-2 my-2">
          <h1 className="text-center font-bold text-5xl tracking-[8px]" ><a href='https://www.rinaldocar.com.br'>RinaldoCar</a></h1>
          <h2 className="text-center text-xl tracking-[3px]" >Funilaria e Pintura</h2>
          <div className='w-full flex justify-center gap-4' >
            <h3 className="text-center text-base" ><a href={`https://wa.me/5512988399883`} ><WhatsappLogo size={32} color="#2c8e25" className='inline' />WhatsApp</a></h3>

            <h3 className="text-center text-base" ><a href="https://www.google.com/maps/place/RINALDO+CAR+Funilaria+e+pintura/@-23.1752022,-45.7920539,20.5z/data=!4m6!3m5!1s0x94cc4c54f3e59481:0x4910313a6ad4ec21!8m2!3d-23.1751189!4d-45.7920526!16s%2Fg%2F1q67h8lp9?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"><MapPin size={32} color="#29156f" className='inline' />Nossa Localização</a></h3>
          </div>
        </div>

        <PersonalReview />
        <CarReview />
        <RepairReview />
        <PaymentReview />

        <div className='flex flex-row justify-around' data-html2canvas-ignore >
          <Button
            type='button'
            className="mt-8"
            onClick={() => handleSendMsgPdf(form, pdfWidth, pdfHeight)}>
            PDF
          </Button>

          <div className="mt-8" >
            <ModalDialog
              title='Limpar'
              handle={() => clearForm(form)}

            />
          </div>

          <Button type='button' className="mt-8" onClick={() => sendmsgWhatsapp(form)} >
            WhatsApp
          </Button>
        </div>

      </div>
    </div>
  );
}
