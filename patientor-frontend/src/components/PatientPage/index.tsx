import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import useOnePatientState from '../../hooks/useOnePatientState';
import { Diagnosis, EntryWithoutId } from '../../types';
import { formatDate } from '../../utils/dataProcessing';
import Entry from './Entry';
import AddEntryForm from '../AddEntryForm';

import { NotificationStatus, NotificationLocation, NotificationContext } from '../../contexts/NotificationContext';

import { Typography, Button, Box } from '@mui/material';

interface Props {
  diagnosisDescriptions: Diagnosis[];
}

const PatientPage = ({ diagnosisDescriptions }: Props) => {

  const [, showNotification] = useContext(NotificationContext);
  const [isEntryFormVisible, setIsEntryFormVisible] = useState(false);

  const params = useParams();
  const id = params.id || '';
  const { patient, loadingPatient, errorMessageFetchingPatient, createNewEntry } = useOnePatientState(id);

  if (loadingPatient) {
    return <div>Loading...</div>;
  }

  if (!patient || errorMessageFetchingPatient !== '') {
    return <div>{errorMessageFetchingPatient}</div>
  }

  const boxMargin = {
    margin: '0.6em 0'
  };

  const showEntryForm = () => {
    setIsEntryFormVisible(true);
  }

  const hideEntryForm = () => {
    setIsEntryFormVisible(false);
  }

  const handleSubmit = async (entryValues: EntryWithoutId) => {
    const { success, errorMessage } = await createNewEntry(entryValues);

    if (success) {
      hideEntryForm();
    } else {
      const errorMessageStr = errorMessage as string;
      showNotification(errorMessageStr, NotificationStatus.Error, NotificationLocation.Form);
    }
  }

  return (
    <div>
      <Box sx={boxMargin}>
        <Typography variant="h2">{patient.name}</Typography>
        <Typography variant="body1">Gender: {patient.gender}</Typography>
        <Typography variant="body1">Date of birth: {formatDate(patient.dateOfBirth) || 'Unknown'}</Typography>
        <Typography variant="body1">ID card number: {patient.idCardNumber || 'Unknown'}</Typography>
        <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      </Box>

      <Box sx={boxMargin}>
        {isEntryFormVisible &&
          <AddEntryForm onCancel={hideEntryForm} onSubmit={handleSubmit} diagnosisDescriptions={diagnosisDescriptions} />}
        {!isEntryFormVisible &&
        <Button variant="contained" onClick={showEntryForm}>
          Add New Entry
        </Button>}
      </Box>

      <Box sx={boxMargin}>
        <Typography variant="h3">Entries</Typography>
        {patient.entries && patient.entries.length > 0
          ? patient.entries
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(entry => (
              <Entry
                key={entry.id}
                entry={entry}
                diagnosisDescriptions={diagnosisDescriptions}
              />
            ))
          : <Typography variant="body1">No entries</Typography>
        }
      </Box>
    </div>
  );
};

export default PatientPage;
