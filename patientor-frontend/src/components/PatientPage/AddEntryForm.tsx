import { useState, useContext, SyntheticEvent } from 'react';

import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl } from '@mui/material';

import { Diagnosis, EntryType, EntryWithoutId, HealthCheckRating } from '../../types';

import HospitalEntryFields from './HospitalEntryFields'
import OHCEntryFields from './OHCEntryFields';
import HealthCheckEntryFields from './HealthCheckEntryFields';

import { NotificationContext, NotificationStatus, NotificationLocation } from '../../contexts/NotificationContext';
import Notification from '../Notification'

interface Props {
  onCancel: () => void;
  onSubmit: (entryValues: EntryWithoutId) => void;
  diagnosisData: Diagnosis[];
}

interface TypeOption {
  value: EntryType;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

const AddEntryForm = ({ onCancel, onSubmit, diagnosisData }: Props) => {

  const [notification, showNotification] = useContext(NotificationContext);

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState(['']);
  const [specialist, setSpecialist] = useState('');
  const [type, setType] = useState<EntryType | null>(null);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const [healthCheckRating, setHealthCheckRating] = useState<number | null>(null);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === 'string') {
      const value = event.target.value;
      const type = Object.values(EntryType).find(t => t.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      date,
      description,
      diagnosisCodes,
      specialist
    }

    switch(type) {
      case EntryType.Hospital:
        onSubmit({
          ...baseEntry,
          type,
          discharge: {date: dischargeDate, criteria: dischargeCriteria}
        })
        break;
        case EntryType.OccupationalHealthcare:
          onSubmit({
            ...baseEntry,
            type,
            employerName,
            sickLeave: {startDate: sickLeaveStart, endDate: sickLeaveEnd}
          })
          break;
        case EntryType.HealthCheck:
          if (Object.values(HealthCheckRating).some(rating => rating === healthCheckRating)) {
            onSubmit({
              ...baseEntry,
              type,
              healthCheckRating: healthCheckRating as HealthCheckRating
            })
          } else {
            showNotification('Invalid health check rating value', NotificationStatus.Error, NotificationLocation.Form);
          }
          break;
      default:
        showNotification('Missing or incorrect type', NotificationStatus.Error, NotificationLocation.Form);
    }
  };

  return (
    <div>
      {notification?.location === NotificationLocation.Form ? <Notification /> : <></>}
      <form onSubmit={addEntry}>
        <TextField
          sx={{ marginTop: '20px' }}
          label="Date"
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <FormControl fullWidth sx={{ marginTop: '20px' }}>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(diagnosisCodes.concat(target.value))}
          >
            {diagnosisData.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
        <Select
          label="Entry Type"
          value={type?.toString() || ''}
          onChange={onTypeChange}
        >
        {typeOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>

        {type === EntryType.Hospital &&
          <HospitalEntryFields
            date={dischargeDate}
            setDate={setDischargeDate}
            criteria={dischargeCriteria}
            setCriteria={setDischargeCriteria}
          />
        }

        {type === EntryType.OccupationalHealthcare &&
          <OHCEntryFields
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeaveStart={sickLeaveStart}
            setSickLeaveStart={setSickLeaveStart}
            sickLeaveEnd={sickLeaveEnd}
            setSickLeaveEnd={setSickLeaveEnd} />
        }

        {type === EntryType.HealthCheck &&
          <HealthCheckEntryFields
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating} />
        }

        <Grid container justifyContent="space-between">
          <Grid item>
            <Button
                variant="outlined"
                type="button"
                onClick={onCancel}
            >
                Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
                type="submit"
                variant="contained"
            >
                Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
