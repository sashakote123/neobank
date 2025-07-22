import { z } from "zod";

export const secondFormSchema = z.object({
  gender: z
    .string()
    .refine((val) => ![""].includes(val), "Select one of the options"),

  maritalStatus: z
    .string()
    .refine((val) => ![""].includes(val), "Select one of the options"),

  dependentAmount: z
    .string()
    .min(1, "Enter number of dependents")
    .refine(
      (val) => /^\d{1,2}$/.test(val) && Number(val) <= 10,
      "Enter a number between 0 and 10"
    ),

  passportIssueDate: z
    .string()
    .min(10, "Enter your date of issue of the passport")
    .transform((str) => {
      const [day, month, year] = str.split(".");
      return `${year}-${month}-${day}`;
    }),

  passportIssueBranch: z
    .string()
    .min(1, "Enter your division code")
    .regex(/^\d{6}$/, "The series must be 6 digits"),

  employmentStatus: z
    .string()
    .refine((val) => ![""].includes(val), "Select one of the options"),

  employerINN: z
    .string()
    .min(1, "Enter your INN")
    .regex(/^\d{12}$/, "Department code must be 12 digits"),

  salary: z
    .string()
    .min(1, "Enter your salary")
    .refine((val) => Number(val) <= 1000000000, "Salary is too high"),

  position: z
    .string()
    .refine((val) => ![""].includes(val), "Select one of the options"),

  workExperienceTotal: z
    .string()
    .min(1, "Enter your work experience total")
    .refine(
      (val) => /^\d{1,3}$/.test(val) && Number(val) <= 100,
      "Enter a number between 0 and 100"
    ),

  workExperienceCurrent: z
    .string()
    .min(1, "Enter your work experience current")
    .refine(
      (val) => /^\d{1,3}$/.test(val) && Number(val) <= 100,
      "Enter a number between 0 and 100"
    ),
});

export type FormFields = z.infer<typeof secondFormSchema>;
