export type listBasecoatRequestType = {
  data: {
    basecoats: []
  }
}

export type Basecoat = {
  id?: string;
  colorGroup: string;
  colorName: string;
  oem: string;
  quantity: number;
  colorCode?: string;
}

export type objBasecoat = {
  basecoat?: Basecoat
}

export function basecoatInitialValues({ basecoat }: objBasecoat ): Basecoat {
  return {
    id: basecoat?.id ?? '',
    colorGroup: basecoat?.colorGroup ?? '',
    colorName: basecoat?.colorName ?? '',
    oem: basecoat?.oem ?? '',
    quantity: basecoat?.quantity ?? 0,
    colorCode: basecoat?.colorCode ?? '',
  }
}
