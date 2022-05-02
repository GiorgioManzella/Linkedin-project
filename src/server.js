import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import postRouter from "./post/post.js";

const server = express();
const port = process.env.PORT || 3003;

// middlewares ----------------------------------------------------------------
const whitelist = process.env.CLOUDINARY_URL;
server.use(
  cors({
    origin: (origin, next) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        next(null, true);
      } else {
        next(createError(400, "CORS ERROR!"));
      }
    },
  })
);
server.use(express.json());

//endpoints ----------------------------------------------------------------

server.use("/post", postRouter);

// error handlers ----------------------------------------------------------------

//connection to db-----------------------------------------------------------

mongoose.connect(
  "mongodb+srv://test:test@cluster0.teeo4.mongodb.net/Linkedin?retryWrites=true&w=majority"
);
mongoose.connection.on("connected", () => {
  console.log("successfully connected"),
    server.listen(port, () => {
      console.table(listEndpoints(server));
      console.log(`server is running on port: ${port}`);
    });
});
