import { MONGODB_URI, PORT } from "./utils/config";
import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnosisRoutes";
import patientRouter from "./routes/patientRoutes";
import { errorHandler } from "./utils/middleware";
import mongoose from "mongoose";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

mongoose.set("strictQuery", false);

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is undefined");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosisRouter);

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
