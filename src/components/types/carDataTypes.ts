export type carItemType = {
  id: 'model' | 'brand' | 'plate' | 'year' | 'color';
  label: 'Modelo' | 'Marca' | 'Placa' | 'Ano' | 'Cor';
  type: 'text' | 'number';
}[];

export const carInputTypes: carItemType =
  [
    {
      id: 'model',
      label: 'Modelo',
      type: 'text',
    },
    {
      id: 'brand',
      label: 'Marca',
      type: 'text',
    },
    {
      id: 'plate',
      label: 'Placa',
      type: 'text',
    },
    {
      id: 'year',
      label: 'Ano',
      type: 'number',
    },
    {
      id: 'color',
      label: 'Cor',
      type: 'text',
    }
  ]

