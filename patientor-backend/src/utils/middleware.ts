import express from 'express';

export const errorHandler = (
  error: Error,
  _request: express.Request,
  response: express.Response,
  _next: express.NextFunction
) => {
  console.error(error.message);

  if (error.name === 'UserInputError') {
    return response.status(400).send(`Error: ${error.message}`);
  } else {
    return response.status(500).end();
  }
};
