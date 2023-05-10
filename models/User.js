import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: String,
  password: String,
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }]
});

const User = model('User', userSchema);

export default User;
