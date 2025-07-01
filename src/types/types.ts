export interface INews {
  urlToImage: string;
  url: string;
  title: string;
  description: string;
}

export interface ILink {
  to: string;
  text: string;
}

export interface ICurrency {
  img: string;
  name: string;
  value: number;
}

export interface IImage {
  img: string;
  code: string;
}

export interface CurrencyData {
  [key: string]: {
    code: string;
    value: number;
  };
}

export interface INews {
  urlToImage: string;
  url: string;
  title: string;
  description: string;
}
