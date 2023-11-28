import { Autocomplete } from "@mui/material";
import { Chip, FormControl, TextField } from "@mui/material";
import { customMarginTop } from "../../styles/styles";

interface Props<T extends { toString(): string }> {
  label: string;
  options: T[];
  selectedOptions: T[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<T[]>>;
  getOptionLabel?: (option: T) => string;
}

const MultiSelect = <T extends { toString(): string }>({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
  getOptionLabel,
}: Props<T>) => {
  return (
    <FormControl fullWidth sx={customMarginTop}>
      <Autocomplete
        multiple
        value={selectedOptions}
        onChange={(_, newValue) => setSelectedOptions(newValue)}
        options={options}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={label} />
        )}
        renderTags={(value: T[]) =>
          value.map((option) => (
            <Chip key={option.toString()} label={option.toString()} />
          ))
        }
      />
    </FormControl>
  );
};

export default MultiSelect;
