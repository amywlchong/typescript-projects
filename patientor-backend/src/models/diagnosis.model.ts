import mongoose, { Schema, ObjectId } from "mongoose";
import { Diagnosis } from "../types";

const diagnosisSchema = new Schema<Diagnosis>(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    latin: { type: String },
  },
  {
    toJSON: {
      transform: (_document, returnedObject) => {
        const returnedObjId = returnedObject._id as ObjectId;
        returnedObject.id = returnedObjId.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  }
);

export const DiagnosisModel = mongoose.model<Diagnosis>(
  "Diagnosis",
  diagnosisSchema
);
