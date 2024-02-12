import express from "express";
import { router as filesRouter } from "./routes/fileRoutes";

const app = express();

app.use("/api/v1/files", filesRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000 ...");
});
