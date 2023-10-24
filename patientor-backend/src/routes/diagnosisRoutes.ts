import express from 'express';
import { getDiagnoses, addDiagnosis } from '../controllers/diagnosisController';

const diagnosisRouter = express.Router();

diagnosisRouter.get('/', (req, res, next) => {
  getDiagnoses(req, res, next).catch(next);
});

diagnosisRouter.post('/', (req, res, next) => {
  addDiagnosis(req, res, next).catch(next);
});

export default diagnosisRouter;
