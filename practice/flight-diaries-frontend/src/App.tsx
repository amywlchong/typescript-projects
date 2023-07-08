import axios from 'axios';
import { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { getAllDiaryEntries, createDiaryEntry } from "./diaryService";
import DiaryEntryForm from './components/DiaryEntryForm';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const data = await getAllDiaryEntries();
      setDiaryEntries(data);
    };

    fetchDiaryEntries();
  }, []);

  const createAndSetDiaryEntry = async (newDiaryEntry: NewDiaryEntry) => {
    try {
      const data: DiaryEntry = await createDiaryEntry(newDiaryEntry);
      setDiaryEntries(diaryEntries.concat(data));
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        setNotification(error.response.data);
      } else {
        setNotification("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <p style={{ color: 'red'}}>{notification}</p>
      <DiaryEntryForm createAndSetDiaryEntry={createAndSetDiaryEntry} />
      <div>
        <h2>Diary entries</h2>
          {diaryEntries.map(entry =>
            <div key={entry.id}>
              <h2>{entry.date}</h2>
              <p>visibility: {entry.visibility}</p>
              <p>weather: {entry.weather}</p>
            </div>
          )}
      </div>
    </div>
  )
}

export default App;
