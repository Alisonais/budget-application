import { Basecoat, arrayListBasecoat } from "@/pages/Basecoats/typesOfBasecoats";
import { BasecoatService } from "@/services/BasecoatService";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface IuseQuerySearchBasecoatBy {
  state?: Dispatch<SetStateAction<Basecoat[]>>;
  colorGroup?: string;
  colorName?: string;
}

export function useQuerySearchBasecoatBy({ state, colorGroup, colorName }: IuseQuerySearchBasecoatBy) {
  return useQuery({
    queryKey: ['searchBasecoatBy'],
    staleTime: Infinity,
    enabled: false,
    queryFn: async (): Promise<arrayListBasecoat> => {
      if (typeof colorGroup === 'string' && typeof colorName === 'string') {
        const res: arrayListBasecoat = await BasecoatService.searchBy(colorGroup, colorName);
        if (state) {
          state(res.basecoats);
        }
        toast.success('tintas listadas com sucesso');
        return res;
      }
      return {
        basecoats: []
      }
    },
  })
}
