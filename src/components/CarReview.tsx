import { FormData } from "@/pages/AllSteps";
import { useFormContext } from "react-hook-form";
import { CarDataStep } from "./types/budgetTypes";
type dataCar = {
  data?: CarDataStep
}

export function CarReview({data}: dataCar) {

  const form = useFormContext<FormData>();

  const carData = form ? form.getValues('carDataStep') : data;

  return (
    <div>

      <h2 className="bg-zinc-700 text-white text-center tracking-[2px] font-bold border-[1px] rounded-lg" > Veículo </h2>

      <div className="my-1 flex flex-col gap-1">
        <div className="flex gap-2" >
          <p className="font-bold"> Modelo: </p>
          <p> {carData?.model} </p>
        </div>

        <div className="flex gap-2" >
          <p className="font-bold"> Cor: </p>
          <p> {carData?.color} </p>
        </div>

        <div className="flex gap-2" >
          <p className="font-bold"> Ano: </p>
          <p> {carData?.year} </p>
        </div>


        {carData?.brand && (
          <div className="flex gap-2" >
            <p className="font-bold"> Fabricante: </p>
            <p> {carData?.brand} </p>
          </div>
        )}

        {carData?.plate && (
          <div className="flex gap-2" >
            <p className="font-bold"> Placa: </p>
            <p> {carData?.plate} </p>
          </div>
        )}
      </div>

    </div>
  );
}
