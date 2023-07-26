import patientService from '../services/patients';
import { Patient } from '../types';
import useFetchAndUpdateData from './useFetchAndUpdateData';
import { PatientFormValues } from '../types';
import { handleError } from '../utils/errorHandlers';

const usePatientsState = () => {

  const { data, loadingData, errorMessage, addToArray } = useFetchAndUpdateData<Patient>(
    () => patientService.getAll(),
    'An error occurred while fetching the patients.',
    'Patients not found.'
  );

  const patients = Array.isArray(data)
    ? data
    : [];

  const createNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      addToArray(patient);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = handleError(error, 'An error occurred while adding the patient.');
      return { success: false, errorMessage };
    }
  };

  return {
    patients,
    loadingPatients: loadingData,
    errorMessageFetchingPatients: errorMessage,
    createNewPatient
  };
};

export default usePatientsState;
