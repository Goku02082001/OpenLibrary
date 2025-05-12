import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Book from '../models/Book.js';
import { authenticate, isAdmin } from '../middelware/auth.js';

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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


const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, 
  }
});


const uploadFiles = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'bookFile', maxCount: 1 }
]);


router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    
    
    const formattedBooks = books.map(book => ({
      _id: book._id,
      title: book.title,
      author: book.author,
      description: book.description,
      genre: book.genre,
      coverImage: book.coverImage,
      fileUrl: book.fileUrl,
      uploadedBy: book.uploadedBy,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    }));
    
    res.json(formattedBooks);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json({
      _id: book._id,
      title: book.title,
      author: book.author,
      description: book.description,
      genre: book.genre,
      coverImage: book.coverImage,
      fileUrl: book.fileUrl,
      uploadedBy: book.uploadedBy,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});


router.post('/', authenticate, isAdmin, (req, res) => {
  uploadFiles(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: err.message });
    }
    
    try {
      const { title, author, description, genre } = req.body;
      
      if (!title || !genre) {
        return res.status(400).json({ error: 'Title and genre are required' });
      }
      
      const bookFile = req.files.bookFile ? req.files.bookFile[0] : null;
      const coverImage = req.files.coverImage ? req.files.coverImage[0] : null;
      
      if (!bookFile) {
        return res.status(400).json({ error: 'Book file is required' });
      }
      
     
      const newBook = new Book({
        title,
        author,
        description,
        genre,
        coverImage: coverImage ? `/uploads/covers/${path.basename(coverImage.path)}` : null,
        fileUrl: `/uploads/books/${path.basename(bookFile.path)}`,
        uploadedBy: req.user._id,
      });
      
      await newBook.save();
      
      res.status(201).json({
        _id: newBook._id,
        title: newBook.title,
        author: newBook.author,
        description: newBook.description,
        genre: newBook.genre,
        coverImage: newBook.coverImage,
        fileUrl: newBook.fileUrl,
        uploadedBy: newBook.uploadedBy,
        createdAt: newBook.createdAt,
        updatedAt: newBook.updatedAt,
      });
    } catch (error) {
      console.error('Book creation error:', error);
      res.status(500).json({ error: 'Failed to create book' });
    }
  });
});


router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
   
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
    
   
    await Book.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Book deletion error:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

export default router;