import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import experienceRouter from "./experience/experience.js";
import postRouter from "./post/post.js";

const server = express();
const port = process.env.PORT || 3003;

// middlewares ----------------------------------------------------------------
const whitelist = process.env.CLOUDINARY_URL;
server.use(cors());
server.use(express.json());

//endpoints ----------------------------------------------------------------

server.use("/experience", experienceRouter);
server.use("/post", postRouter);

// error handlers ----------------------------------------------------------------

//connection to db-----------------------------------------------------------

mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("successfully connected"),
    server.listen(port, () => {
      console.table(listEndpoints(server));
      console.log(`server is running on port: ${port}`);
    });
});
