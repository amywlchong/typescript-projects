import { Grid, Button } from "@mui/material";
import { customMarginTop } from "../../styles/styles";

interface Props {
  onCancel: () => void;
}

const FormButtons = ({ onCancel }: Props) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Button
          sx={customMarginTop}
          variant="outlined"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button sx={customMarginTop} type="submit" variant="contained">
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormButtons;
