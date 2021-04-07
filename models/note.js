import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const noteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Note', noteSchema);