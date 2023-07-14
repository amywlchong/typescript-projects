import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry, EntryWithoutId } from '../types';

const getNonSensitivePatients = (sensitivePatients: Array<Patient>): Array<NonSensitivePatient> => {
  return sensitivePatients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getAllNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return getNonSensitivePatients(patientData);
};

const getSensitivePatientById = (id: number): Patient | undefined => {
  const matchedPatient: Patient | undefined = patientData.find(patient => patient.id === id);
  return matchedPatient;
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient = {
    id: Math.max(...patientData.map(d => d.id)) + 1,
    entries: new Array<Entry>,
    ...patient
  };

  patientData.push(newPatient);
  return getNonSensitivePatients([newPatient])[0];
};

const addEntryToPatient = (patientId: number, entry: EntryWithoutId): Entry => {
  const patient = patientData.find(patient => patient.id === patientId);

  if (!patient) {
    throw new Error(`Patient with id ${patientId} not found`);
  }

  const newEntry = {
    id: uuidv4(),
    ...entry
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getAllNonSensitivePatients,
  getSensitivePatientById,
  addPatient,
  addEntryToPatient
};
