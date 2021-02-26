### IMPORT NOTE BEFORE STARTING
This is a very complicated application but I have added a ton of comments to every single file in the application. There is a reasonable chance that as you're going certain parts will not make complete sense to you right away. If you find this is the case go back and re-read previous files we work on as you go. Note that I have broken this up into many sections. We will focus on the server and database first, then redux boilerplate, we will briefly touch on react-router-dom, and then we will deep dive into each component in the application. This application is not fully functional and the expecation will be that you make it fully functional by the end. There should be instructions on every file as we go that should explain what the next steps are for finishing the app. if you get stuck reach out to me or another member of staff to help you continue. 

### STEPS I HAVE DONE FOR YOU
## Review these files before starting the project
1. added .env file to .gitignore and a .envExample file to demonstrate how to set up a .env
2. included all our dependencies in our package.json so you don't have to manually install each of them. these dependencies were:
2a. SERVER DEPENDENCIES: express, express-session, massive, dotenv, bcrypt\
2b. FRONTEND DEPENDENCIES: redux, react-redux, axios, react-router-dom\
2c. Note that you will need to run `npm install` for these to work but you won't need to install them each individually.\
3. added "main" to our package.json so that running nodemon in a terminal will start our `./server/index.js` file
4. added proxy to our package.json so that our frontend axios calls will be redirected to our server on port 3333
5. created our server files in the server folder. This includes:
5a. `./server/index.js` which is where the heart of our server is\
5b. `./server/controllers/authController` which is where our user authentication actions will be for our auth endpoints.\
5c. `./server/controllers/postController` which is where our post actions will be for reading/creating/updating/deleting posts will be.\
6. created a db folder with the following:
6a. `./db/init.sql` file to determine how we set up our database
6b. `./db/user` folder to contain all of our actions for registering and updating users in our database
6c. `./db/posts` folder to contain all of our actions for viewing/creating/updating/deleting posts in our database
7. updated our `./src/index.js` file to use redux and react-router-dom in our project
8. added a `./src/routes.js` file to render our routes
9. added a `./src/redux` folder to contain our redux logic (includes 2 reducers and a store)
10. added a `./src/Components` folder to contain all of our components
10a. added `./src/Components/Header.js` Component for our Header component at the top of ever page
10b. added `./src/Components/Login.js` Component for our Login page
10c. added `./src/Components/Posts.js` Component to display all the posts
10d. added `./src/Components/AddPost.js` Component where we can add a post to the database
10e. added `./src/Components/Post.js` Component that is rendered inside of our Posts component for each post in the posts array


### FIRST STEPS TO GET STARTED
1. Create a .env file inside the main folder with the following
1a. CONNECTION_STRING with the value of your database connection string
1b. SERVER_PORT with the number 3333 (this can be any number you want but I have already set up our proxy in package.json to point at port 3333)
1c. SESSION_SECRET which can be anything you choose
NOTE THERE IS A .envExample FILE YOU CAN LOOK AT FOR REFERENCE, THE CONNECTION STRING HERE IS INVALID YOU WILL NEED TO USE YOUR OWN TO CONNECT TO A DATABASE. THE CONNECTION STRING IN THIS FILE IS JUST TO SHOW WHAT A CONNECTION STRING WOULD LOOK LIKE
2. Look at the ./server/index.js file to get acquainted with how our server will be structured.
3. look at ./db/init.sql to be sure you are acquainted with how our database is structured. Make sure to read the comments in this file and follow the commented out instructions to set up our database.
4. READ ALL THE COMMENTS IN EACH FILE AS WE GO

### SERVER
## SERVER AUTH HANDLING
1. in `./server/index.js` make sure our auth endpoints are hooked up to the authController properly
2. in `./server/controllers/authController.js` make sure to read all the comments to make sure you understand how our authentication is set up.
3. in `./db/user` folder make sure you read both files to see how our database is handling authentication
## SERVER POST HANDLING
1. in `./server/index.js` make sure our post endpoints are hooked up to the postController properly.
2. in `./controller/postController.js` make sure you understand how all our functions are built for posts. Delete and Edit will require you to make changes so be sure to read all the comments in the file to understand it.
3. in `./db/posts` make sure you are acquainted with all the sql files that we are using in our postController.js


