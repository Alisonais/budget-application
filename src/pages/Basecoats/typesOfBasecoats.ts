export type listBasecoatRequestType = {
  data: {
    basecoats: []
  }
}

export type Basecoat = {
  id: string;
  colorGroup: string;
  colorName: string;
  oem: string;
  quantity: number;
  colorCode: string;
}

export type objBasecoat = {
  basecoat?: Basecoat
}

export function basecoatInitialValues(initialvalue: Basecoat): Basecoat {
  return {
    id: initialvalue?.id ?? '',
    colorGroup: initialvalue?.colorGroup ?? '',
    colorName: initialvalue?.colorName ?? '',
    oem: initialvalue?.oem ?? '',
    quantity: initialvalue?.quantity ?? '',
    colorCode: initialvalue?.colorCode ?? '',
  }
}
