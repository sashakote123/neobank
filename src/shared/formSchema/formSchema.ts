import { z } from "zod";

const isAdult = (dateString: string) => {
  const birthDate = new Date(dateString);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
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
