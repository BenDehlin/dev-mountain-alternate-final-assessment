
// this is our initialState for our user, we store it here in redux
// so that we can use the functionality of redux to use/update the user
// info anywhere in our app
const initialState = {
  user_id: null,
  email: "",
  loggedIn: false,
}

// we extract our action type strings out into variables to 
// make catching errors easier. notice how the names of our action
// types match the names of our action builder functions below but
// in all caps with underscores between the words. this is considered
// best practice.
const SET_USER = "SET_USER"
const LOGOUT_USER = "LOGOUT_USER"


// we create an "action builder" function to allow us to pass in a
// user object that will then be saved into our redux state down in the
// authReducer function
export function setUser(user) {
  // our setUser "action builder" returns an action object with 
  // a type of "SET_USER" and a payload of a user object that 
  // got passed to this function. This action object will be passed
  // into our authReducer as the action.
  return {
    type: SET_USER,
    payload: user,
  }
}

export function logoutUser() {
  // Our logoutUser action builder should return a type but doesn't! Look
  // above at our setUser action builder and below at our authReducer cases
  // to see what the type just below should be. The payload can remain null
  // for this case.
  return {
    type: null,
    payload: null,
  }
}

// our authReducer updates the initial state based on the action object that
// got passed in. This happens under the covers in redux when we call
// our action builders above so we do not see it happen. Just know that
// when we call the setUser function in one of our components it will
// pass into our auth reducer an action object that will look something 
// like this:
// action = {
//   type: 'SET_USER',
//   payload: {
//     user_id: 1,
//     email: 'some email'
//   }
// }
export default function authReducer(state = initialState, action) {
  // our switch statement will determine how we update the redux state
  // for our authReducer based on what the type is for our action
  switch (action.type) {
    // if the type on our action is "SET_USER" it will update the state
    // as displayed below
    case SET_USER:
      return {
        // note that we spread in the current state in order to not change
        // any other aspects of the state if there are any. in this case there
        // is not but it is good to take note of.
        ...state,
        // we update the user_id up on our initialState up at the top to
        // have a value of whatever the user_id was on the payload that got
        // passed in on our action
        user_id: action.payload.user_id,
        // we update the email in the same way
        email: action.payload.email,
        // here we update the loggedIn boolean on state to be true
        // so that later we can check to see if we are logged in
        loggedIn: true,
      }
    case LOGOUT_USER:
      // in the "LOGOUT_USER" case we just return the initialState to set
      // our stored user back to a not logged in user.
      return { ...initialState }
    default:
      return state
  }
}
