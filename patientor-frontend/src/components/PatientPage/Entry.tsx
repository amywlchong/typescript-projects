import { Entry, EntryType, Diagnosis } from '../../types'

import HealthRatingBar from '../HealthRatingBar';

import { Typography, Paper, List, ListItem } from '@mui/material';
import { styled } from '@mui/system';

interface Props {
  entry: Entry;
  getDiagnosisName: (code: Diagnosis['code']) => Diagnosis['name'];
  formatDate: (date: string | undefined) => (string | undefined);
}

const EntryComponent = ({ entry, getDiagnosisName, formatDate }: Props) => {

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }));

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const entryDetails = (entry: Entry) => {
    switch(entry.type) {
      case EntryType.Hospital:
        return <Typography variant="body1">Discharged on {formatDate(entry.discharge.date)}: {entry.discharge.criteria}</Typography>;
      case EntryType.OccupationalHealthcare:
        return <Typography variant="body1">{entry.sickLeave ? `Sick leave from ${formatDate(entry.sickLeave.startDate)} to ${formatDate(entry.sickLeave.endDate)}. ` : ''} Employer name: {entry.employerName}.</Typography>;
      case EntryType.HealthCheck:
        return <HealthRatingBar showText={false} rating={entry.healthCheckRating} readOnly={true} />;
      default:
        return assertNever(entry);
    }
  }

  return (
    <StyledPaper>
      <div>
        <Typography variant="body1">Date: {formatDate(entry.date)}</Typography>
        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>Description: {entry.description}</Typography>
        <Typography variant="body1">
            Diagnosis details:
        </Typography>
        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0
          ? <List sx={{ padding: '0 1em', listStyleType: 'disc' }}>
              {entry.diagnosisCodes.map((code, index) => (
                <ListItem
                  key={index}
                  sx={{
                    typography: 'body1',
                    display: 'list-item',
                    paddingLeft: '10px'
                  }}
                >
                  {code}: {getDiagnosisName(code)}
                </ListItem>
              ))}
            </List>
          : <Typography variant="body2" sx={{paddingLeft: '10px'}}>No details</Typography>
        }
        {entryDetails(entry)}
      </div>
      <div style={{ alignSelf: 'flex-end' }}>
        <Typography variant="body1">Diagnosed by {entry.specialist}</Typography>
      </div>
    </StyledPaper>
  );
};

export default EntryComponent
