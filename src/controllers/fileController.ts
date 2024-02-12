import { Request, Response } from "express";
import fs from "fs";

export const getAllFiles = (_: Request, res: Response) => {
  try {
    fs.readdir("files/", (err, files) => {
      const fileInfos: any[] = [];

      if (err) {
        res.status(500).json({
          message: "Something went wrong while reading files",
        });
      }

      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: `files/${file}`,
        });
      });

      res.status(200).json({
        file_count: fileInfos.length,
        files: fileInfos,
        message: "Files read successfully",
      });
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong while reading files",
    });
  }
};

export const addFile = (req: Request, res: Response) => {
  const fileName = req.file?.filename ?? "";

  try {
    if (!fileName) {
      res.status(400).json({
        message: "File not found",
      });
    }
    res.status(200).json({
      file_name: fileName,
      message: "File uploaded successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: `Something went wrong while uploading ${fileName}`,
    });
  }
};

export const getFile = (req: Request, res: Response) => {
  const fileName = req.params?.filename ?? "";

  try {
    fs.readdir("files/", (_, files) => {
      if (files.includes(fileName)) {
        res.status(200).json({
          file: {
            name: fileName,
            url: `files/${fileName}`,
          },
          message: "File found successfully",
        });
      } else {
        res.status(404).json({
          file: null,
          message: "File not found",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong while getting file",
    });
  }
};

export const deleteFile = (req: Request, res: Response) => {
  try {
    const fileName = req.params?.filename ?? "";

    fs.unlink(`files/${fileName}`, (err) => {
      if (err) {
        res.status(500).json({
          message: `Could not find ${fileName}`,
        });
      }

      res.status(200).json({
        message: "File deleted successfully",
        file: {
          name: fileName,
          url: `files/${fileName}`,
        },
      });
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong while deleting file",
    });
  }
};
