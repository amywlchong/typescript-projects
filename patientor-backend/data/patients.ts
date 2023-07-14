import { Patient, Gender, HealthCheckRating, Entry, EntryType } from '../src/types';
import toNewPatient from '../src/utils/toNewPatient';

const data = [
  {
    id: 1,
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    idCardNumber: 'A1234567',
    gender: Gender.Male,
    occupation: 'New york city cop',
    entries: [
      {
        id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
        date: '2015-01-02',
        type: EntryType.Hospital,
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description:
          'Healing time appr. 2 weeks. patient doesn\'t remember how he got the injury.',
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Martin Riggs',
    dateOfBirth: '1979-01-30',
    idCardNumber: 'B1234567',
    gender: Gender.Male,
    occupation: 'Cop',
    entries: [
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
        date: '2019-08-05',
        type: EntryType.OccupationalHealthcare,
        specialist: 'MD House',
        employerName: 'HyPD',
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        description:
          'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        },
      },
    ],
  },
  {
    id: 3,
    name: 'Hans Gruber',
    dateOfBirth: '1970-04-25',
    idCardNumber: 'C1234567',
    gender: Gender.Other,
    occupation: 'Technician',
    entries: [] as Entry[],
  },
  {
    id: 4,
    name: 'Dana Scully',
    dateOfBirth: '1974-01-05',
    idCardNumber: 'D1234567',
    gender: Gender.Female,
    occupation: 'Forensic Pathologist',
    entries: [
      {
        id: '37be178f-a432-4ba4-aac2-f86810e36a15',
        date: '2018-10-05',
        specialist: 'MD House',
        type: EntryType.HealthCheck,
        description:
          'Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.',
        healthCheckRating: HealthCheckRating.LowRisk,
      },
      {
        id: 'b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da',
        date: '2019-10-20',
        specialist: 'MD House',
        type: EntryType.HealthCheck,
        description: 'Yearly control visit. Cholesterol levels back to normal.',
        healthCheckRating: HealthCheckRating.Healthy,
      },
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
        date: '2019-09-10',
        specialist: 'MD House',
        type: EntryType.OccupationalHealthcare,
        employerName: 'FBI',
        description: 'Prescriptions renewed.',
      }
    ],
  },
  {
    id: 5,
    name: 'Matti Luukkainen',
    dateOfBirth: '1971-04-09',
    idCardNumber: 'E1234567',
    gender: Gender.Male,
    occupation: 'Digital evangelist',
    entries: [
      {
        id: '54a8746e-34c4-4cf4-bf72-bfecd039be9a',
        date: '2019-05-01',
        specialist: 'Dr Byte House',
        type: EntryType.HealthCheck,
        description: 'Digital overdose, very bytestatic. Otherwise healthy.',
        healthCheckRating: HealthCheckRating.Healthy,
      },
    ],
  },
];

const patientData: Array<Patient> = data.map(obj => {
    const object = toNewPatient(obj) as Patient;
    object.entries = obj.entries as Entry[];
    object.id = obj.id;
    return object;
});

export default patientData;
