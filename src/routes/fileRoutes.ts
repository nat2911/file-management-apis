import express from "express";
import multer from "multer";
import {
  addFile,
  deleteFile,
  getAllFiles,
  getFile,
} from "../controllers/fileController";

const diskStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "files/");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: diskStorage });

export const router = express.Router();

router.route("/").get(getAllFiles).post(upload.single("file"), addFile);

router.route("/:filename").get(getFile).delete(deleteFile);
