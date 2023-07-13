import { createContext, useReducer, ReactNode } from 'react';

export enum NotificationStatus {
  Success = 'success',
  Error = 'error'
}

interface NotificationState {
  message: string | null;
  status: NotificationStatus | null;
}

type Action =
  | { type: 'SET_NOTIFICATION'; payload: { message: string; status: NotificationStatus } }
  | { type: 'CLEAR_NOTIFICATION' };

const initialState: NotificationState = { message: null, status: null };

type NotificationContextValues = [
  NotificationState | undefined,
  ((message: string, status: NotificationStatus) => void) | (() => void)
]

export const NotificationContext = createContext<NotificationContextValues>([undefined, () => {
  // This is a placeholder function that gets replaced by the actual function in the context provider.
}]);

const notificationReducer = (state: NotificationState, action: Action): NotificationState => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.payload.message, status: action.payload.status };
    case 'CLEAR_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

interface NotificationContextProviderProps {
  children: ReactNode;
}

export const NotificationContextProvider = ({ children }: NotificationContextProviderProps) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState);

  const showNotification = (message: string, status: NotificationStatus): void => {
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: { message, status } });

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={[notification, showNotification]}>
      {children}
    </NotificationContext.Provider>
  );
};
