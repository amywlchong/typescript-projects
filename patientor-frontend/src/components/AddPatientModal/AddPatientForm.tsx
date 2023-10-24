import { useState, FormEvent } from 'react';

import {  TextField, SelectChangeEvent } from '@mui/material';
import { customMarginTop } from '../../styles/styles'

import FormButtons from '../FormComponents/FormButtons'
import SingleSelect from '../FormComponents/SingleSelect'

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
    if ( typeof event.target.value === 'string') {
      const value = event.target.value;
      const gender = Object.values(Gender).find(g => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  const addPatient = (event: FormEvent<HTMLFormElement>) => {
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
          sx={customMarginTop}
          label="ID card number"
          value={idCardNumber}
          onChange={({ target }) => setIDCardNumber(target.value)}
        />
        <TextField
          sx={customMarginTop}
          label="Date of birth"
          type="date"
          value={dateOfBirth}
          onChange={({ target }) => setDateOfBirth(target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={customMarginTop}
          label="Occupation"
          value={occupation}
          onChange={({ target }) => setOccupation(target.value)}
        />
        <SingleSelect
          options={genderOptions}
          label={'Gender'}
          selectedOption={gender}
          onOptionChange={onGenderChange}
        />

        <FormButtons onCancel={onCancel} />

      </form>
    </div>
  );
};

export default AddPatientForm;
