import express from "express";
import { avatarUpload } from "../controllers/user.controller.js";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config();

// init multer with storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.env.MEDIA_BASE_URL}/images/profile`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// add some validation
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2000000, // bytes, here it is 2mb
  },
  fileFilter: (req, file, cb) => {
    checkImgFileType(file, cb);
  },
});

const checkImgFileType = (file, cb) => {
  // allowed file types
  const fileTypes = /\.jpeg|\.jpg|\.png|\.svg|\.webp/;
  // check extension names
  const extName = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;
  if (
    (fileTypes.test(extName) &&
      (mimeType === "image/jpeg" ||
        mimeType === "image/png" ||
        mimeType === "image/svg")) ||
    mimeType === "image/webp"
  ) {
    return cb(null, true);
  } else {
    cb(new Error("Error, You can only upload images!"));
  }
};

// **** Here the verifytoken, must be implemented in future *****
// **** Images will be stored on firebase, for now i am using my local for storing and learning *****
router.post("/avatar/:id", upload.single("avatar"), avatarUpload);

export default router;
