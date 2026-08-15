import { useMutationSaveBasecoat } from "@/hooks/useMutationSaveBasecoat";
import { useQueryListBasecoat } from "@/hooks/useQueryListBasecoat";
import { useQuerySearchBasecoatBy } from "@/hooks/useQuerySearchBasecoatBy";
import { BasecoatService } from "@/services/BasecoatService";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { formBasecoatData } from "../components/FormBasecoat";
import { Basecoat, objBasecoat } from "../typesOfBasecoats";

export function useBasecoat() {
  const [basecoats, setBasecoats] = useState<Basecoat[]>([]);
  const [searchBy, setSearchBy] = useState({ colorGroup: '', colorName: '' });
  const [search, setSearch] = useState('');

  const { data, isFetching, refetch } = useQueryListBasecoat({ state: setBasecoats });
  const { refetch: fetch, isFetching: isFetchingSearchBy } = useQuerySearchBasecoatBy({ state: setBasecoats, colorGroup: searchBy.colorGroup, colorName: searchBy.colorName });

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutationSaveBasecoat();

  // const loadBasecoats = useCallback(async () => {
  //   try {
  //     const data: arrayListBasecoat = await BasecoatService.getBasecoats();
  //     const dataBasecoats = data.basecoats;
  //     setBasecoats(dataBasecoats);
  //     toast.success('tintas listadas com sucesso');
  //   } catch (err) {
  //     toast.error('Algo deu errado ao listar as tintas');
  //   }
  // }, []);

  useEffect(() => {
    setBasecoats(data?.basecoats ?? [])
  }, [data]);

  async function handleCreateBasecoat({ getValues }: UseFormReturn<formBasecoatData>) {
    // try {
    const dataRaw = getValues();
    const newBasecoat: objBasecoat = {
      basecoat: {
        ...dataRaw,
        colorGroup: dataRaw.colorGroup.toLocaleUpperCase(),
        colorName: dataRaw.colorName.toLocaleUpperCase(),
        quantity: Number(dataRaw.quantity),
      }
    };

    await mutateAsync({ basecoatObj: newBasecoat });
    await refetch();
  };

  async function handleUpdateBasecoat({ getValues }: UseFormReturn<formBasecoatData>) {
    const dataRaw = getValues();
    if (!dataRaw.id) {
      return toast.error('Não foi possivel atualizar a tinta');
    };

    const newBasecoat: Basecoat = {
      ...dataRaw,
      colorGroup: dataRaw.colorGroup.toLocaleUpperCase(),
      colorName: dataRaw.colorName.toLocaleUpperCase(),
      quantity: Number(dataRaw.quantity),
    };

    await BasecoatService.updateBasecoat(dataRaw.id, newBasecoat);
    await refetch();
  };

  async function handleDeleteBasecoat(basecoatId: string) {
    await BasecoatService.deleteBasecoat(basecoatId);
    await refetch();
  };

  function handleBudgets() {
    navigate('budgets');
  };

  function listBasecoatBy() {
    if (!search) {
      return refetch();
    }

    const colorGroup = search.split(' ')[0];
    const colorName = search.split(' ')[1] ?? '';
    setSearchBy({ colorGroup, colorName });
  }

  useEffect(() => {
    if (searchBy.colorGroup.length > 1) {
      fetch();
    }
  }, [searchBy]);

  function handleRefetchBasecoat() {
    setSearch('');
    refetch();
  }

  return {
    basecoats,
    search,
    setSearch,
    handleCreateBasecoat,
    handleUpdateBasecoat,
    handleDeleteBasecoat,
    handleBudgets,
    listBasecoatBy,
    handleRefetchBasecoat,
    isFetching,
    isFetchingSearchBy,
  }
}
