import mongoose from "mongoose";

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/mediaserver"
);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const contentTypes = ["images", "video", "audio", "article"];

const contentSchema = new mongoose.Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const linkSchema = new mongoose.Schema({
  hash: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const User = mongoose.model("User", userSchema);
export const Link = mongoose.model("Link", linkSchema);
export const Content = mongoose.model("Content", contentSchema);
