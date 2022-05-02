import express from "express";
import multer from "multer";
import experienceSchema from "./experienceModal.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const experienceRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryUload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: { folder: "Linkedin-Profiles_images" },
  }),
}).single("image");

//----------------------------------------------------------------CRUD

experienceRouter.get("/", async (req, res, next) => {
  try {
    const experience = await experienceSchema.find();
    res.status(200).send(experience);
  } catch (error) {
    next(error);
  }
});
experienceRouter.get("/:id", async (req, res, next) => {
  try {
    const experience = await experienceSchema.findById(req.params.id);
    res.status(200).send(experience);
  } catch (error) {
    next(error);
  }
});
experienceRouter.post("/", cloudinaryUload, async (req, res, next) => {
  try {
    const newExperience = await new experienceSchema(req.body);
    const { _id } = await newExperience.save();

    res.status(201).send(newExperience);
  } catch (error) {
    next(error);
  }
});
experienceRouter.put("/:id", async (req, res, next) => {
  try {
    const experienceUpdate = await experienceSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(202).send(experienceUpdate);
  } catch (error) {
    next(error);
  }
});
experienceRouter.delete("/:id", async (req, res, next) => {
  try {
    await experienceSchema.findByIdAndDelete(req.params.id);
    res.status(204).send(`product ${req.params.id} deleted`);
  } catch (error) {
    next(error);
  }
});

experienceRouter.post("/test", cloudinaryUload, async (req, res, next) => {
  try {
    console.log("uploaded");
    res.status(200);
  } catch (error) {
    console.log("not uploaded");
  }
});
export default experienceRouter;
