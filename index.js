import express from "express"
import bodyParser from "body-parser";
import session from "express-session"


const app = express()
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs") 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}))

const users = [
  {
     firstName: 'Sladjana',
  lastName: 'Dejanovic',
  email: "sladja@gmail.com",
  password: "1111",
  admin: true
},
  {
    firstName: 'Yuri',
  lastName: 'Cruz Franca',
  email: "yuri@gmail.com",
  password: "2222",
  admin: true
},
  {
    firstName: 'Azrael',
  lastName: 'Dejanovic',
  email: "azibazi@gmail.com",
  password: "3333",
  admin: false
}
]

let user;
// let loggedIn = false;


let postIdCounter = 4;

let posts = [
  {title: 'Title 1', content: 'Body 1' },
  {title: 'Title 2', content: 'Body 2' },
  {title: 'Title 3', content: 'Body 3' },
  {title: 'Title 4', content: 'Body 4' },
]


app.get("/", (req, res)=>{
 
    res.render("pages/index", {
  title: "Home page"}) 
  
  } 

)

app.post("/login", (req,res)=>{
  const {email, password}=req.body
  console.log(password);
user = users.find(user => user.email===email && user.password===password)
console.log(user);
if(user){
   // Store user information in session
   req.session.user = user;
   res.redirect("/")
}else{
  res.status(401).send("Invalid email or password");
}
})

// Render navbar with "create post" button based on user's admin status
app.use((req, res, next)=>{
  res.locals.user = req.session.user // Make user data available in templates
  next()
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


app.listen(port, ()=>{
  console.log(`Server running on port ${port}`);
})