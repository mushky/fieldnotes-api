import mongoose from 'mongoose';
import Note from '../models/note';

// Get all Notes
export const getNotes = (req, res) => {
  try {
    paginationHelper(req, res, {}, "List of all paginated Notes")
  } catch(e) {
    res.status(500).json({ "message": e.message })
  }
}

// Get all notes from user
export const getNotesByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    paginationHelper(req, res, {userId}, `List of all notes by ${userId}`)
  } catch(e) {
    res.status(500).json({ "message": e.message })
  }
}

export const searchNotesByContent = async (req, res) => {
  const userId = req.query.userId;
  const content = req.query.content;

  try {
    paginationHelper(req, res, {userId, content: {$regex: content }}, `A list of notes with search term ${content}`)
  } catch(e) {
    res.status(500).json({ "message": e.message })
  }
}

export const getNotesByUserAndCategory = (req, res) => {
  const userId = req.query.userId;
  const category = req.query.category;

  try {
    paginationHelper(req, res, {userId, category: {$regex: category}}, `A list of all notes by ${category} and ${user}`)
  } catch(e) {
    res.status(500).json({ "message": e.message })
  }
}

// create new note
export const createNote = (req, res) => {
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
export const getNote = (req, res) => {
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
export const updateNote = (req, res) => {
  const id = req.params.noteId;
  const updateObject = req.body;
  Note.updateOne({ _id: id }, { $set:updateObject })
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
export const intoTrash = (req,res) => {
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
export const outOfTrash = (req,res) => {
  const id = req.params.noteId;

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
export const deleteNote = (req, res) => {
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

const paginationHelper = async(req, res, details, message) => {
  let page = parseInt(req.query.page)
  let size = parseInt(req.query.size)

  try {
    if (!page) {
      page = 1
    }
    if (!size) {
      size = 1
    }
  
    const limit = parseInt(size)
    const skip = (page - 1) * limit

    const startIndex = page - 1
    const endIndex = page * limit
    const results = {};
  
    results.results = await (await Note.find(details).limit(limit).skip(skip)).reverse()

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }

    if (endIndex < Note.length) {
      results.next = {
        page: parseInt(page) + 1,
        limit: limit
      }
    }

    res.status(200).json({
      results: {
        nextPage: results.next,
        prevPage: results.previous,
        success: true,
        message: `${message}`,
        notes: results.results
      }
    })
  } catch(e) {
    res.status(500).json({"message": e.message})
  }
} 