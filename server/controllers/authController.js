// in our auth controller we bring in brcrypt to handle authenticating
const bcrypt = require("bcrypt")

// in our controllers we export an object with a functions on it that we can
// bring into our ./server/index.js. this allows us to perform different actions
// depending on which endpoint was hit.
module.exports = {
    // note that our register and login functions have "async" in front of them
    // this is so that we can make them wait for a promise to resolve before
    // moving on in the code by using "await". database calls return a promise.
    // if we do not include this our code will not wait for the result from the
    // database call to come back and will just move on.
  register: async (req, res) => {
    // our first step is to retrieve our database connection that we
    // saved on our app instance
      const db = req.app.get('db')
    // our second step is to get the information we want a user to register
    // with. in our case if we look at our ./db/init.sql we can see that we 
    // want to have email and password saved into our database for a new user
    // so we are building our register function to expect our user to pass back
    // an email and password when they register
      const {email, password} = req.body

    //   next we want to check to see if a user has already registered with
    //   this email. We are going to do this by using the sql file in 
    //   ./db/user/check_user_email.sql. Go look at that file to make sure you
    //   can follow what we are doing
    //   notice how we put square brackets around "result" because our database
    //   is sending back the result as an array but we just want to get the first
    //   item in the array. this is array destructuring. 
    const [result] = await db.user.check_user_by_email(email)
    // if there is a result from this call that means that someone has already
    // registered with this email and our user cannot register with the given
    // email. We will send back a conflict error status so that they try
    // a different email
    if(result){
        return res.status(409).send('That email is already registered.')
    }
    // if we did not find a result in our database for this email we will
    // go through the process of salting and hashing the password from req.body
    // so that we can store something more secure than a plain-text password
    const salt = bcrypt.genSaltSync(10)
    // notice we pass the password from req.body and the salt we just
    // generated to bcrypt.hashSync()
    const hash = bcrypt.hashSync(password, salt)
    // after we've hashed the password we will use the sql file found in
    // ./db/user/register_user to create a new entry in the users table
    // with the given email and hashed password
    const [user] = await db.user.register_user(email, hash)
    // we save the user that was returned to the session associated with
    // the user
    req.session.user = user
    // we send back the user that we stored on session so that on the frontend
    // they can store the info in redux or some other global state tool
    return res.status(200).send(req.session.user)
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body
    // check to see if the user is in our database already
    const [user] = await db.user.check_user_email(email)
    // if the user is not in our database they cannot log in
    if(!user){
        return res.status(401).send('Email incorrect.')
    }
    // if the user IS in our database we check to see if the password they
    // sent back hashes to the same password we saved in our database
    const isAuthenticated = bcrypt.compareSync(password, user.password)
    // if not they got the password was incorrect
    if(!isAuthenticated){
        return res.status(401).send('Password incorrect.')
    }
    // if they are both in the database AND entered the correct password
    // we delete the password off the user object, save it to our session,
    // and send back the session so that they are now "Logged In"
    delete user.password
    req.session.user = user
    return res.status(200).send(req.session.user)
  },
  logout: (req, res) => {
    //   if the logout function is hit we want to destroy the session for that
    //   user so they have to log back in
    req.session.destroy()
    res.sendStatus(200)
  },
  getUser: (req, res) => {
    // getUser is so that if the user loses their user info on the frontend
    // we can retrieve it from the info we saved in our session for them. We
    // will not use this in our app but it is important to be aware of for your
    // personal project.
    if(!req.session.user){
        return res.status(401).send('User not found.')
    }
    return res.status(200).send(req.session.user)
  },
}
