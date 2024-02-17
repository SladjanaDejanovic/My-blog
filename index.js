import express from "express"
import bodyParser from "body-parser"; // change?
// import {dirname} from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs") // setting ejs as express app view engine ...
app.use(bodyParser.urlencoded({ extended: true }));

const user = {
  firstName: 'Sladjana',
  lastName: 'Dejanovic',
  email: "sladja@gmail.com",
  password: "1234",
  admin: true
}

let postIdCounter = 4;
console.log(postIdCounter);
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
  res.render("pages/create", {user,title: "Create post"})
})

app.get("/articles", (req,res)=>{
  res.render("pages/articles", {user, posts:posts,
    title: "Articles"})
})

app.post("/create", (req, res)=>{
  const { postTitle, content } = req.body;

  const newPost = {
    id: postIdCounter++,
    title: postTitle,
    content: content
  }

  posts.push(newPost)

  console.log('New Blog Post:');
  console.log('Title:', postTitle);
  console.log('Content:', content);
  console.log(postIdCounter);
  
  res.redirect('/articles');
})

app.post("/delete", (req, res)=>{
  const postId = req.body.postId
  const index = posts.findIndex(post=>post.id===parseInt(postId))

  if(index!==-1){
    posts.splice(index,1)
  }

  res.redirect('/articles');
})

app.get("/about", (req,res)=>{
  res.render("pages/about", {user, title: "About"})
})

app.post("/login", (req,res)=>{
  const {email, password}=req.body

  if(email===user.email && password===user.password){
    res.redirect("/")
  }
})

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`);
})