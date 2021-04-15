import express from 'express';
import { createNote, getNotes, getNote, updateNote, deleteNote, getNotesByUser } from '../controllers/note_controller';
import { createUser, loginUser } from '../controllers/user_controller';
import verifyToken from '../middleware/verifytoken';

const router = express.Router();

router.get('/notes/user/:userId', getNotesByUser);

router.post('/notes', verifyToken, createNote);
router.get('/notes', getNotes);
router.get('/notes/:noteId', getNote);

router.put('/notes/:noteId', verifyToken, updateNote);
router.delete('/notes/:noteId', verifyToken, deleteNote)

router.post('/user/signup', createUser);
router.post('/users/login', loginUser);

export default router;