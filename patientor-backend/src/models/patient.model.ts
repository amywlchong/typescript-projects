import mongoose, { Schema, ObjectId } from "mongoose";
import { Gender, Patient } from "../types";

const PatientSchema = new Schema<Patient>(
  {
    name: { type: String, required: true },
    dateOfBirth: Date,
    idCardNumber: String,
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },
    occupation: { type: String, required: true },
    entries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entry",
      },
    ],
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

export const PatientModel = mongoose.model<Patient>("Patient", PatientSchema);
