export const formatDate = (date: Date | null): string => {
  if (!date) return "";
  return date.toLocaleDateString("ru-RU"); // Формат DD.MM.YYYY
};
