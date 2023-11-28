export interface Diagnosis {
  id: string;
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;

  diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum EntryType {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
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

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  idCardNumber?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
