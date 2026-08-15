import { arrayListBasecoat, Basecoat } from "@/pages/Basecoats/typesOfBasecoats";
import { BasecoatService } from "@/services/BasecoatService";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

interface IuseQueryListBasecoat {
  state: Dispatch<SetStateAction<Basecoat[]>>
}

export function useQueryListBasecoat({ state }: IuseQueryListBasecoat) {
  return useQuery({
    queryKey: ['listBasecoat'],
    staleTime: Infinity,
    queryFn: async (): Promise<arrayListBasecoat> => {
      const res: arrayListBasecoat = await BasecoatService.getBasecoats();
      state(res.basecoats);
      return res;
    },
  })
}


