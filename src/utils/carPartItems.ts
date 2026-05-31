export const carPartItems = [
  {
    id: "parachoque-dianteiro",
    label: "Parachoque dianteiro",
    price: 450,
  },
  {
    id: "paralama-esquerdo",
    label: "Paralama esquerdo",
    price: 300,
  },
  {
    id: "paralama-direito",
    label: "Paralama direito",
    price: 300,
  },
  {
    id: "capo",
    label: "Capô",
    price: 700,
  },
  {
    id: "caixa-de-ar-esquerda",
    label: "Caixa de ar esquerda",
    price: 350,
  },
  {
    id: "caixa-de-ar-direita",
    label: "Caixa de ar direita",
    price: 350,
  },
  {
    id: "porta-dianteira-esquerda",
    label: "Porta dianteira esquerda",
    price: 400,
  },
  {
    id: "porta-dianteira-direita",
    label: "Porta dianteira direita",
    price: 400,
  },
  {
    id: "porta-traseira-esquerda",
    label: "Porta traseira esquerda",
    price: 400,
  },
  {
    id: "porta-traseira-direita",
    label: "Porta traseira direita",
    price: 400,
  },
  {
    id: "lateral-traseira-esquerda",
    label: "Lateral traseira esquerda",
    price: 450,
  },
  {
    id: "lateral-traseira-direita",
    label: "Lateral traseira direita",
    price: 450,
  },
  {
    id: "teto",
    label: "Teto",
    price: 800,
  },
  {
    id: "tampa-do-mala",
    label: "Tampa do mala",
    price: 400,
  },
  {
    id: "parachoque-traseiro",
    label: "Parachoque traseiro",
    price: 450,
  },
] as const;

export type itemProps = {
  id: string;
  label: string;
  price: number
}
