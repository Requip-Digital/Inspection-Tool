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
}

export interface IProject extends Document {
  name: string;
  templateId: string;
  details: IProjectDetails;
  machines: Array<{ id: string; name: string }>;
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
  askingPrice: String
});

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  templateId: { type: String, required: true },
  details: { type: ProjectDetailsSchema, required: true },
  machines: [{
    id: { type: Schema.Types.ObjectId, ref: 'Machine' },
    name: { type: String }
  }]
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema); 