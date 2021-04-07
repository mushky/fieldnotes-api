import express from 'express';
import { createNote, getNotes, getNote, updateNote, deleteNote } from '../controllers/note_controller';

const router = express.Router();

router.post('/notes', createNote);
router.get('/notes', getNotes);
router.get('/notes/:noteId', getNote);
router.patch('/notes/:noteId', updateNote);
router.delete('/notes/:noteId', deleteNote)

export default router;