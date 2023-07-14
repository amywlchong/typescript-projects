import { Diagnosis, HealthCheckRating, Discharge, SickLeave, EntryType, BaseEntryWithoutId, EntryWithoutId } from '../types';
import diagnosisData from '../../data/diagnoses';

const isNonEmptyString = (text: unknown): text is string => {
  if (typeof text !== 'string') {
    return false;
  }

  return !/^\s*$/.test(text);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isEntryType = (param: string): param is EntryType => {
  return Object.values(EntryType).map(v => v.toString()).includes(param);
};

const parseDescription = (description: unknown): string => {
  if (!isNonEmptyString(description)) {
    throw new Error('Missing or malformatted description');
  }
  return description;
};

const parseDate = (date: unknown): Date => {
  if (!isNonEmptyString(date) || !isDate(date)) {
    throw new Error('Missing or malformatted date');
  }
  return new Date(date);
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isNonEmptyString(specialist)) {
    throw new Error('Missing or malformatted specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> | undefined => {
  if (!codes) {
    return undefined;
  }

  if (!Array.isArray(codes) || !codes.every(code => typeof code === 'string')) {
    throw new Error('Malformatted diagnosis codes: ' + JSON.stringify(codes));
  }

  const nonEmptyCodes = codes.filter(code => isNonEmptyString(code)) as Array<Diagnosis['code']>;

  const validDiagnosisCodes = diagnosisData.map(d => d.code);

  nonEmptyCodes.forEach(code => {
    if (!validDiagnosisCodes.includes(code)) {
      throw new Error(`Invalid diagnosis code: ${code}`);
    }
  });

  const uniqueCodes = Array.from(new Set(nonEmptyCodes));

  return uniqueCodes;
};

const parseType = (type: unknown): EntryType => {
  if (!isNonEmptyString(type) || !isEntryType(type)) {
    throw new Error('Missing or malformatted type');
  }
  return type;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if ( !discharge || typeof discharge !== 'object' ) {
    throw new Error('Missing or malformatted discharge data');
  }

  if (!('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('Missing fields in discharge data');
  }

  if (!isNonEmptyString(discharge.date) || !isDate(discharge.date)) {
    throw new Error('Missing or malformatted discharge date: ' + discharge.date);
  }

  if (!isNonEmptyString(discharge.criteria)) {
    throw new Error('Missing or malformatted discharge criteria: ' + discharge.criteria);
  }

  return {date: new Date(discharge.date), criteria: discharge.criteria};
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  const ratingNumeric = Number(rating);
  if (isNaN(ratingNumeric) || !isHealthCheckRating(ratingNumeric)) {
    throw new Error('Missing or malformatted health check rating: ' + rating);
  }
  return ratingNumeric;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isNonEmptyString(employerName)) {
    throw new Error('Missing or malformatted employer name');
  }
  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }

  if (typeof sickLeave !== 'object') {
    throw new Error('Malformatted sick leave data');
  }

  const sickLeaveObject = sickLeave as { [key: string]: unknown };

  if ((!('startDate' in sickLeaveObject) && !('endDate' in sickLeaveObject))) {
    return undefined;
  }

  if (sickLeaveObject.startDate === '' && sickLeaveObject.endDate === '') {
    return undefined;
  }

  if (!isNonEmptyString(sickLeaveObject.startDate) || !isDate(sickLeaveObject.startDate) || !isNonEmptyString(sickLeaveObject.endDate) || !isDate(sickLeaveObject.endDate)) {
    throw new Error('Malformatted sick leave data: ' + JSON.stringify(sickLeaveObject));
  }

  return { startDate: new Date(sickLeaveObject.startDate), endDate: new Date(sickLeaveObject.endDate)};
};

const toBaseEntry = (object: object): BaseEntryWithoutId => {

  if ('description' in object && 'date' in object && 'specialist' in object) {
    const baseEntry: BaseEntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist)
    };

    if ('diagnosisCodes' in object) {
      baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }

    return baseEntry;
  }

  throw new Error('Some fields are missing');
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if (!('type' in object)) {
    throw new Error('Missing type');
  }

  const baseEntry = toBaseEntry(object);

  switch(parseType(object.type)) {
    case EntryType.Hospital:
      if (!('discharge' in object)) {
        throw new Error('Missing discharge field');
      }
      return {
        ...baseEntry,
        type: EntryType.Hospital,
        discharge: parseDischarge(object.discharge)
      };
    case EntryType.HealthCheck:
      if (!('healthCheckRating' in object)) {
        throw new Error('Missing health check rating field');
      }
      return {
        ...baseEntry,
        type: EntryType.HealthCheck,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case EntryType.OccupationalHealthcare:
      if (!('employerName' in object)) {
        throw new Error('Missing employer name field');
      }
      const sickLeave = 'sickLeave' in object ? parseSickLeave(object.sickLeave) : undefined;
      return {
        ...baseEntry,
        type: EntryType.OccupationalHealthcare,
        employerName: parseEmployerName(object.employerName),
        sickLeave
      };
    default:
      throw new Error ('Incorrect type');
  }
};

export default toNewEntry;
