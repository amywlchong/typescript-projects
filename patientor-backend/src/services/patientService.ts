import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry } from '../types';

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


export default {
  getAllNonSensitivePatients,
  getSensitivePatientById,
  addPatient
};
