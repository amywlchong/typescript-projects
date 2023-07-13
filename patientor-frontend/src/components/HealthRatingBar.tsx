import { Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';

import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

type BarProps = {
  rating: number;
  showText: boolean;
};

const StyledRating = styled(Rating)({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  }
});

const HEALTHBAR_TEXTS = [
  'The patient is in great shape',
  'The patient has a low risk of getting sick',
  'The patient has a high risk of getting sick',
  'The patient has a diagnosed condition',
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  return (
    <Box className="health-bar" sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start'
    }}>
      <Typography variant="body1">Health check rating: </Typography>
      <StyledRating
        readOnly
        value={4 - rating}
        max={4}
        icon={<Favorite fontSize="inherit" />}
      />

      {showText ? <Typography variant="body1">{HEALTHBAR_TEXTS[rating]}</Typography> : null}
    </Box>
  );
};

export default HealthRatingBar;
