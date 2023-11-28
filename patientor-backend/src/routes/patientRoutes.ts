import express from "express";
import {
  getAllNonSensitivePatients,
  getSensitivePatientById,
  addPatient,
  addEntryToPatient,
} from "../controllers/patientController";

const patientRouter = express.Router();

patientRouter.get("/", (req, res, next) => {
  getAllNonSensitivePatients(req, res, next).catch(next);
});

patientRouter.get("/:id", (req, res, next) => {
  getSensitivePatientById(req, res, next).catch(next);
});

patientRouter.post("/", (req, res, next) => {
  addPatient(req, res, next).catch(next);
});

patientRouter.post("/:id/entries", (req, res, next) => {
  addEntryToPatient(req, res, next).catch(next);
});

export default patientRouter;
