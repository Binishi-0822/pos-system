import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Measurement = mongoose.model("Measurement", measurementSchema);

export default Measurement;
