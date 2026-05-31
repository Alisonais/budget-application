import { listBudgetItem } from "./budgetTypes";

export type errors = {
  email: string,
  password: string
} | null;

export type TLogin = { signedIn: boolean };

export type AuthPath =
  | '/auth/sign-up'
  | '/auth/validate-account'
  | '/auth/resend-validate-account'
  | '/auth/sign-in';

export interface ISignUp {
  name: string,
  email: string,
  password: string,
  phone: string
};

export interface IConfirmationCode {
  email: string,
  code: string,
};

export interface IResendConfirmationCode {
  email: string,
};

export interface ISignIn {
  email: string,
  password: string
};

export type GroupByMonthType = {
  [key: string]: listBudgetItem[]
};

