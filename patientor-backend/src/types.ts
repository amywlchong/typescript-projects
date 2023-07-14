export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: Date;
  specialist: string;

  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface SickLeave {
  startDate: Date;
  endDate: Date;
}

export interface Discharge {
  date: Date;
  criteria: string;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export enum EntryType {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck'
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type BaseEntryWithoutId = Omit<BaseEntry, 'id'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

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