### Redux
1. Look at `./src/index.js` to see how we import a Provider from react-redux and our store from `./src/redux/store.js`. Note that we will need to make changes to this file to make sure our redux works properly so follow the instructions carefully and look at the `./src/index.js` from other reviews if you need some help.
2. Look at `./src/redux/store.js` to see how we construct our store. Notice how it takes `./src/redux/postReducer.js` and passes it into the combineReducer function. This will make it so that we can access the redux state stored in the postReducer anywhere in our app later on. Make sure you do the same with our authReducer so that both the redux state in our authReducer (our user's info) and the redux state in our postReducer (our posts info) are available anywhere in our application. You will see how we use it once we get to the components.
3. Look at the authReducer so that you can see how we will be saving and updating our user information in redux here on the frontend. The setUser action builder we have in this file will be used once we get to the `./src/Components/Login.js` file a bit later on.
4. Look at the postReducer so that you can see how we will be saving and updating the posts array. In particular pay close attention to the setPosts action builder because we will use this several times throughout our app to save a posts array to this reducer.
5. Once you are done in `./src/index.js`, `./src/redux/store.js` `./src/redux/authReducer.js` and `./src/redux/postReducer.js` you are done with the redux setup! We will now be able to save and access our redux state globally on the frontend.

### Routes
1. notice that we imported HashRouter from react-router-dom into `./src/index.js` and wrapped it around our App component. this will allow us to simulate multiple pages for our application.
2. Go look in `./src/routes.js` to see what the different pages in our application will be. Notice we are importing Switch and Route from react-router-dom. These components are what allow us to have multiple pages depending the route (an example of a route would be `http://localhost:3000/#/` notice that when we hit this route in the browser it renders the `./src/Components/Login.js` component. if we go to a different route like `http://localhost:3000/#/posts` we will instead go to the `./src/Components/Posts.js` component). This is all determined in `./src/routes.js`.
3. Go look in `./src/App.js` to see that we are rendering the routes file there. This is required to make our routes work.

### Header Component
1. go look at `./src/Components/Header.js`. This component is not one of our routes and is just rendered inside of `./src/Components/App.js` above our routes. Putting it here allows to to appear at the top of our website no matter what page we are on. This component mostly just has buttons that will push us to the various routes in our application. It also has some conditional rendering logic that will either show the logged in user's email and a logout button (if you're logged in) or some text that says "Please log in" if you are not logged in. This last functionality will not work until you have completed the server steps and redux steps above so make sure you take care of those first. Once you have done those steps read through the comments and follow the steps inside this component to get it to work.

### Login Component
1. go look at `./src/Components/Login.js` to see the login component of our application. This component has the functionality for a user to login or register for our site. It will not work unless you've already done the server and redux steps above so complete those first and then follow the instructions to finish building the Login component. Once you have done those steps read through the comments and follow the steps inside this component to get it to work.

### Posts Component
1. go look at `./src/Components/Posts.js` to see the page where we are rendering all of the posts from the database. This Component will not work until you do the redux steps above. After you've done those steps go ahead and follow the steps in this component to understand and finish that component. Note that this component render the `./src/Components/Post.js` component. For now don't worry too much about that component except to make a mental note that the Post component is what renders each individual post in the posts array. We will get to that component a little bit later. For now this component is considered working if it is displaying posts from the posts table.

### AddPost Component
1. go look at `./src/Components/AddPost.js` to see the page where we will be able to add a new post to the database. This component has an input field and a button to take the contents of that input field and submit it into our database. The component will not work until you've done the server and redux steps above so make sure you handle those first. Once you are done with those two sections you should be able to follow the instructions here to make this component work.

### Post Component
1. go look at `./src/Components/Post.js`. This component not one of our routes and is instead rendered inside of our `./src/Components/Posts.js` component. This Component has a piece of state called "editing". When editing is true that means this particular post is in edit mode and should display an input field and a button. When we are not in editing mode we should display the post author's email and the content of the post. This component functionality will not work until we finish the server and redux steps above. Once you have done those steps read through the comments and follow the steps inside this component to get it to work.