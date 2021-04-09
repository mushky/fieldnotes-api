import mongoose from 'mongoose';
import Note from '../models/note';
  
// Get all Notes
export function getNotes(req, res) {
  Note.find()
    .select('_id title content userId')
    .then((notes) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all notes',
        Note: notes,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
}

// Get all notes from user
export function getNotesByUser(req, res) {
	const userId = req.params.userId;
	Note.find({ userId: userId })
		.select('_id title content userId')
		.then((notes) => {
			return res.status(200).json({
				success: true,
				message: 'A list of all notes by user',
				Note: notes,
			});
		})
		.catch((err) => {
			res.status(500).json({
				success: false,
				message: 'Server error. Please try again.',
				error: err.message,
			});
		})
}

// create new note
export function createNote(req, res) {
  const note = new Note({
    _id: mongoose.Types.ObjectId(),
		userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
  });
  return note
    .save()
    .then((newNote) => {
      return res.status(201).json({
        success: true,
        message: 'New note created successfully',
        Note: newNote,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
}

// Get Single Note
export function getNote(req, res) {
  const id = req.params.noteId;
  Note.findById(id)
    .then((note) => {
      res.status(200).json({
        success: true,
        message: `More on ${note.title}`,
        Note: note,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This note does not exist',
        error: err.message,
      });
		});
}

// update note
export function updateNote(req, res) {
  const id = req.params.noteId;
  const updateObject = req.body;
  Note.update({ _id:id }, { $set:updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Note is updated',
        updateNote: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
}

// delete a note
export function deleteNote(req, res) {
  const id = req.params.noteId;
  Note.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
      success: true,
    }))
    .catch((err) => res.status(500).json({
      success: false,
    }));
}