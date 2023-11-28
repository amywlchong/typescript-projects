import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { customMarginBottom } from "../../styles/styles";

import usePatientsState from "../../hooks/usePatientsState";
import { PatientFormValues, Patient } from "../../types";
import {
  NotificationContext,
  NotificationStatus,
  NotificationLocation,
} from "../../contexts/NotificationContext";
import AddPatientModal from "../AddPatientModal";

const PatientListPage = () => {
  const {
    patients,
    loadingPatients,
    errorMessageFetchingPatients,
    createNewPatient,
  } = usePatientsState();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [, showNotification] = useContext(NotificationContext);

  if (loadingPatients) {
    return <div>Loading...</div>;
  }

  if (errorMessageFetchingPatients !== "") {
    return <div>{errorMessageFetchingPatients}</div>;
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const handleSubmit = async (values: PatientFormValues) => {
    const { success, errorMessage } = await createNewPatient(values);

    if (success) {
      closeModal();
    } else {
      const errorMessageStr = errorMessage as string;
      showNotification(
        errorMessageStr,
        NotificationStatus.Error,
        NotificationLocation.Form
      );
    }
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h2">
          Patient list
        </Typography>
      </Box>
      <Table style={customMarginBottom}>
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
              <TableCell>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
