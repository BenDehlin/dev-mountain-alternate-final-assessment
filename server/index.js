// Here we bring in our required packages for our server to run
// dotenv allows us to bring in our environment variables from our .env file
require("dotenv").config()
// express is the framework we use to build our server
const express = require("express")
// massive is the library we use to connect to our database
const massive = require("massive")
// express-session is the library we use to create unique sessions
// when a new user accesses our site for the first time
const session = require("express-session")

// Here we got our environment variables out of the .env file
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env

// CREATE APP INSTANCE
// Here we create our server instance called "app". Express gives us
// access to the ability to build our endpoints so our frontend can
// access the information we store on the server and in the database.
// you can find these endpoints down at the bottom of the file.
const app = express()

// CONTROLLERS
// Here we are importing our controllers from the controller folder. Make
// sure to GO LOOK AT OUR CONTROLLER FOLDER to see how those functions are set
// up
const authCtrl = require('./controllers/authController')
const postCtrl = require('./controllers/postController')

// APP LEVEL MIDDLEWARE
// Here we set up our app level middleware. These are different things
// we want to happen before any of our endpoints can be hit.
// app.use(express.json()) allows our server to translate incoming json into
// javascript because our server only speaks javascript by default
app.use(express.json())
// here we set up our app to use session so that each new user will
// have a "unique" connection with the server. This occurs the first
// time a new user hits one of our endpoints.
app.use(
  session({
    // NOTICE WE ARE USING THE SESSION_SECRET FROM THE .env FILE HERE
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // the cookie maxAge is how long we want a session to last before the 
    // user has to log in again.
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
)

// DATABASE CONNECTION
// Here we are setting up our connection to the database using massive
massive({
//   NOTICE WE ARE USING THE CONNECTION_STRING FROM THE .env FILE HERE
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
//   this line saves our database connection to our app under a variable
//   called "db" so that we can access our database connection in our
//   controller files
  app.set("db", db)
  console.log("Database Connected")
//   After our database is connected we have our app start listening on
//   our server port for requests.
//   NOTICE WE ARE USING THE SERVER_PORT FROM THE .env FILE HERE
  app.listen(SERVER_PORT, () =>
    console.log(`SERVER LISTENING ON PORT ${SERVER_PORT}`)
  )
}).catch(err => console.log(err))

// ENDPOINTS
// Auth Endpoints
// our register endpoint is set up to use the register function in our
// authController found in ./server/controllers/authController. 
// Make sure to go take a look at how that function is set up.
// when a user hits the url "/auth/register" with a post axios request
// it will execute the authCtrl.register function
app.post('/auth/register', authCtrl.register)
// Our login/logout/getUser endpoints have not been connected to the controller!
// set them up the same way that we set up register. Our login endpoint should
// use the login function in our controller, and so on for the other 2.
// UNCOMMENT THESE ENDPOINTS AND HOOK THEM UP TO THE APPROPRIATE FUNCTIONS
// FROM THE AUTH CONTROLLER
// app.post('/auth/login')
// app.post('/auth/logout')
// app.get('/auth/getUser')

// Post Endpoints
// if a user hits /api/posts it will execute the "getPosts" function
// in our postController found in ./server/controllers/postController
app.get('/api/posts', postCtrl.getPosts)
// Our createPost/editPost/deletePost have not been set up yet! Make
// sure to set these up below. app.post should be hooked up to create,
// app.put should be hooked up to edit and app.delete should be hooked
// up to delete
// UNCOMMENT THESE ENDPOINTS AND HOOK THEM UP TO THE APPROPRIATE FUNCTIONS
// FROM THE POST CONTROLLER
// app.post('/api/posts')
// app.put('/api/posts/:post_id')
// app.delete('/api/posts/:post_id')