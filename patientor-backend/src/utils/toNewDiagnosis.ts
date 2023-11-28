import { NewDiagnosis } from "../types";
import UserInputError from "../errors/UserInputError";

const isNonEmptyString = (text: unknown): text is string => {
  if (typeof text !== "string") {
    return false;
  }

  return !/^\s*$/.test(text);
};

const parseCode = (code: unknown): string => {
  if (!isNonEmptyString(code)) {
    throw new UserInputError("Missing or malformatted code");
  }

  return code;
};

const parseName = (name: unknown): string => {
  if (!isNonEmptyString(name)) {
    throw new UserInputError("Missing or malformatted name");
  }

  return name;
};

const parseLatin = (latin: unknown): string => {
  if (!isNonEmptyString(latin)) {
    throw new UserInputError("Missing or malformatted latin");
  }

  return latin;
};

const toNewDiagnosis = (object: unknown): NewDiagnosis => {
  if (!object || typeof object !== "object") {
    throw new UserInputError("Incorrect or missing data");
  }

  if ("code" in object && "name" in object) {
    const newDiagnosis: NewDiagnosis = {
      code: parseCode(object.code),
      name: parseName(object.name),
    };

    if ("latin" in object) {
      newDiagnosis.latin = parseLatin(object.latin);
    }

    return newDiagnosis;
  }

  throw new UserInputError("Some fields are missing");
};

export default toNewDiagnosis;
