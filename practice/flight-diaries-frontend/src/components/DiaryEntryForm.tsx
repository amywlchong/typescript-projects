import React from 'react';
import { useField } from '../hooks/useField';
import { Weather, Visibility, NewDiaryEntry } from '../types';

interface DiaryEntryFormProps {
  createAndSetDiaryEntry: (newDiaryEntry: NewDiaryEntry) => Promise<void>;
}

const DiaryEntryForm = ({ createAndSetDiaryEntry }: DiaryEntryFormProps) => {
  const newDate = useField('date');
  const newVisibility = useField('text');
  const newWeather = useField('text');
  const newComment = useField('text');

  const visibilityOptions = Object.values(Visibility);
  const weatherOptions = Object.values(Weather);

  const diaryEntryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiaryEntry = {
      date: newDate.value,
      weather: newWeather.value,
      visibility: newVisibility.value,
      comment: newComment.value
    }

    await createAndSetDiaryEntry(newDiaryEntry);

    newDate.clear();
    newVisibility.clear();
    newWeather.clear();
    newComment.clear();
  };

  return (
    <form onSubmit={diaryEntryCreation}>
      <h2>Add a new entry</h2>
      <div>
        <label>Date:</label>
        <input
          type={newDate.type}
          value={newDate.value}
          onChange={newDate.onChange}
        />
      </div>
      <div>
        <label>Visibility:</label>
        {
          visibilityOptions.map(option => (
            <React.Fragment key={option}>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value={option}
                  checked={newVisibility.value === option}
                  onChange={newVisibility.onChange}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            </React.Fragment>
          ))
        }
      </div>
      <div>
        <label>Weather:</label>
        {
          weatherOptions.map(option => (
            <React.Fragment key={option}>
              <label>
                <input
                  type="radio"
                  name="weather"
                  value={option}
                  checked={newWeather.value === option}
                  onChange={newWeather.onChange}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            </React.Fragment>
          ))
        }
      </div>
      <div>
        <label>Comment:</label>
        <input
          type={newComment.type}
          value={newComment.value}
          onChange={newComment.onChange}
        />
      </div>
      <button type='submit'>add</button>
    </form>
  );
}

export default DiaryEntryForm;
