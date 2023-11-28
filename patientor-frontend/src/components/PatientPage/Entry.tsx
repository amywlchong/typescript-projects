import { Entry, EntryType, Diagnosis } from "../../types";
import { formatDate, getDiagnosisName } from "../../utils/dataProcessing";
import { assertNever } from "../../utils/typeUtils";

import HealthRatingBar from "../HealthRatingBar";

import { Typography } from "@mui/material";
import { StyledPaper, StyledList, StyledListItem } from "../../styles/styles";

interface Props {
  entry: Entry;
  diagnosisDescriptions: Diagnosis[];
}

const EntryComponent = ({ entry, diagnosisDescriptions }: Props) => {
  const descriptionStyles = { fontStyle: "italic" };
  const noDetailsStyles = { paddingLeft: "10px" };
  const specialistStyles = { alignSelf: "flex-end" };

  const entryDetails = (entry: Entry) => {
    switch (entry.type) {
      case EntryType.Hospital:
        return (
          <Typography variant="body1">
            Discharged on {formatDate(entry.discharge.date)}:{" "}
            {entry.discharge.criteria}
          </Typography>
        );
      case EntryType.OccupationalHealthcare:
        return (
          <Typography variant="body1">
            {entry.sickLeave
              ? `Sick leave from ${formatDate(
                  entry.sickLeave.startDate
                )} to ${formatDate(entry.sickLeave.endDate)}. `
              : ""}{" "}
            Employer name: {entry.employerName}.
          </Typography>
        );
      case EntryType.HealthCheck:
        return (
          <HealthRatingBar
            showText={false}
            rating={entry.healthCheckRating}
            readOnly={true}
          />
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <StyledPaper>
      <div>
        <Typography variant="body1">Date: {formatDate(entry.date)}</Typography>
        <Typography variant="body1" sx={descriptionStyles}>
          Description: {entry.description}
        </Typography>
        <Typography variant="body1">Diagnosis details:</Typography>
        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
          <StyledList>
            {entry.diagnosisCodes.map((code) => (
              <StyledListItem key={code}>
                {code}: {getDiagnosisName(code, diagnosisDescriptions)}
              </StyledListItem>
            ))}
          </StyledList>
        ) : (
          <Typography variant="body2" sx={noDetailsStyles}>
            No details
          </Typography>
        )}
        {entryDetails(entry)}
      </div>
      <div style={specialistStyles}>
        <Typography variant="body1">Diagnosed by {entry.specialist}</Typography>
      </div>
    </StyledPaper>
  );
};

export default EntryComponent;
