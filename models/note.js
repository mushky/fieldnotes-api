import mongoose from 'mongoose';
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const NoteSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
	userId: {
		type: String,
		required: true
	}
});

export default mongoose.model('Note', NoteSchema);