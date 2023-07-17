import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';

import { PatientFormValues, Patient } from '../../types';
import AddPatientModal from '../AddPatientModal';

import patientService from '../../services/patients';

import { NotificationContext, NotificationStatus, NotificationLocation } from '../../contexts/NotificationContext';

interface Props {
  patients : Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientListPage = ({ patients, setPatients } : Props ) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [, showNotification] = useContext(NotificationContext);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === 'string') {
          const message = error.response.data;
          console.error(message);
          showNotification(message, NotificationStatus.Error, NotificationLocation.Form);
        } else {
          console.error('Unrecognized axios error', error);
          showNotification('An error occurred while adding the patient.', NotificationStatus.Error, NotificationLocation.Form);
        }
      } else {
        console.error('Unknown error', error);
        showNotification('An error occurred while adding the patient.', NotificationStatus.Error, NotificationLocation.Form);
      }
    }
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h2">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: '1em' }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell><Link to={`/patients/${patient.id}`}>{patient.name}</Link></TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
