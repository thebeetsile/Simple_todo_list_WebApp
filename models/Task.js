import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: String,
  description: String,
  completed: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Task = model('Task', taskSchema);

export default Task;
