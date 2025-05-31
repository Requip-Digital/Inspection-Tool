import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectDetails {
  inspectionDate?: Date;
  city: string;
  originallyBought: 'New' | 'Used' | 'Refurbished';
  mfgOrigin: string;
  nearestAirport: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  millName?: string;
  country?: string;
  inspectedByDate?: Date;
  delivery?: string;
  askingPrice?: string;
}

export interface IProject extends Document {
  name: string;
  templateId: string;
  details: IProjectDetails;
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
  mfgOrigin: { type: String, required: true },
  nearestAirport: { type: String, required: true },
  condition: { 
    type: String, 
    required: true,
    enum: ['Excellent', 'Good', 'Fair', 'Poor']
  },
  millName: String,
  country: String,
  inspectedByDate: Date,
  delivery: String,
  askingPrice: String
});

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  templateId: { type: String, required: true },
  details: { type: ProjectDetailsSchema, required: true },
  machines: [{ type: Schema.Types.ObjectId, ref: 'Machine' }]
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema); 