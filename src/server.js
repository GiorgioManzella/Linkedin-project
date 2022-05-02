import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import postRouter from "./post/post.js";

const server = express();
const port = process.env.PORT || 3003;

// middlewares ----------------------------------------------------------------

server.use(cors());
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
