"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileRoutes_1 = require("./routes/fileRoutes");
const app = (0, express_1.default)();
app.use("/api/v1/files", fileRoutes_1.router);
app.listen(3000, () => {
    console.log("Listening on port 3000 ...");
});
