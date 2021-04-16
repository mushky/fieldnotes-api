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
	source: {
		type: String,
		required: false
	},
	category: {
		type: String,
		required: false
	},
	tags: {
		type: String,
		required: false
	},
	userId: {
		type: String,
		required: true
	},
	categoryId: {
		type: String,
		required: false
	}
});

export default mongoose.model('Note', NoteSchema);