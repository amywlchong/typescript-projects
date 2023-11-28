import { Request, Response, NextFunction } from "express";
import { DiagnosisModel } from "../models/diagnosis.model";
import toNewDiagnosis from "../utils/toNewDiagnosis";

const getDiagnoses = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const diagnoses = await DiagnosisModel.find({});
    res.json(diagnoses);
  } catch (error) {
    next(error);
  }
};

const addDiagnosis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newDiagnosis = toNewDiagnosis(req.body);
    const diagnosis = new DiagnosisModel(newDiagnosis);
    const savedDiagnosis = await diagnosis.save();
    res.status(201).json(savedDiagnosis);
  } catch (error) {
    next(error);
  }
};

export { getDiagnoses, addDiagnosis };
