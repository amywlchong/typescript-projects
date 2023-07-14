import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});