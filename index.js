import express from "express"
import bodyParser from "body-parser"; // change
// import {dirname} from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs") // setting ejs as express app view engine ...
app.use(bodyParser.urlencoded({ extended: true })); //change this, body parser isnt working anymore

let postTitle = "";
let postText = "";

/** FOR CREATING POST, PASSING VALUES OF INPUT HERE
 postTitle = req.body["title"]
 postText = req.body["content"]
 */

const user = {
  firstName: 'Sladjana',
  lastName: 'Dejanovic',
  admin: true
}

let posts = [
  {title: 'Title 1', content: 'Body 1' },
  {title: 'Title 2', content: 'Body 2' },
  {title: 'Title 3', content: 'Body 3' },
  {title: 'Title 4', content: 'Body 4' },
]

app.get("/", (req, res)=>{//.. so here we dont need to provide extention for index.ejs, bc app already knows what to look for
  res.render("pages/index", {user,
  title: "Home page"}) 
})

app.get("/create", (req, res)=>{
  res.render("pages/create", {title: "Create post"})
})

app.post("/create", (req, res)=>{
  const { postTitle, content } = req.body;

  const newPost = {
    title: postTitle,
    content: content
  }

  posts.push(newPost)

  console.log('New Blog Post:');
  console.log('Title:', postTitle);
  console.log('Content:', content);
  // Redirect the user back to the compose page after submitting the form
  res.redirect('/articles');
})

app.get("/articles", (req,res)=>{
  res.render("pages/articles", {articles:posts,
    title: "Articles"})
})

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`);
})