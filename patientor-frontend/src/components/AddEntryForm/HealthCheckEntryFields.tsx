import HealthRatingBar from "../HealthRatingBar";
import { Box } from "@mui/material";
import { customMarginTop } from "../../styles/styles";

interface Props {
  healthCheckRating: number | null;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number | null>>;
}

const HealthCheckEntryFields = ({
  healthCheckRating,
  setHealthCheckRating,
}: Props) => {
  return (
    <Box sx={customMarginTop}>
      <HealthRatingBar
        showText={false}
        rating={healthCheckRating}
        readOnly={false}
        setRating={setHealthCheckRating}
      />
    </Box>
  );
};

export default HealthCheckEntryFields;
