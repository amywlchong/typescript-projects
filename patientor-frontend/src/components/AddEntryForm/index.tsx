import { useState, useContext, FormEvent } from 'react';

import { TextField, MenuItem, SelectChangeEvent } from '@mui/material';
import { customMarginTop } from '../../styles/styles';
import FormButtons from '../FormComponents/FormButtons'
import SingleSelect from '../FormComponents/SingleSelect'
import MultiSelect from '../FormComponents/MultiSelect'

import { Diagnosis, EntryType, EntryWithoutId, HealthCheckRating } from '../../types';

import HospitalEntryFields from './HospitalEntryFields'
import OHCEntryFields from './OHCEntryFields';
import HealthCheckEntryFields from './HealthCheckEntryFields';

import { NotificationContext, NotificationStatus, NotificationLocation } from '../../contexts/NotificationContext';
import Notification from '../Notification'

interface Props {
  onCancel: () => void;
  onSubmit: (entryValues: EntryWithoutId) => Promise<void>;
  diagnosisDescriptions: Diagnosis[];
}

interface TypeOption {
  value: EntryType;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

const AddEntryForm = ({ onCancel, onSubmit, diagnosisDescriptions }: Props) => {

  const [notification, showNotification] = useContext(NotificationContext);

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [specialist, setSpecialist] = useState('');
  const [entryType, setEntryType] = useState<EntryType | null>(null);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const [healthCheckRating, setHealthCheckRating] = useState<number | null>(null);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const type = Object.values(EntryType).find(t => t.toString() === value);
    if (type) {
      setEntryType(type);
    }
  };

  const addEntry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const baseEntry = {
      date,
      description,
      diagnosisCodes,
      specialist
    }

    switch(entryType) {
      case EntryType.Hospital:
        onSubmit({
          ...baseEntry,
          type: entryType,
          discharge: {date: dischargeDate, criteria: dischargeCriteria}
        })
        break;
        case EntryType.OccupationalHealthcare:
          onSubmit({
            ...baseEntry,
            type: entryType,
            employerName,
            sickLeave: {startDate: sickLeaveStart, endDate: sickLeaveEnd}
          })
          break;
        case EntryType.HealthCheck:
          if (Object.values(HealthCheckRating).some(rating => rating === healthCheckRating)) {
            onSubmit({
              ...baseEntry,
              type: entryType,
              healthCheckRating: healthCheckRating as HealthCheckRating
            })
          } else {
            showNotification('Invalid health check rating value', NotificationStatus.Error, NotificationLocation.Form);
          }
          break;
      default:
        showNotification('Missing or incorrect entry type', NotificationStatus.Error, NotificationLocation.Form);
    }
  };

  return (
    <div>
      {notification?.location === NotificationLocation.Form && <Notification />}
      <form onSubmit={addEntry}>
        <TextField
          sx={customMarginTop}
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
        <MultiSelect
          label={'Diagnosis Codes'}
          selectedOptions={diagnosisCodes}
          setSelectedOptions={setDiagnosisCodes}
          menuItems={diagnosisDescriptions.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </MenuItem>
          ))}
        />
        <TextField
          label="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <SingleSelect
          options={typeOptions}
          label={'Entry Type'}
          selectedOption={entryType}
          onOptionChange={onTypeChange}
        />

        {entryType === EntryType.Hospital &&
          <HospitalEntryFields
            date={dischargeDate}
            setDate={setDischargeDate}
            criteria={dischargeCriteria}
            setCriteria={setDischargeCriteria}
          />
        }

        {entryType === EntryType.OccupationalHealthcare &&
          <OHCEntryFields
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeaveStart={sickLeaveStart}
            setSickLeaveStart={setSickLeaveStart}
            sickLeaveEnd={sickLeaveEnd}
            setSickLeaveEnd={setSickLeaveEnd} />
        }

        {entryType === EntryType.HealthCheck &&
          <HealthCheckEntryFields
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating} />
        }

        <FormButtons onCancel={onCancel} />

      </form>
    </div>
  );
};

export default AddEntryForm;
