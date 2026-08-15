import { objBasecoat } from "@/pages/Basecoats/typesOfBasecoats";
import { BasecoatService } from "@/services/BasecoatService";
import { useMutation } from "@tanstack/react-query";

interface IUseMutationSaveBasecoat {
  basecoatObj: objBasecoat;
}

export function useMutationSaveBasecoat() {
  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: async ({basecoatObj}: IUseMutationSaveBasecoat) => {
      return await BasecoatService.createBasecoat(basecoatObj) ;
    },
  });
  return {
    mutateAsync,
    data,
    isPending,
  };
};
