const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "resumes/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e5);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploader = multer({
  storage: storage,
  fileFilter: (req, res, cb) => {
    const supportedFile = /pdf|docx/;
    const extension = path.extname(file.originalname);

    if (supportedFile.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a pdf or docx file"));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

module.exports = uploader;