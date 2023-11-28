import { TextField } from "@mui/material";
import { customMarginTop } from "../../styles/styles";

interface Props {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  criteria: string;
  setCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalEntryFields = ({
  date,
  setDate,
  criteria,
  setCriteria,
}: Props) => {
  return (
    <>
      <TextField
        sx={customMarginTop}
        label="Discharge date"
        type="date"
        value={date}
        onChange={({ target }) => setDate(target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        sx={customMarginTop}
        label="Discharge criteria"
        value={criteria}
        onChange={({ target }) => setCriteria(target.value)}
      />
    </>
  );
};

export default HospitalEntryFields;
