import axios from 'axios'
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Patient, Diagnosis, Entry } from '../../types';
import patientService from '../../services/patients'
import diagnosisService from '../../services/diagnoses'
import HealthRatingBar from '../HealthRatingBar';

import { NotificationStatus, NotificationContext } from '../../contexts/NotificationContext';

import { Typography, Container, List, ListItem, Paper } from '@mui/material';

const PatientPage = () => {
  const [, showNotification] = useContext(NotificationContext);

  const params = useParams();
  const id = Number(params.id);

  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);

  const handleErrors = (error: unknown, message: string): void => {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      showNotification(message, NotificationStatus.Error);
    } else {
      console.error(error);
      showNotification('An error occurred while fetching data.', NotificationStatus.Error);
    }
  };

  useEffect(() => {
    const fetchOnePatient = async () => {
      setLoading(true);
      try {
        const patient = await patientService.getOne(id);
        if (patient) {
          setPatient(patient);
        }
        setLoading(false);
      } catch (error: unknown) {
        handleErrors(error, 'Patient not found.')
        setLoading(false);
      }
    };

    const fetchDiagnoses = async () => {
      try {
      const diagnoses = await diagnosisService.get();
      setDiagnoses(diagnoses);
      } catch (error: unknown) {
        handleErrors(error, 'Diagnosis descriptions not found.')
      }
    };

    void fetchOnePatient();
    void fetchDiagnoses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>Patient not found.</div>;
  }

  const formatDate = (date: string | undefined): string | undefined => {
    return date?.split('T')[0];
  }

  const getDiagnosisName = (code: Diagnosis['code']): Diagnosis['name'] => {
    const matchedDiagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
    return matchedDiagnosis?.name || 'Unknown';
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const entryDetails = (entry: Entry) => {
    switch(entry.type) {
      case 'Hospital':
        return <Typography variant="body1">Discharged on {entry.discharge.date}: {entry.discharge.criteria}</Typography>;
      case 'OccupationalHealthcare':
        return <Typography variant="body1">{entry.sickLeave ? `Sick leave from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}. ` : ''} Employer name: {entry.employerName}.</Typography>;
      case 'HealthCheck':
        return <HealthRatingBar showText={false} rating={entry.healthCheckRating} />;
      default:
        return assertNever(entry);
    }
  }

  return (
    <Container>
      <Typography variant="h2">{patient.name}</Typography>
      <Typography variant="body1">Gender: {patient.gender}</Typography>
      <Typography variant="body1">Date of birth: {formatDate(patient.dateOfBirth) || 'Unknown'}</Typography>
      <Typography variant="body1">ID card number: {patient.idCardNumber || 'Unknown'}</Typography>
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      <Typography variant="h3">Entries</Typography>
      {patient.entries && patient.entries.length > 0
        ? patient.entries
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map(entry => (
            <Paper
              elevation={1}
              sx={{
                padding: '1em',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '1em',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              key={entry.id}
            >
              <div>
                <Typography variant="body1">Date: {formatDate(entry.date)}</Typography>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>Description: {entry.description}</Typography>

                <Typography variant="body1">
                  Diagnosis details:
                </Typography>
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0
                  ? <List sx={{ padding: '0 1em', listStyleType: 'disc' }}>
                      {entry.diagnosisCodes.map((code, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            typography: 'body1',
                            display: 'list-item',
                            paddingLeft: '10px'
                          }}
                        >
                          {code}: {getDiagnosisName(code)}
                        </ListItem>
                      ))}
                    </List>
                  : <Typography variant="body2" sx={{paddingLeft: '10px'}}>No details</Typography>
                }
                {entryDetails(entry)}
              </div>
              <div style={{alignSelf: 'flex-end'}}>
                <Typography variant="body1">Diagnosed by {entry.specialist}</Typography>
              </div>
            </Paper>
          ))
        : <Typography variant="body1">No entries</Typography>
      }
    </Container>
  );
};

export default PatientPage;
