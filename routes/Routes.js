import express from 'express';

import { 
  createNote, getNotes, searchNotesByContent, getNote, 
  updateNote, deleteNote, getNotesByUser, getNotesByUserAndCategory, 
  intoTrash, outOfTrash } from '../controllers/note_controller';

import { getCategories, getCategoriesByUserId, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/category_controller';
import { createUser, loginUser } from '../controllers/user_controller';

import verifyToken from '../middleware/verifytoken';

const router = express.Router();

// Notes
router.get('/notes/user/:userId', getNotesByUser);
router.get('/notes', getNotes);
router.get('/notes/search', searchNotesByContent)
router.get('/notes/category', getNotesByUserAndCategory)
router.get('/notes/:noteId', getNote);
router.post('/notes', verifyToken, createNote);
router.put('/notes/:noteId', verifyToken, updateNote);
router.put('/notes/intrash/:noteId', intoTrash);
router.put('/notes/outtrash/:noteId', outOfTrash);
router.delete('/notes/:noteId', verifyToken, deleteNote)

// Category
router.get('/categories/user/:userId', getCategoriesByUserId);
router.get('/categories', getCategories);
router.get('/category/:categoryId', getCategory);
router.post('/categories', createCategory);
router.put('/categories/:categoryId', updateCategory);
router.delete('/categories/:categoryId', deleteCategory)

// Users
router.post('/users/signup', createUser);
router.post('/users/login', loginUser);

export default router;