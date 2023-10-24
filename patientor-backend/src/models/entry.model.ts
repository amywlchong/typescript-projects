import { Schema, ObjectId, model } from 'mongoose';
import { SickLeave, Discharge, EntryType, HealthCheckRating } from '../types';

class BaseEntrySchemaClass extends Schema {
  constructor(options?: Record<string, unknown>) {
    super({
      description: { type: String, required: true },
      date: { type: Date, required: true },
      specialist: { type: String, required: true },
      diagnosisCodes: [{ type: String, ref: 'Diagnosis' }], // codes from diagnosis schema
      type: {
        type: String,
        enum: Object.values(EntryType),
        required: true
      },
      ...options
    },
    {
      toJSON: {
        transform: (_document, returnedObject) => {
          const returnedObjId = returnedObject._id as ObjectId;
          returnedObject.id = returnedObjId.toString();
          delete returnedObject._id;
          delete returnedObject.__v;
        }
      }
    });
  }
}

const SickLeaveSchema = new Schema<SickLeave>({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
}, {
  _id: false
});

const DischargeSchema = new Schema<Discharge>({
  date: { type: Date, required: true },
  criteria: { type: String, required: true },
}, {
  _id: false
});

export const EntryModel = model('Entry', new BaseEntrySchemaClass());

const HospitalEntrySchema = new BaseEntrySchemaClass({
  type: {
    type: String,
    enum: [EntryType.Hospital],
    required: true
  },
  discharge: {
    type: DischargeSchema,
    required: true
  }
});

const OccupationalHealthcareEntrySchema = new BaseEntrySchemaClass({
  type: {
    type: String,
    enum: [EntryType.OccupationalHealthcare],
    required: true
  },
  employerName: { type: String, required: true },
  sickLeave: SickLeaveSchema
});

const HealthCheckEntrySchema = new BaseEntrySchemaClass({
  type: {
    type: String,
    enum: [EntryType.HealthCheck],
    required: true
  },
  healthCheckRating: {
    type: Number,
    enum: HealthCheckRating,
    required: true
  }
});

export const HospitalEntry = EntryModel.discriminator(EntryType.Hospital, HospitalEntrySchema);
export const OccupationalHealthcareEntry = EntryModel.discriminator(EntryType.OccupationalHealthcare, OccupationalHealthcareEntrySchema);
export const HealthCheckEntry = EntryModel.discriminator(EntryType.HealthCheck, HealthCheckEntrySchema);
