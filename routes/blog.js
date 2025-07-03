const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const BlogControllers = require('../controllers/BlogControllers');
const auth = require('../middleware/auth');
const { USER_ROLE } = require('../constants');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const multerUpload = multer({ storage });

// PUT /blog/:id - Update blog with optional file upload
router.put(
  '/:id',
  multerUpload.single('file'),
  (req, res, next) => {
    if (req.file) {
      req.body = {
        ...JSON.parse(req.body.data),
        coverImage: req.file.path,
      };
    } else {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  auth(USER_ROLE.admin),
  BlogControllers.updateBlog,
);

module.exports = router; 