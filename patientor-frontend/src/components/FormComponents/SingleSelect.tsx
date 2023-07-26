import { SelectChangeEvent } from '@mui/material';
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { customMarginTop } from '../../styles/styles';

interface Option<T extends { toString(): string }> {
  label: string;
  value: T;
}

interface Props<T extends { toString(): string }> {
  options: Array<Option<T>>;
  label: string;
  selectedOption: T | null;
  onOptionChange: (event: SelectChangeEvent<T>) => void;
}

const SingleSelect = <T extends { toString(): string }>({ options, label, selectedOption, onOptionChange }: Props<T>) => {
  return (
    <FormControl fullWidth sx={customMarginTop}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={selectedOption || ''}
        onChange={onOptionChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value.toString()} value={option.value.toString()}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SingleSelect;
