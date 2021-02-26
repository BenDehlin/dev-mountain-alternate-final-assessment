// our initialState for postReducer should be an empty array
const initialState = {
  posts: [],
}

const SET_POSTS = "SET_POSTS"

export function setPosts(posts) {
  // when we call the setPosts action builder we pass in an array of posts
  // that we will save as the payload for this action. this will be passed
  // to our postReducer down below as an action object. our postReducer switch
  // down below will use the action type of "SET_POSTS" to determine that we
  // want to take this posts array that we saved in the action as payload and
  // update our state in this file to be the new array. You will see how we
  // use this action once we start looking at the components in our project.
  return {
    type: SET_POSTS,
    payload: posts,
  }
}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      // in the "SET_POSTS" action type we want to update the posts on our initialState
      //  to be the payload that we passed into the setPosts action builder.
      // this will save the posts array we passed to that action builder to our
      // redux state so that we can use it anywhere in our frontend
      return {
        ...state,
        posts: action.payload,
      }
    default:
      return state
  }
}
