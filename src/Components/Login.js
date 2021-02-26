// our login page will have a few things wrong with it. Read through
// the comments to understand what the page is supposed to do. the page
// should render right away but we should not be able to register or
// login until we fix the problems on this page and in the redux
// steps.
// if you have not done those steps already go do the first 2 steps in
// the redux section of the README.md
import { Component } from "react"
// imported the setUser action builder so that we can put it onto
// our props at the bottom of the page. Once we've done this we will
// have access to the setUser action builder in our component on our props.
// this will allow us to get the user object our login and register endpoints
// will send to us and save that information into redux.
import { setUser } from "../redux/userReducer"
import axios from "axios"
// imported connect so that we can put our setUser action builder on our props
// at the bottom of the page.
import { connect } from "react-redux"

class Login extends Component {
  constructor() {
    super()
    // this state is tied to the two input fields on the page
    this.state = {
      email: "",
      password: "",
    }
  }

  // this function is called in the onChange for our email input
  // field down below. This allows us to save what is being typed into
  // the input field on our state.
  handleEmail = (value) => {
    this.setState({ email: value })
  }

  // this function is called in the onChange for our password input
  // field down below.
  handlePassword = (value) => {
    this.setState({password: value})
  }

  // this function is called when we click the register button down below.
  // it will take our email and password that are on state and pass them back
  //  in a body to the axios.post('/auth/register') endpoint. to remind 
  //  yourself what that endpoint will do go look in the 
  //  ./server/controllers/authController.js file and look at the register
  // function. When you do, note that the function gets email and password off of req.body. Right
  // here is where we are creating that body.
  handleRegister = () => {
    axios
      .post("/auth/register", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((results) => {
        // when our register completes on the server it will send us back an
        // object in resultsthat is our user information. we want to take 
        // that user information and save it in our authReducer. 
        // this is where we use the setUser action builder to pass this 
        // informationinto our redux to save it.
        this.props.setUser(results.data)
        // once we are done saving the user information to redux we want
        // to send the user to the posts page. because react-router-dom 
        // puts an object called history on our props we can use the functions 
        // in those props. the push function on the history object for instance 
        // will allow us to send  a user to a new page by passing it the route 
        // of that page. go look in ./src/routes.js to see that
        // when we push to the "/posts" page we will render the Posts component.
        this.props.history.push("/posts")
      })
  }

  // this is the function that we will call to log in as a user that already
  // has registered on our site. this function is called down below when the
  // login button is clicked.
  handleLogin = () => {
    axios
      .post("/auth/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((results) => {
        console.log('Login complete! Our user info:')
        console.log(results.data)
        // notice how our login does not save the user to our reduxState
        // like our register button did and does not send us to the posts page! 
        // Fix this, look at how
        // we did these things in the handleRegister function for clues
      })
  }

  render() {
    return (
      <div>
        {/* our input field for the user to enter an email */}
        <input
          value={this.state.email}
          onChange={(e) => this.handleEmail(e.target.value)}
        />
        {/* our input field for the user to enter a password */}
        <input
          value={this.state.password}
          onChange={(e) => this.handlePassword(e.target.value)}
        />
        {/* a button to call the handleRegister function up above in our
        component. */}
        <button onClick={this.handleRegister}>Register</button>
        {/* a button to call the handleLogin function up above in our
        component */}
        <button onClick={this.handleLogin}>Login</button>
      </div>
    )
  }
}

export default Login
// once you've done the first 2 steps in the redux section of the README
//  use the export below instead of the export above. 
// We use the connect higherOrderComponent to
// connect to our redux store. In the case we have here notice I am passing
// in null as the first argument to connect. this is because on the login page
// we do not need access the values in our redux state on this page,
// we just need access to the action that will update the user information
// stored in our redux state in the authReducer.
// The second argument is an object that you put the action builders you want
// to have access to in this component. I have imported the setUser action builder
// at the top of this file from our authReducer and put it into this
// object here because we will want to have access to the ability to
// save a user into the authReducer in this component.
// export default connect(null, { setUser })(Login)
