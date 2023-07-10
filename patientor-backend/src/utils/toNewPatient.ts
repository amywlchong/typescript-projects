import { NewPatient, Gender } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNonEmptyString = (name: string): boolean => {
    return /\p{L}/gu.test(name);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isIDCardNumber = (idCardNumber: string): boolean => {
  return /^[A-Za-z]\d{7}$/.test(idCardNumber);
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseName = (name: unknown): string => {
  if (!isString(name) || !isNonEmptyString(name)) {
    throw new Error('Malformatted name');
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): Date => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Malformatted date of birth');
  }

  return new Date(dateOfBirth);
};

const parseIDCardNumber = (idCardNumber: unknown): string => {
  if (!isString(idCardNumber) || !isIDCardNumber(idCardNumber)) {
    throw new Error('Malformatted id card number');
  }

  return idCardNumber;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Malformatted gender');
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || !isNonEmptyString(occupation)) {
    throw new Error('Malformatted occupation');
  }

  return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };

    if ('dateOfBirth' in object) {
      newPatient.dateOfBirth = parseDateOfBirth(object.dateOfBirth);
    }

    if ('idCardNumber' in object) {
      newPatient.idCardNumber = parseIDCardNumber(object.idCardNumber);
    }

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
