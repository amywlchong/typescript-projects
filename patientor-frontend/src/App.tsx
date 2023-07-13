import axios from 'axios'

import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { Patient } from './types';
import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import PatientPage from './components/PatientPage'

import { NotificationStatus, NotificationContext } from './contexts/NotificationContext';
import Notification from './components/Notification'

const App = () => {
  const [, showNotification] = useContext(NotificationContext);

  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
      const patients = await patientService.getAll();
      setPatients(patients);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          showNotification('Patients not found.', NotificationStatus.Error);
        } else {
          console.error(error);
          showNotification('An error occurred while fetching the patient data.', NotificationStatus.Error);
        }
      }
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h1" style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Notification />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
