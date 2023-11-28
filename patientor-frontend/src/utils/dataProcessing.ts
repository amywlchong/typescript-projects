import { Diagnosis } from "../types";

export const formatDate = (date: string | undefined): string | undefined => {
  if (!date) return undefined;

  const [year, month, day] = date.split("T")[0].split("-");
  return `${day}-${month}-${year}`;
};

export const getDiagnosisName = (
  code: Diagnosis["code"],
  diagnosisData: Diagnosis[]
): Diagnosis["name"] => {
  const matchedDiagnosis = diagnosisData.find(
    (diagnosis) => diagnosis.code === code
  );
  return matchedDiagnosis?.name || "Unknown";
};
