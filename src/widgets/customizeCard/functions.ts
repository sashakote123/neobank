import { FormFields } from "@/src/shared/formSchema/formSchema";

export const formatDate = (date: string): string => {
  if (!date) return "";
  const dateToParse = new Date(+date.valueOf());
  return `${dateToParse.getFullYear()}-${dateToParse.getMonth()}-${dateToParse.getDay()}`;
};

export function transformData(data: FormFields) {
  const { patronymic, birth, ...restData } = data;
  const transformedData = {
    ...restData,
    term: Number(data.term),
    amount: Number(data.amount),
    middleName: patronymic,
    birthdate: birth,
  };

  return transformedData;
}
