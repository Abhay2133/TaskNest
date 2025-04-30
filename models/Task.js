import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  scheduledDate: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  important: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },

}, { timestamps: true });

export default mongoose.models.Task || mongoose.model('Task', taskSchema);