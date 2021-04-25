import mongoose from 'mongoose';
import Category from '../models/category';

// Get all Categories
export function getCategories(req, res) {
  Category.find()
    .select('_id name userId')
    .then((categories) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all categories',
        category: categories,
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

export function getCategoriesByUserId(req, res) {
	const userId = req.params.userId;
	Category.find({ userId: userId })
		.select('_id name userId')
		.then((categories) => {

			return res.status(200).json({
				success: true,
				message: 'A list of all categories by user',
				category: categories.reverse(),
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

// create new category
export function createCategory(req, res) {
  const category = new Category({
    _id: mongoose.Types.ObjectId(),
		name: req.body.name,
		userId: req.body.userId,
  });
  return category
    .save()
    .then((newCategory) => {
      return res.status(201).json({
        success: true,
        message: 'New category created successfully',
        category: newCategory,
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

// Get Single Category
export function getCategory(req, res) {
  const id = req.params.noteId;
  Category.findById(id)
    .then((category) => {
      res.status(200).json({
        success: true,
        message: `More on ${category.name}`,
        category: category,
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
export function updateCategory(req, res) {
  const id = req.params.categoryId;
  const updateObject = req.body;
  Category.update({ _id:id }, { $set:updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Category is updated',
        updateCategory: updateObject,
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
export function deleteCategory(req, res) {
  const id = req.params.categoryId;
  Category.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
      success: true,
    }))
    .catch((err) => res.status(500).json({
			error: err,
      success: false,
    }));
}