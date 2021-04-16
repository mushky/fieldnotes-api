import express from 'express';

import { createNote, getNotes, getNote, updateNote, deleteNote, getNotesByUser } from '../controllers/note_controller';
import { createUser, loginUser } from '../controllers/user_controller';
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/category_controller';

import verifyToken from '../middleware/verifytoken';

const router = express.Router();

// Notes
router.get('/notes/user/:userId', getNotesByUser);
router.post('/notes', verifyToken, createNote);
router.get('/notes', getNotes);
router.get('/notes/:noteId', getNote);
router.put('/notes/:noteId', verifyToken, updateNote);
router.delete('/notes/:noteId', verifyToken, deleteNote)

// Category
router.get('/categories', getCategories);
router.get('/category/:categoryId', getCategory);
router.post('/categories', createCategory);
router.put('/categories/:categoryId', updateCategory);
router.delete('/categories/:categoryId', deleteCategory)

// Users
router.post('/user/signup', createUser);
router.post('/users/login', loginUser);

export default router;