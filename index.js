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
  lastName: 'Cruz França',
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

let postIdCounter = 4;

const article1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const article2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa tincidunt dui. Nunc sed velit dignissim sodales. At consectetur lorem donec massa sapien. Tellus in hac habitasse platea dictumst vestibulum. Ultrices vitae auctor eu augue ut lectus. Porta lorem mollis aliquam ut porttitor leo a diam. Morbi enim nunc faucibus a"
const article3 = "Euismod quis viverra nibh cras pulvinar mattis nunc sed. Mattis rhoncus urna neque viverra justo. Orci eu lobortis elementum nibh tellus molestie. Montes nascetur ridiculus mus mauris vitae ultricies."
const article4 = "Senectus et netus et malesuada. Tincidunt arcu non sodales neque. Sagittis orci a scelerisque purus semper eget."

let posts = [
  {id: 1, title: 'Title 1', content: article1},
  {id: 2, title: 'Title 2', content: article2 },
  {id: 3, title: 'Title 3', content: article3 },
  {id: 4, title: 'Title 4', content: article4 },
]

app.get("/", (req, res) => {
    res.render("pages/index", {user,
  title: "Home page"}) 
  } 
)

/// Log in
app.post("/login", (req,res)=>{
  const {email, password}=req.body
  
user = users.find(user => user.email===email && user.password===password)

if(user){
   // Store user information in session
   req.session.user = user;
   res.redirect("/")
   console.log(user);
}else{
  res.status(401).send("Invalid email or password");
}
})

/// Render navbar with "create post" button based on user's admin status
app.use((req, res, next)=>{
  res.locals.user = req.session.user 
  next()
})

/// Log out
app.post("/logout", (req, res) => {
// Destroy the user session
req.session.destroy((err) => {
  if(err) {
    console.log("Error destroying session:", err);
    return res.status(500).send("Internal Server Error")
  }
  res.redirect("/");
  console.log(user);
})
})

/// Show page with all articles
app.get("/articles", (req,res)=>{
  const maxLength = 50;
  posts.forEach(post => {
    post.showReadMore = (post.content.length > maxLength || post.content.length > 100);
  });
 
  res.render("pages/articles", {user, posts: posts,
    title: "Articles", })
})

/// Show page to create a post if you are admin
app.get("/create", (req, res)=>{
  res.render("pages/create", {user, title: "Create post"})
})

/// Making new post
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

/// Delete a post
app.post("/delete", (req, res) => {
  const postId = req.body.postId
  const index = posts.findIndex(post => post.id === parseInt(postId))

  if(index!==-1){
    posts.splice(index,1)
  }

  res.redirect("/articles");
})

/// Show About page
app.get("/about", (req,res)=>{
  res.render("pages/about", {user, title: "About"})
})

/// Show contact page
app.get("/contact", (req, res) => {
  res.render("pages/contact", {user, title: "Contact"})
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})