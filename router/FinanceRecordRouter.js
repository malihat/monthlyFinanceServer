const express = require('express');
const path = require('path');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const FinanceRecordModel = require('../models/FinanceRecordModel');

const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// Multer setup
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${file.originalname}`);
//     }
//   });
// const upload = multer({ storage });

// Get the form 
router.get('/', async (req, res) => {
  try {
    const records = await FinanceRecordModel.find();
    return res.status(200).json(records);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message})
  }
})

// Create/Post the form
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const {date, store, amount, payment} = req.body;
        // const image = req.file ? req.file.filename : ''; 
        const image = req.file ? req.file.path : '';

        const newItem = {
          date,
          store, 
          amount, 
          payment,
          image
      }
    
      const savedItem = await FinanceRecordModel.create(newItem);
      console.log("This is the image: ", image)
      return res.status(201).send(savedItem);
    } catch (error) {
        res.status(500).json({error: 'Server error'})
        console.log('This is the Error: ', error.message)
    }
})

// Delete a route
// Route to delete
router.delete('/:newId', async (req, res) => {
  try {
      const {newId} = req.params;
      console.log(newId);
      const deletedItem = await FinanceRecordModel.findByIdAndDelete(newId);
      if (!deletedItem) {
          return res.status(404).json({ message: 'Record not found' });
      } else {
          return res.status(200).json({ message: 'Record deleted successfully' });
      }
  } catch (error) {
      console.log(error)
      res.status(500).send({message: error.message})
  }
})

module.exports = router;