import { createStore, combineReducers } from "redux"
import postReducer from "./postReducer"

// Above we import our postReducer and pass it in to the combineReducers
// function below.
// WE NEED TO DO THE SAME WITH OUR
// authReducer so that it will put the redux state for our user 
// into the redux store so that we can
// access that information in any of our components

const rootReducer = combineReducers({
  postReducer,
})

export default createStore(rootReducer)
