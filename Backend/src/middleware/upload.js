const multer = require('multer');

// Keep the file in memory (NOT on disk). Render's free tier wipes the disk on
// every redeploy/sleep, so the image is saved in the database instead.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpeg, png, webp, gif)'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB (frontend shrinks images first)
});

module.exports = upload;
