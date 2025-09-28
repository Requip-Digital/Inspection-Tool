import mongoose, { Schema, Document } from 'mongoose';

// Field schema for dynamic form fields
const FieldSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  value: Schema.Types.Mixed,
  options: [Schema.Types.Mixed],
  validation: {
    min: Number,
    max: Number,
    message: String
  },
  required: Boolean
});

// Section schema for grouping fields
const SectionSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  fields: [FieldSchema]
});

// Machine interface
export interface IMachine extends Document {
  projectId: string;
  name: string;
  sheetNumber: number;
  template: string;
  sections: {
    id: string;
    name: string;
    fields: Array<{
      id: string;
      name: string;
      type: string;
      label: string;
      value: any;
      options?: any[];
      validation?: {
        min?: number;
        max?: number;
        message?: string;
      };
      required?: boolean;
    }>;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Machine schema
const MachineSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  sheetNumber: { type: Number, required: true },
  template: { type: String, required: true },
  sections: [SectionSchema]
}, { timestamps: true });

export default mongoose.model<IMachine>('Machine', MachineSchema); 