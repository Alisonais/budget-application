export type personalItemType = {
  label: 'Nome' | 'Telefone' | 'Endereço' | 'Bairro' | 'Cidade';
  id: 'name' | 'phone' | 'adress' | 'neighborhood' | 'city';
  type: 'text' | 'tel';
}[];

export const personalInputTypes: personalItemType = [
  {
    id: 'name',
    label: 'Nome',
    type: 'text'
  },
  {
    id: 'phone',
    label: 'Telefone',
    type: 'tel'
  },
  {
    id: 'adress',
    label: 'Endereço',
    type: 'text'
  },
  {
    id: 'neighborhood',
    label: 'Bairro',
    type: 'text'
  },
  {
    id: 'city',
    label: 'Cidade',
    type: 'text'
  }
];
