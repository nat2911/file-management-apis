"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.getFile = exports.addFile = exports.getAllFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const getAllFiles = (_, res) => {
    try {
        fs_1.default.readdir("files/", (err, files) => {
            const fileInfos = [];
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
    }
    catch (err) {
        res.status(500).json({
            message: "Something went wrong while reading files",
        });
    }
};
exports.getAllFiles = getAllFiles;
const addFile = (req, res) => {
    var _a, _b;
    const fileName = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : "";
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
    }
    catch (err) {
        res.status(500).json({
            message: `Something went wrong while uploading ${fileName}`,
        });
    }
};
exports.addFile = addFile;
const getFile = (req, res) => {
    var _a, _b;
    const fileName = (_b = (_a = req.params) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : "";
    try {
        fs_1.default.readdir("files/", (_, files) => {
            if (files.includes(fileName)) {
                res.status(200).json({
                    file: {
                        name: fileName,
                        url: `files/${fileName}`,
                    },
                    message: "File found successfully",
                });
            }
            else {
                res.status(404).json({
                    file: null,
                    message: "File not found",
                });
            }
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Something went wrong while getting file",
        });
    }
};
exports.getFile = getFile;
const deleteFile = (req, res) => {
    var _a, _b;
    try {
        const fileName = (_b = (_a = req.params) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : "";
        fs_1.default.unlink(`files/${fileName}`, (err) => {
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
    }
    catch (err) {
        res.status(500).json({
            message: "Something went wrong while deleting file",
        });
    }
};
exports.deleteFile = deleteFile;
