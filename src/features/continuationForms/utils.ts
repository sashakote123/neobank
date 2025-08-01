import { FormFields } from "@/src/shared/formSchema/secondFormSchema";

export function transformData(data: FormFields) {
  const DIVIDER = "_";
  const transformedData = {
    gender: data.gender.toUpperCase(),
    maritalStatus: data.maritalStatus.toUpperCase().replace("/", DIVIDER),
    dependentAmount: Number(data.dependentAmount),
    passportIssueDate: data.passportIssueDate,
    passportIssueBranch: data.passportIssueBranch,
    employment: {
      employmentStatus: data.employmentStatus
        .toUpperCase()
        .replace(" ", DIVIDER),
      employerINN: data.employerINN,
      salary: Number(data.salary),
      position: data.position.toUpperCase().replace(" ", DIVIDER),
      workExperienceTotal: Number(data.workExperienceTotal),
      workExperienceCurrent: Number(data.workExperienceCurrent),
    },
  };
  return transformedData;
}
