import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';

const app = express();
app.use(express.json());

interface BmiResponse {
  weight: number;
  height: number;
  bmi: string;
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && height > 0 && !isNaN(weight) && weight > 0) {
    const response: BmiResponse = {
      weight,
      height,
      bmi: calculateBmi(height, weight)
    }
    res.json(response);
  } else {
    res.status(400).send({
      error: "missing or malformatted parameters"
    });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({
      error: "parameters missing"
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!Array.isArray(daily_exercises) || daily_exercises.some((value: any) => isNaN(Number(value))) || isNaN(Number(target))) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  }

  const response: Result = calculateExercises(daily_exercises, target);
  res.json(response);

})

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
