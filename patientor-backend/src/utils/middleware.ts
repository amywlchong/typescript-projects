import express from "express";
import UserInputError from "../errors/UserInputError";

export const errorHandler = (
  error: Error,
  _request: express.Request,
  response: express.Response,
  _next: express.NextFunction
) => {
  console.error(error.message);

  if (error instanceof UserInputError) {
    return response.status(400).json({ error: error.message });
  } else {
    return response.status(500).end();
  }
};
