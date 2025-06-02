import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Book from '../models/Book.js';
import { authenticate, isAdmin } from '../middelware/auth.js';

const router = express.Router();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
const booksDir = path.join(uploadsDir, 'books');
const coversDir = path.join(uploadsDir, 'covers');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(booksDir)) {
  fs.mkdirSync(booksDir);
}
if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'coverImage') {
      cb(null, coversDir);
    } else if (file.fieldname === 'bookFile') {
      cb(null, booksDir);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// File filter for uploads
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'coverImage') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for cover images!'), false);
    }
  } else if (file.fieldname === 'bookFile') {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for books!'), false);
    }
  } else {
    cb(new Error('Unexpected field name!'), false);
  }
};

// Set up multer upload
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB max file size
  }
});

// Handle multiple file uploads
const uploadFiles = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'bookFile', maxCount: 1 }
]);

// @route   GET /api/books
// @desc    Get all books
// @access  Public
router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'name email');
    
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// @route   GET /api/books/:id
// @desc    Get a book by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('uploadedBy', 'name email');
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// @route   POST /api/books
// @desc    Create a new book
// @access  Private/Admin
router.post('/', authenticate, isAdmin, (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, async (req, res) => {
  const { title, author, description, genre, coverImage } = req.body;

  if (!title || !genre) {
    return res.status(400).json({ error: 'Title and genre are required' });
  }

  const bookFile = req.files && req.files.bookFile ? req.files.bookFile[0] : null;
  if (!bookFile) {
    return res.status(400).json({ error: 'Book file is required' });
  }

  let coverImageUrl = null;
  if (req.files && req.files.coverImage && req.files.coverImage.length > 0) {
    coverImageUrl = `/uploads/covers/${path.basename(req.files.coverImage[0].path)}`;
  } else if (coverImage && typeof coverImage === 'string' && coverImage.startsWith('http')) {
    coverImageUrl = coverImage;
  }

  const newBook = new Book({
    title,
    author,
    description,
    genre,
    coverImage: coverImageUrl,
    fileUrl: `/uploads/books/${path.basename(bookFile.path)}`,
    uploadedBy: req.user._id,
  });

  await newBook.save();

  res.status(201).json(newBook);
});


// @route   DELETE /api/books/:id
// @desc    Delete a book
// @access  Private/Admin
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    // Delete files from server
    if (book.coverImage) {
      const coverPath = path.join(__dirname, '..', book.coverImage);
      if (fs.existsSync(coverPath)) {
        fs.unlinkSync(coverPath);
      }
    }
    
    if (book.fileUrl) {
      const filePath = path.join(__dirname, '..', book.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    // Delete book from database
    await Book.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Book deletion error:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

export default router;