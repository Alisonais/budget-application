import { BasecoatService } from "@/services/BasecoatService";
import { useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { formBasecoatData } from "../components/FormBasecoat";
import { Basecoat, listBasecoatRequestType, objBasecoat } from "../typesOfBasecoats";

export function useBasecoat() {
  const [basecoats, setBasecoats] = useState<Basecoat[]>([]);

  const loadBasecoats = useCallback(async () => {
    try {
      const data: listBasecoatRequestType = await BasecoatService.getBasecoats();
      const dataBasecoats = data.data.basecoats;
      setBasecoats(dataBasecoats);
      toast.success('tintas listadas com sucesso');
    } catch (err) {
      toast.error('Algo deu errado ao listar as tintas')
    }
  }, []);

  useEffect(() => {
    loadBasecoats()
  }, []);

  async function handleCreateBasecoat({ getValues }: UseFormReturn<formBasecoatData>) {
    try {
      const dataRaw = getValues();
      const newBasecoat: objBasecoat = {
        basecoat: {
          ...dataRaw,
          quantity: Number(dataRaw.quantity),
        }
      };

      await BasecoatService.createBasecoat(newBasecoat);
      toast.success('tinta adicionada com sucesso');
      loadBasecoats();
    } catch {
      toast.error('Algo deu errado ao adicionar a tinta');
    }
  }

  async function handleUpdateBasecoat({ getValues }: UseFormReturn<formBasecoatData>) {
    try {
      const dataRaw = getValues();
      if (!dataRaw.id) {
        return toast.error('Não foi possivel atualizar a tinta');
      };

      const newBasecoat: Basecoat = {
        ...dataRaw,
        quantity: Number(dataRaw.quantity),
      };

      await BasecoatService.updateBasecoat(dataRaw.id, newBasecoat);
      toast.success('tinta atualizada com sucesso');
      loadBasecoats();
    } catch {
      toast.error('Algo deu errado ao atualizar a tinta');
    }
  }

  async function handleDeleteBasecoat(basecoatId: string) {
    try {
      await BasecoatService.deleteBasecoat(basecoatId);
      toast.success('tinta deletada com sucesso');
      loadBasecoats();
    } catch {
      toast.error('Algo deu errado ao deletar a tinta');
    }
  }

  return {
    basecoats,
    handleCreateBasecoat,
    handleUpdateBasecoat,
    handleDeleteBasecoat,
  }
}
