import ReactDOM from 'react-dom/client';
import { NotificationContextProvider } from './contexts/NotificationContext';
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './styles/MUITheme'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </ThemeProvider>
)
