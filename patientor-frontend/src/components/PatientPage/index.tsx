import axios from 'axios'
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Patient, Diagnosis, EntryWithoutId } from '../../types';
import Entry from './Entry';
import AddEntryForm from './AddEntryForm';
import patientService from '../../services/patients'
import diagnosisService from '../../services/diagnoses'

import { NotificationStatus, NotificationLocation, NotificationContext } from '../../contexts/NotificationContext';

import { Typography, Button, Box } from '@mui/material';

const PatientPage = () => {
  const [, showNotification] = useContext(NotificationContext);

  const params = useParams();
  const id = Number(params.id);

  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEntryFormVisible, setIsEntryFormVisible] = useState(false);

  const handleErrors = (error: unknown, message: string): void => {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      showNotification(message, NotificationStatus.Error, NotificationLocation.PageTop);
    } else {
      console.error(error);
      showNotification('An error occurred while fetching data.', NotificationStatus.Error, NotificationLocation.PageTop);
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

  const ShowEntryForm = () => {
    setIsEntryFormVisible(true);
  }

  const hideEntryForm = () => {
    setIsEntryFormVisible(false);
  }

  const submitNewEntry = async (entryValues: EntryWithoutId) => {
    try {
      const entry = await patientService.createEntry(patient.id, entryValues);
      setPatient(
        {
          ...patient,
          entries: patient.entries.concat(entry)
        }
      );
      setIsEntryFormVisible(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === 'string') {
          const message = error.response.data;
          console.error(message);
          showNotification(message, NotificationStatus.Error, NotificationLocation.Form);
        } else {
          console.error('Unrecognized axios error', error);
          showNotification('An error occurred while adding the entry', NotificationStatus.Error, NotificationLocation.Form);
        }
      } else {
        console.error('Unknown error', error);
        showNotification('An error occurred while adding the entry', NotificationStatus.Error, NotificationLocation.Form);
      }
    }
  };

  const formatDate = (date: string | undefined): string | undefined => {
    return date?.split('T')[0];
  }

  const getDiagnosisName = (code: Diagnosis['code']): Diagnosis['name'] => {
    const matchedDiagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
    return matchedDiagnosis?.name || 'Unknown';
  }

  return (
    <div>
      <Box sx={{margin: '0.6em 0'}}>
        <Typography variant="h2">{patient.name}</Typography>
        <Typography variant="body1">Gender: {patient.gender}</Typography>
        <Typography variant="body1">Date of birth: {formatDate(patient.dateOfBirth) || 'Unknown'}</Typography>
        <Typography variant="body1">ID card number: {patient.idCardNumber || 'Unknown'}</Typography>
        <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      </Box>

      <Box sx={{margin: '0.6em 0'}}>
        {isEntryFormVisible &&
          <AddEntryForm onCancel={hideEntryForm} onSubmit={submitNewEntry} diagnosisData={diagnoses} />}
        {!isEntryFormVisible &&
        <Button variant="contained" onClick={ShowEntryForm}>
          Add New Entry
        </Button>}
      </Box>

      <Box sx={{margin: '0.6em 0'}}>
        <Typography variant="h3">Entries</Typography>
        {patient.entries && patient.entries.length > 0
          ? patient.entries
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(entry => (
              <Entry
                key={entry.id}
                entry={entry}
                getDiagnosisName={getDiagnosisName}
                formatDate={formatDate}
              />
            ))
          : <Typography variant="body1">No entries</Typography>
        }
      </Box>
    </div>
  );
};

export default PatientPage;
