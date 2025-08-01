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

  mask?: string | RegExp | null;

  type?: "selector" | "calendar" | "input";
  selectorArray?: number[] | string[];
  errorAlert: string;
  requiredAlert?: string;
}

export interface IFormFields {
  amount: number;
  lastName: string;
  firstName: string;
  patronymic: string;
  email: string;
  birth: string;
  passportSeries: string;
  passportNumber: number;
  term?: number;

  gender: string;
  maritalStatus: string;
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employmentStatus: string;
  employerINN: number;
  salary: number;
  position: string;
  workExperienceTotal: number;
  workExperienceCurrent: number;
}

export interface IOfferItem {
  applicationId: number;
  requestedAmount: number;
  totalAmount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
}

export interface IOffersState {
  offersArray: IOfferItem[] | null;
  currentOffer?: IOfferItem | null;
}

export interface ITableRow {
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
}
