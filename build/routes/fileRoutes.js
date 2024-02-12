"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fileController_1 = require("../controllers/fileController");
const diskStorage = multer_1.default.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "files/");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: diskStorage });
exports.router = express_1.default.Router();
exports.router.route("/").get(fileController_1.getAllFiles).post(upload.single("file"), fileController_1.addFile);
exports.router.route("/:filename").get(fileController_1.getFile).delete(fileController_1.deleteFile);
