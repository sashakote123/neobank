export const formatDate = (date: string): string => {
  if (!date) return "";
  const dateToParse = new Date(+date.valueOf());
  return `${dateToParse.getFullYear()}-${dateToParse.getMonth()}-${dateToParse.getDay()}`;
};
