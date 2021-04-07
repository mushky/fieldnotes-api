import mongoose from 'mongoose';
import Note from '../models/note';

// create new note
export function createNote(req, res) {
  const note = new Note({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
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

// Get all Notes
export function getNotes( res, req) {
  Note.find()
    .select('_id title description')
    .then((allCause) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all notes',
        Cause: allCause,
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

// Get Single Note
export function getNote(req, res) {
  const id = req.params.causeId;
  Note.findById(id)
    .then((note) => {
      res.status(200).json({
        success: true,
        message: `More on ${note.title}`,
        Cause: note,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This cause does not exist',
        error: err.message,
      });
		});
}

// update note
export function updateNote(req, res) {
  const id = req.params.causeId;
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
  const id = req.params.causeId;
  Cause.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
      success: true,
    }))
    .catch((err) => res.status(500).json({
      success: false,
    }));
}