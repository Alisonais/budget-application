import { BasecoatService } from "@/services/BasecoatService";
import { AnimatePresence } from "motion/react";
import { useCallback, useState } from "react";
import { listBasecoatRequestType } from "./typesOfBasecoats";

export function Basecoats() {

  const [basecoats, setBasecoats] = useState([]);

  const loadBasecoats = useCallback(async () => {
    try {
      const data: listBasecoatRequestType = await BasecoatService.getBasecoats();
      const getBasecoats = data.data.basecoats;
    } catch (err) {

    }
  }, []);

  return (
    <AnimatePresence
      mode="popLayout"
    >
      <div>
        lista de tintas
      </div>
    </AnimatePresence>
  )
};
