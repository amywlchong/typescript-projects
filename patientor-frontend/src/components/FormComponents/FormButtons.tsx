import { Grid, Button } from '@mui/material';

interface Props {
  onCancel: () => void;
}

const FormButtons = ({ onCancel }: Props) => {
  return (
    <Grid container justifyContent="space-between">
    <Grid item>
      <Button
          variant="outlined"
          type="button"
          onClick={onCancel}
      >
          Cancel
      </Button>
    </Grid>
    <Grid item>
      <Button
          type="submit"
          variant="contained"
      >
          Add
      </Button>
    </Grid>
    </Grid>
  )
}

export default FormButtons
