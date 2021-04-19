import mongoose from 'mongoose';
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const CategorySchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
	userId: {
		type: String,
		required: true
	}
}, { timestamps: true },);

export default mongoose.model('Category', CategorySchema);