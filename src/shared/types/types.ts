export interface NewsNavigationProps {
  currentIndex: number;
  itemsCount: number;
  onNavigate: (direction: "prev" | "next") => void;
  itemWidth?: number;
  visibleItems?: number;
}

export interface INews {
  image_url: string;
  link: string;
  title: string;
  description: string;
}

export interface ILink {
  to: string;
  text: string;
}

export interface IImage {
  img: string;
  code: string;
}

export interface IForms {
  name: keyof IFormFields;
  title: string;
  placeholder: string;
  required: boolean;

  type?: "selector" | "calendar";
  selectorArray?: number[];
  validate?: (data: string | number | undefined) => boolean;
  errorAlert: string;
  requiredAlert?: string;
}

export interface IFormFields {
  lastName: string;
  firstName: string;
  patronymic: string;
  email: string;
  birth: string;
  passportSeries: string;
  passportNumber: string;
  term?: number;
}
