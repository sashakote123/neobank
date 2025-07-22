import { z } from "zod";

const isAdult = (dateString: string) => {
  const [day, month, year] = dateString.split(".");
  const birthDate = new Date(`${year}-${month}-${day}`);
  if (isNaN(birthDate.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};

export const formSchema = z.object({
  amount: z.string(),
  lastName: z
    .string()
    .min(1, "Enter your last name")
    .regex(/^[A-ZА-Я][a-zа-я]*$/, "Incorrect last name"),

  firstName: z
    .string()
    .min(1, "Enter your first name")
    .regex(/^[A-Za-zА-Яа-яЁё\s-]+$/, "Incorrect first name"),

  patronymic: z
    .string()
    .regex(/^[A-Za-zА-Яа-яЁё\s-]*$/, "Incorrect patronymic")
    .optional(),

  term: z.string().min(1, "Enter term").max(6, "Incorrect term"),

  email: z
    .string()
    .min(1, "Enter your email address")
    .email("Incorrect email address"),

  birth: z
    .string()
    .min(10, "Enter your date of birth")
    .refine(isAdult, "You must be 18 and older")
    .transform((str) => {
      const [day, month, year] = str.split(".");
      return `${year}-${month}-${day}`;
    }),

  passportSeries: z
    .string()
    .min(1, "Enter your passport series")
    .regex(/^\d{4}$/, "The series must be 4 digits"),

  passportNumber: z
    .string()
    .min(1, "Enter your passport number")
    .regex(/^\d{6}$/, "The series must be 6 digits"),
});

export type FormFields = z.infer<typeof formSchema>;
