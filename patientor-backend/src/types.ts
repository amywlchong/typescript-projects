interface BaseEntry {
  id: string;
  description: string;
  date: Date;
  specialist: string;

  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface SickLeave {
  startDate: Date;
  endDate: Date;
}

interface Discharge {
  date: Date;
  criteria: string;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

// type for stored data
export interface Patient {
  id: number;
  name: string;
  dateOfBirth?: Date;
  idCardNumber?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

// type for client-facing data
export type NonSensitivePatient = Omit<Patient, 'idCardNumber' | 'entries'>;

// type for patient that is not saved yet
export type NewPatient = Omit<Patient, 'id' | 'entries'>;
