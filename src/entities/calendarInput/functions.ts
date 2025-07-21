import { Value } from "react-calendar/dist/shared/types";

export const formatDate = (date: Value): string => {
  if (!date) return "";
  const dateToParse = new Date(+date.valueOf());
  return dateToParse.toLocaleDateString("ru-RU");
};
