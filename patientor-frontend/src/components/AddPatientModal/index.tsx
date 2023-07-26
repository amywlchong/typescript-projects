import { useContext } from 'react';

import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';

import AddPatientForm from './AddPatientForm';
import { PatientFormValues } from '../../types';

import { NotificationContext, NotificationLocation } from '../../contexts/NotificationContext';
import Notification from '../Notification';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => Promise<void>;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit}: Props) => {

  const [notification] = useContext(NotificationContext);

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new patient</DialogTitle>
      <Divider />
      <DialogContent>
        {notification?.location === NotificationLocation.Form && <Notification />}
        <AddPatientForm onSubmit={onSubmit} onCancel={onClose}/>
      </DialogContent>
    </Dialog>
  )
}

export default AddPatientModal;
