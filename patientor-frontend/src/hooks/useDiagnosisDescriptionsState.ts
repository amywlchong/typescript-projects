import diagnosisService from "../services/diagnoses";
import { Diagnosis } from "../types";
import useFetchAndUpdateData from "./useFetchAndUpdateData";

const useFetchDiagnosisDescriptions = () => {
  const { data, loadingData, errorMessage } = useFetchAndUpdateData<Diagnosis>(
    () => diagnosisService.getAll(),
    "An error occurred while fetching the diagnosis descriptions.",
    "Diagnosis descriptions not found."
  );

  const diagnosisDescriptions = Array.isArray(data) ? data : [];

  return {
    diagnosisDescriptions,
    loadingDiagnosisDescriptions: loadingData,
    errorMessageFetchingDiagnoses: errorMessage,
  };
};

export default useFetchDiagnosisDescriptions;
