import mongoose from 'mongoose';
const NoteSchema = require('./note');
const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowerCase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowerCase: true,
    match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?      ^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/],
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', UserSchema);