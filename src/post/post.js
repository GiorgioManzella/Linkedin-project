import express from "express";
import createError from "http-errors";
import postModel from "./postModel.js";
// =============================
const postRouter = express.Router();
// ==============================
postRouter.post("/", async (req, res, next) => {
  try {
    const post = await postModel(req.body);
    const { _id } = await post.save();
    res.send({ _id });
  } catch (error) {
    console.log(error);
    next(createError(404, `post Not found!`));
  }
});
// =======================================
postRouter.get("/", async (req, res, next) => {
  try {
    const getPost = await postModel.find();
    res.send(getPost);
  } catch (error) {
    console.log(error);
    next(createError(404, `post Not found`));
  }
});
// =======================================
postRouter.get("/:postId", async (req, res, next) => {
  try {
    const getPost = await postModel.findById(req.params.postId);
    res.send(getPost);
  } catch (error) {
    console.log(error);
    next(createError(404, `post with ${req.params.postId}not found`));
  }
});
// =======================================
postRouter.put("/:postId", async (req, res, next) => {
  try {
    const updatePost = await postModel.findByIdAndUpdate(
      req.params.postId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatePost);
  } catch (error) {
    console.log(error);
    next(createError(404, `post with ${req.params.postId}not found`));
  }
});
// =======================================
postRouter.delete("/:postId", async (req, res, next) => {
  try {
    const deletePost = await postModel.findByIdAndDelete(req.params.postId);
    res.send(deletePost);
  } catch (error) {
    console.log(error);
    next(createError(404, `post with ${req.params.postId}not found`));
  }
});
// =======================================
postRouter.post("/:postId", async (req, res, next) => {
  try {
    res.send();
  } catch (error) {
    console.log(error);
    next(createError(404));
  }
});
// =======================================
// postRouter.get(":PostId/")
// =======================================
export default postRouter;
