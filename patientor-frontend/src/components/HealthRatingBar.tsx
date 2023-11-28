import { Favorite } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";
import { StyledRating } from "../styles/styles";

type BarProps = {
  rating: number | null;
  showText: boolean;
  readOnly: boolean;
  setRating?: React.Dispatch<React.SetStateAction<number | null>>;
};

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar = ({
  rating,
  showText,
  readOnly,
  setRating,
}: BarProps) => {
  const healthBarBoxStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
  };

  return (
    <Box className="health-bar" sx={healthBarBoxStyles}>
      <Typography variant="body1">Health check rating: </Typography>
      <StyledRating
        readOnly={readOnly}
        value={rating !== null ? 4 - rating : null}
        max={4}
        icon={<Favorite fontSize="inherit" />}
        onChange={
          setRating
            ? (_event, newValue) => setRating(newValue ? 4 - newValue : null)
            : undefined
        }
      />
      {showText && !!rating ? (
        <Typography variant="body1">{HEALTHBAR_TEXTS[rating]}</Typography>
      ) : null}
    </Box>
  );
};

export default HealthRatingBar;
