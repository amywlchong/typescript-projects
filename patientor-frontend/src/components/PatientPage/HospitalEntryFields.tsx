import {  TextField } from '@mui/material';

interface Props {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  criteria: string;
  setCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalEntryFields = ({ date, setDate, criteria, setCriteria}: Props) => {

  return (
    <>
      <TextField
        sx={{ marginTop: '20px' }}
        label="Discharge date"
        type="date"
        value={date}
        onChange={({ target }) => setDate(target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Discharge criteria"
        value={criteria}
        onChange={({ target }) => setCriteria(target.value)}
      />
    </>
  )
}

export default HospitalEntryFields
