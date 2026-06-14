import { formatName, formatNumber, formatPlate } from "@/utils/formatName";

export type carItemType = {
  id: 'model' | 'brand' | 'plate' | 'year' | 'color';
  label: 'Modelo' | 'Marca' | 'Placa' | 'Ano' | 'Cor';
  type: 'text' | 'number';
  formatFn: (string: string) => string | number;
}[];

export const carInputTypes: carItemType =
  [
    {
      id: 'model',
      label: 'Modelo',
      type: 'text',
      formatFn: formatName,
    },
    {
      id: 'brand',
      label: 'Marca',
      type: 'text',
      formatFn: formatName,
    },
    {
      id: 'plate',
      label: 'Placa',
      type: 'text',
      formatFn: formatPlate,
    },
    {
      id: 'year',
      label: 'Ano',
      type: 'number',
      formatFn: formatNumber,
    },
    {
      id: 'color',
      label: 'Cor',
      type: 'text',
      formatFn: formatName,
    }
  ]

