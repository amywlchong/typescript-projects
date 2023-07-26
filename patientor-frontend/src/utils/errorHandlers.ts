import axios from 'axios';

export const handleError = (error: unknown, defaultMessage = 'An error occurred', notFoundMessage = 'Not found'): string => {

  if (axios.isAxiosError(error)) {

    if (error.response?.status === 404) {
      return notFoundMessage;
    }

    else if (error.response?.data && typeof error.response.data === 'string') {
      const message = error.response.data;
      console.error(message);
      return message;
    }

    else {
      console.error('Unrecognized axios error', error);
      return defaultMessage;
    }

  } else {
    console.error('Unknown error', error);
    return defaultMessage;
  }
}
