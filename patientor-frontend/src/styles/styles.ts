import { Paper, List, ListItem, Theme, Rating } from '@mui/material';
import { styled } from '@mui/system';

export const customMarginTop = {
  marginTop: '1em',
};

export const customMarginBottom = {
  marginBottom: '1em',
};

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

export const StyledList = styled(List)(() => ({
  padding: '0 16px',
  listStyleType: 'disc'
}))

export const StyledListItem = styled(ListItem)(({ theme }: { theme?: Theme }) => ({
  ...theme?.typography.body1,
  display: 'list-item',
  paddingLeft: '10px'
}));

export const StyledRating = styled(Rating)({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  }
});
