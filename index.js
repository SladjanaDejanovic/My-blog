import express from "express"
import bodyParser from "body-parser"; // change
// import {dirname} from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`);
})

app.get("/", (req, res)=>{
  res.render("index.ejs")
})

app.post("/create", (req, res)=>{


  res.render("hello world")
})

app.get("/testbutton", (req, res)=>{
  res.render("partials/test.ejs")
})