import { useState, SyntheticEvent } from 'react';

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { PatientFormValues, Gender } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption{
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
  value: v, label: v.toString()
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [idCardNumber, setIDCardNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(Gender.Other);

  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === 'string') {
      const value = event.target.value;
      const gender = Object.values(Gender).find(g => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      occupation,
      idCardNumber,
      dateOfBirth,
      gender
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <TextField
          label="ID card number"
          value={idCardNumber}
          onChange={({ target }) => setIDCardNumber(target.value)}
        />
        <TextField
          sx={{ marginTop: '20px' }}
          label="Date of birth"
          type="date"
          value={dateOfBirth}
          onChange={({ target }) => setDateOfBirth(target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Occupation"
          value={occupation}
          onChange={({ target }) => setOccupation(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
        <Select
          label="Gender"
          value={gender}
          onChange={onGenderChange}
        >
        {genderOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>

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
      </form>
    </div>
  );
};

export default AddPatientForm;
