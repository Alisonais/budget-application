export interface CarPartCost {
  priceChange: number | null;
  carPartChange: string;
}

export interface LaborCost {
  carPart: string;
  price: number | null;
}

export interface laborpayment {
  id?: string,
  createdAt: string;
  budgetId: string;
  type: type;
  value: number;
}

export interface PaymentDataStep {
  partpayment: string;
  laborpayment: laborpayment[];
}

export interface BudgetDataStep {
  description: string;
  PartCost: CarPartCost[];
  LaborCost: LaborCost[];
}

export interface PersonalDataStep {
  name: string;
  adress: string;
  neighborhood: string;
  phone: string;
  city: string;
}

export interface SubTotalData {
  laborPrice: number;
  totalValue: number;
  partPrice: number;
}

export interface CarDataStep {
  model: string;
  plate: string;
  color: string;
  brand: string;
  year: number;
}

export interface IBudgetData {
  paymentDataStep: PaymentDataStep;
  budgetDataStep: BudgetDataStep;
  personalDataStep: PersonalDataStep;
  subTotalData: SubTotalData;
  carDataStep: CarDataStep;
  status: 'APROVADO' | 'PENDENTE';
  createdAt: Date;
  id: string;
}

export interface listBudgetItem {
  id: string;
  status: 'APROVADO' | 'PENDENTE';
  car: {
    color: string,
    model: string,
    year: any,
  };
  client: {
    name: string,
    phone: string,
  };
  value: {
    totalValue: number,
    laborPrice: number,
  },
  countPart: number,
  date: string,
}

export type arrayListBudgets = {
  budgets: listBudgetItem[]
}

export type budgetObject = {
  budget: {
    paymentDataStep: PaymentDataStep;
    budgetDataStep: BudgetDataStep;
    personalDataStep: PersonalDataStep;
    subTotalData: SubTotalData;
    carDataStep: CarDataStep;
    status: string;
    id: string;
  }
}

export enum type {
  PIX = 'Pix',
  CREDIT = 'Crédito',
  CASH = 'Dinheiro'
}
