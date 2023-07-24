import { NewPatient, Gender } from '../types';
import UserInputError from '../errors/UserInputError';

const isNonEmptyString = (text: unknown): text is string => {
  if (typeof text !== 'string') {
    return false;
  }

  return !/^\s*$/.test(text);
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
  if (!isNonEmptyString(name)) {
    throw new UserInputError('Missing or malformatted name');
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): Date | undefined => {
  if (!dateOfBirth) {
    return undefined;
  }

  if (!isNonEmptyString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new UserInputError('Malformatted date of birth');
  }

  return new Date(dateOfBirth);
};

const parseIDCardNumber = (idCardNumber: unknown): string | undefined => {
  if (!idCardNumber) {
    return undefined;
  }

  if (!isNonEmptyString(idCardNumber) || !isIDCardNumber(idCardNumber)) {
    throw new UserInputError('Malformatted id card number');
  }

  return idCardNumber;
};

const parseGender = (gender: unknown): Gender => {
  if (!isNonEmptyString(gender) || !isGender(gender)) {
    throw new UserInputError('Missing or malformatted gender');
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isNonEmptyString(occupation)) {
    throw new UserInputError('Missing or malformatted occupation');
  }

  return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new UserInputError('Incorrect or missing data');
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

  throw new UserInputError('Some fields are missing');
};

export default toNewPatient;
