import express from "express";
import profile from "./profileModal.js";
import createError from "http-errors";
import generateUserPdfReadableStream from "../libs/pdfTools.js";
import {pipeline} from "stream"

const profileRouter = express.Router();

profileRouter.get("/:userId", async (req, res, next) => {
  try {
    const users = await profile.findById(req.params.userId);
    if (users) {
      res.send(users);
    } else {
      next(createError(400, `profile with id ${req.params.userId}  not found`));
    }
  } catch (error) {
    next(error);
  }
});

profileRouter.get("/", async (req, res, next) => {
  try {
    const users = await profile.find();
    if (users) {
      res.send(users);
    }
  } catch (error) {
    next(createError(400, "profiles not found"));
  }
});

profileRouter.post("/", async (req, res, next) => {
  try {
    let image;
    if (req.body.image) {
      image = req.body.image;
    } else {
      image =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVKTCvhbnqwyIbeN8eZAzlzb9s9d6LBnNWsw&usqp=CAU"; // template
    }

    let post = { ...req.body, ...{ image } }; //image:image = image
    console.log(post);
    const newUser = new profile(post); // here it happens the validation of req.body, if it is not ok Mongoose will throw an error (if it is ok it is NOT saved in db yet)

    const { _id, name } = await newUser.save(); // --> {_id: 123io12j3oi21j, firstName: "aoidjoasijdo"}
    res.status(201).send({ _id });
  } catch (error) {
    next(createError(400, "profile must be unique"));
  }
});

profileRouter.put("/:userId", async (req, res, next) => {
  try {
    const updatedUser = await profile.findByIdAndUpdate(
      req.params.userId, // WHO
      req.body, // HOW
      { new: true, runValidators: true } //
    );

    if (updatedUser) {
      res.send(updatedUser);
    } else {
      next(createError(404, `User with id ${req.params.userId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

profileRouter.delete("/:userId", async (req, res, next) => {
  try {
    const deletedUser = await profile.findByIdAndDelete(req.params.userId);
    if (deletedUser) {
      res.status(204).send();
    } else {
      next(createError(404, `User with id ${req.params.userId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

/* end pionts for cv download */
profileRouter.get("/:userId/cv", async (req, res, next) => {
    try {
      const user = await profile.findById(req.params.userId);
      res.setHeader("Content-Disposition", "attachment; filename=yourCV.pdf")
      const source =  generateUserPdfReadableStream(user)

      console.log(source);
      const destination = res


     
      pipeline(source, destination, err => {
        if (err) console.log(err)
      })

    } catch (error) {
      console.log(error);
    }
  });

export default profileRouter;
