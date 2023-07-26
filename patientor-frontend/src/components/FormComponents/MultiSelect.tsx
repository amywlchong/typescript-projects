import { InputLabel, Select, Box, Chip, FormControl } from '@mui/material';
import { customMarginTop } from '../../styles/styles';
import { ReactElement } from 'react';

interface Props<T extends { toString(): string }> {
  label: string;
  selectedOptions: T[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<T[]>>;
  menuItems: Array<ReactElement>;
}

const MultiSelect = <T extends { toString(): string }>({ label, selectedOptions, setSelectedOptions, menuItems }: Props<T>) => {

  return (
    <FormControl fullWidth sx={customMarginTop}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={selectedOptions}
        onChange={({ target }) => {
          const newSelected = target.value as T[];
          setSelectedOptions(newSelected);
        }}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value.toString()} label={value.toString()} />
            ))}
          </Box>
        )}
      >
        {menuItems}
      </Select>
    </FormControl>
  )
}

export default MultiSelect;
