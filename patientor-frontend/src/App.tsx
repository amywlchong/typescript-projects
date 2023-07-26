import { useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import useDiagnosisDescriptionsState from './hooks/useDiagnosisDescriptionsState';
import PatientListPage from './components/PatientListPage';
import PatientPage from './components/PatientPage'

import { NotificationContext, NotificationStatus, NotificationLocation } from './contexts/NotificationContext';
import Notification from './components/Notification'

const App = () => {
  const [notification, showNotification] = useContext(NotificationContext);
  const { diagnosisDescriptions, errorMessageFetchingDiagnoses } = useDiagnosisDescriptionsState();

  if (errorMessageFetchingDiagnoses !== '') {
    showNotification(errorMessageFetchingDiagnoses, NotificationStatus.Error, NotificationLocation.PageTop);
  }

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h1">
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          {notification?.location === NotificationLocation.PageTop && <Notification />}
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<PatientPage diagnosisDescriptions={diagnosisDescriptions} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
