interface ExerciseHours {
  target: number;
  hours: number[];
}

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseHoursArguments = (args: string[]): ExerciseHours => {
  if (args.length < 4) throw new Error('Not enough arguments');

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
  }

  return {
    target: Number(args[2]),
    hours: process.argv.slice(3).map(Number)
  }
}

// dailyExerciseHours is an array that contains the number of exercise hours
// for each day in the training period
export const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
  const periodLength: number = dailyExerciseHours.length;
  let trainingDays: number = 0;
  let sumExerciseHours: number = 0;

  for (let hour of dailyExerciseHours) {
    if (hour > 0) {
      trainingDays += 1;
      sumExerciseHours += hour;
    }
  }

  const average: number = sumExerciseHours / periodLength;
  let success: boolean = false;
  let rating: number = 1;
  let ratingDescription: string = 'Did not meet target exercise hours';
  if (average >= target && average < target + 1) {
    success = true;
    rating = 2;
    ratingDescription = 'Good job! Met target exercise hours';
  } else if (average >= target + 1) {
    success = true;
    rating = 3;
    ratingDescription = 'Great job! Exceeded target exercise hours';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

if (require.main === module) {
  try {
    const { target, hours } = parseExerciseHoursArguments(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    let errorMessage = ' Error: '
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
