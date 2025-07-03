export interface ICurrency {
  img: string;
  name: string;
  value: number;
}

export interface CurrencyData {
  [key: string]: {
    code: string;
    value: number;
  };
}
