import express from "express"
import bodyParser from "body-parser"; // change
// import {dirname} from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs") // setting ejs as express app view engine ..

const user = {
  firstName: 'Sladjana',
  lastName: 'Dejanovic',
  admin: true
}

const posts = [
  {title: 'Title 1', body: 'Body 1' },
  {title: 'Title 2', body: 'Body 2' },
  {title: 'Title 3', body: 'Body 3' },
  {title: 'Title 4', body: 'Body 4' },
]

app.use(bodyParser.urlencoded({ extended: true })); //change this, body parser isnt workign anymore

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`);
})

app.get("/", (req, res)=>{
  res.render("index", {user}) //.. so here we dont need to provide extention for index.ejs, bc app already knows what to look for
})

app.get("/create", (req, res)=>{
  res.render("partials/create")
})

app.get("/articles", (req,res)=>{
  res.render("partials/articles", {articles:posts})
})