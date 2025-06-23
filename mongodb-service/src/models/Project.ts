import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectDetails {
  inspectionDate?: Date;
  city: string;
  originallyBought: 'New' | 'Used' | 'Refurbished';
  nearestAirport: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  millName?: string;
  country?: string;
  delivery?: string;
  askingPrice?: string;
  noOfMachines: number;
}

export interface IMachineForPDF {
  id: string;
  name: string;
  sections: Array<{
    id: string;
    name: string;
    fields: Array<{
      id: string;
      name: string;
      type: string;
      label: string;
      value: any;
    }>;
  }>;
}

export interface IProject extends Document {
  name: string;
  templateId: string;
  userId: string;
  details: IProjectDetails;
  machines: IMachineForPDF[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectDetailsSchema = new Schema({
  inspectionDate: { type: Date },
  city: { type: String, required: true },
  originallyBought: { 
    type: String, 
    required: true,
    enum: ['New', 'Used', 'Refurbished']
  },
  nearestAirport: { type: String, required: true },
  condition: { 
    type: String, 
    required: true,
    enum: ['Excellent', 'Good', 'Fair', 'Poor']
  },
  millName: String,
  country: String,
  delivery: String,
  askingPrice: String,
  noOfMachines: { type: Number, required: true }
});

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  templateId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  details: { type: ProjectDetailsSchema, required: true },
  machines: [{
    id: { type: Schema.Types.ObjectId, ref: 'Machine' },
    name: { type: String },
    sections: [{
      id: { type: Schema.Types.ObjectId, ref: 'Section' },
      name: { type: String },
      fields: [{
        id: { type: Schema.Types.ObjectId, ref: 'Field' },
        name: { type: String },
        type: { type: String },
        label: { type: String },
        value: { type: Schema.Types.Mixed }
      }]
    }]
  }]
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema); 