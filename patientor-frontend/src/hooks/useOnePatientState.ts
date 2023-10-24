import patientService from '../services/patients';
import { Patient } from '../types';
import useFetchAndUpdateData from './useFetchAndUpdateData';
import { EntryWithoutId } from '../types';
import { handleError } from '../utils/errorHandlers';

const useOnePatientState = (id: string) => {

  const { data, loadingData, errorMessage, updateItem } = useFetchAndUpdateData<Patient>(
    () => patientService.getOne(id),
    'An error occurred while fetching the patient.',
    'Patient not found.'
  );

  const patient = data as Patient | null;

  const createNewEntry = async (entryValues: EntryWithoutId) => {
    try {
      const entry = await patientService.createEntry(id, entryValues);
      updateItem(prev => ({
        ...prev,
        entries: prev.entries.concat(entry)
      }));
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = handleError(error, 'An error occurred while adding the entry');
      return { success: false, errorMessage };
    }
  };

  return {
    patient,
    loadingPatient: loadingData,
    errorMessageFetchingPatient: errorMessage,
    createNewEntry
  };
};

export default useOnePatientState;
