import {  TextField } from '@mui/material';

interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveStart: string;
  setSickLeaveStart: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveEnd: string;
  setSickLeaveEnd: React.Dispatch<React.SetStateAction<string>>;
}

const OHCEntryFields = ({ employerName, setEmployerName, sickLeaveStart, setSickLeaveStart, sickLeaveEnd, setSickLeaveEnd}: Props) => {

  return (
    <>
      <TextField
        label="Employer name"
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <TextField
        sx={{ marginTop: '20px' }}
        label="Sick leave start date"
        type="date"
        value={sickLeaveStart}
        onChange={({ target }) => setSickLeaveStart(target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        sx={{ marginTop: '20px' }}
        label="Sick leave end date"
        type="date"
        value={sickLeaveEnd}
        onChange={({ target }) => setSickLeaveEnd(target.value)}
        InputLabelProps={{ shrink: true }}
      />
    </>
  )
}

export default OHCEntryFields
