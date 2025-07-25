export interface ITableRow {
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
}

export interface ISortConfig {
  direction: boolean;
  column: keyof ITableRow | null;
}
