import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';
import toNewEntry from '../utils/toNewEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const patient = patientService.getSensitivePatientById(id);

  if (!patient) {
    res.status(404).send({ error: 'Patient not found' });
  } else {
    res.send(patient);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  }
  catch (error: unknown) {
    let errorMessage = ' Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = Number(req.params.id);
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntryToPatient(id, newEntry);
    res.json(addedEntry);
  }
  catch (error: unknown) {
    let errorMessage = ' Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
