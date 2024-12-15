import { safeSessionStorageGetItem, sessionNameKeys } from "@/lib/utils";
import { FormDataPersonal } from "./steps/PersonalData";

export function PersonalReview() {
  const personalData = safeSessionStorageGetItem<FormDataPersonal>(sessionNameKeys[0]);
  return (
    <div>

      <h2 className="bg-zinc-700 text-white text-center tracking-[2px] font-bold border-[1px] rounded-lg" >Cliente</h2>

      <div className=" my-1 flex flex-col gap-1">

        <div className="flex gap-2" >
          <p className="font-bold"> Nome: </p>
          <p> {personalData?.name} </p>
        </div>

        <div className="flex gap-2" >
          <p className="font-bold"> Telefone: </p>
          <a href={`https://wa.me/55${personalData?.phone}`} > {personalData?.phone} </a>
        </div>

        {personalData?.adress && (
          <div className="flex gap-2" >
            <p className="font-bold"> Rua: </p>
            <p> {personalData?.adress} </p>
          </div>
        )}

        {personalData?.neighborhood && (
          <div className="flex gap-2" >
            <p className="font-bold"> Bairro: </p>
            <p> {personalData?.neighborhood} </p>
          </div>
        )}

        {personalData?.city && (
          <div className="flex gap-2" >
            <p className="font-bold"> Cidade: </p>
            <p> {personalData?.city} </p>
          </div>
        )}
      </div>
    </div>
  );
}
