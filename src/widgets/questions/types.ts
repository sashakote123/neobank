export interface ISection {
  sectionTitle: string;
  questions: IQuestion[];
}

export interface IQuestion {
  question: string;
  answer: string;
}
