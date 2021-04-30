import mongoose from 'mongoose';
import Note from '../models/note';

// Get all Notes
export function getNotes(req, res) {
  Note.find()
    .select('_id title content link category tags userId')
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
		.select('_id title content link category tags userId, isTrash')
		.then((notes) => {
			return res.status(200).json({
				success: true,
				message: 'A list of all notes by user',
				Note: notes.reverse(),
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

export function searchNotesByContent(req, res) {
  const userId = req.query.userId;
  const content = req.query.content;
  console.log(content);
  console.log(userId);
  Note.find({content: {$regex: content }}) // $options: 'i'
    .select('_id title content link category tags userId')
    .then((notes) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all notes by search criteria',
        Note: notes,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err
      })
    })
}

export function getNotesByUserAndCategory(req, res) {
  const userId = req.query.userId;
  const category = req.query.category;

  console.log(userId);
  console.log(category);

  Note.find({category: {$regex: category}})
    .select('_id title content link category tags userId')
    .then((notes) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all notes by category and user',
        Note: notes,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again',
        error: err
      })
    })

}

// create new note
export function createNote(req, res) {
  console.log(req);
  const note = new Note({
    _id: mongoose.Types.ObjectId(),
		userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    source: req.body.source,
		category: req.body.category,
		tags: req.body.tags,
    isTrash: false
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
  Note.update({ _id: id }, { $set:updateObject })
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

// Sets note isTrash to true
export function intoTrash(req,res) {
  const id = req.params.noteId;

  Note.updateOne({ _id: id}, { $set: {isTrash: true} })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Note is IN the trash',
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
}

// Sets note isTrash to false
export function outOfTrash(req,res) {
  const id = req.params.noteId;
  const updateObject = req.body;

  Note.updateOne({ _id: id}, { $set: {isTrash: false} })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Note is OUT of the trash',
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
      error: err,
      success: false,
    }));
}