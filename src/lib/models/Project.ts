import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  suburb: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  images: string[];
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  suburb: { type: String, required: true },
  description: { type: String, required: true },
  beforeImage: { type: String, default: "" },
  afterImage: { type: String, default: "" },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
