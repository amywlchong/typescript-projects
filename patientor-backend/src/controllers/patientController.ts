import { Request, Response, NextFunction } from "express";
import { PatientModel } from "../models/patient.model";
import toNewPatient from "../utils/toNewPatient";
import { Patient, NonSensitivePatient, EntryType } from "../types";
import toNewEntry, { setValidDiagnosisCodes } from "../utils/toNewEntry";
import {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../models/entry.model";
import { DiagnosisModel } from "../models/diagnosis.model";

const getNonSensitivePatients = (
  sensitivePatients: Array<Patient>
): Array<NonSensitivePatient> => {
  return sensitivePatients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const getAllNonSensitivePatients = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patients = await PatientModel.find({});
    res.json(getNonSensitivePatients(patients));
  } catch (error) {
    next(error);
  }
};

const getSensitivePatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await PatientModel.findById(req.params.id).populate(
      "entries"
    );
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).send("Patient not found");
    }
  } catch (error) {
    next(error);
  }
};

const addPatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newPatientData = toNewPatient(req.body);
    const patient = new PatientModel(newPatientData);

    const savedPatient = await patient.save();
    const nonSensitivePatient = getNonSensitivePatients([savedPatient])[0];

    res.status(201).json(nonSensitivePatient);
  } catch (error) {
    next(error);
  }
};

const addEntryToPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const patientId = req.params.id;

  try {
    const diagnoses = await DiagnosisModel.find({});
    const fetchedDiagnosisCodes = diagnoses.map((d) => d.code);
    setValidDiagnosisCodes(fetchedDiagnosisCodes);

    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      res.status(404).send("Patient not found");
      return;
    }

    const newEntryData = toNewEntry(req.body);

    let entry;
    switch (newEntryData.type) {
      case EntryType.Hospital:
        entry = new HospitalEntry(newEntryData);
        break;
      case EntryType.OccupationalHealthcare:
        entry = new OccupationalHealthcareEntry(newEntryData);
        break;
      case EntryType.HealthCheck:
        entry = new HealthCheckEntry(newEntryData);
        break;
      default:
        throw new Error("Invalid entry type");
    }

    const savedEntry = await entry.save();

    patient.entries = patient.entries.concat(savedEntry._id);
    await patient.save();

    res.status(201).json(savedEntry);
  } catch (error) {
    next(error);
  }
};

export {
  getAllNonSensitivePatients,
  getSensitivePatientById,
  addPatient,
  addEntryToPatient,
};
