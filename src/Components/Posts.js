// in order for this component to work read through all the comments
// below to get a better understanding of the component and then go to
// the bottom and change which export we are using

import { Component } from "react"
import Post from "./Post"
import { setPosts } from "../redux/postReducer"
import axios from "axios"
import { connect } from "react-redux"

class Posts extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    // when the posts page loads we will call the getPosts function below
    // to get all of our posts
    this.getPosts()
  }

  // the getPosts function will hit our /api/posts endpoint on our server which
  // gets all the post information from our database and sends it back to us
  // here.
  getPosts = () => {
    axios
      .get("/api/posts")
      .then((results) => {
        // once we get back the posts array from our server will will use
        // the setPosts action builder we put onto our props using connect
        // to save the posts array into redux in the postsReducer. this will
        // allow us to access the posts array in any component if we need the
        // ability to do that. One of the places we access our posts array is
        // down below in this same component. If you want to see that example look
        // down where we are mapping over that array.
        this.props.setPosts(results.data)
      })
      .catch((err) => console.log(err))
  }

  render() {
    //we console.log our props here. go take a look in the browser so that
    // you can see that our redux state from both our reducers are in
    // our props now. If you have not yet done the redux steps then
    // we won't see our reducers here. If you have done the redux steps
    // you should see a posts array inside the postReducer that has posts
    // from our database
    console.log("OUR PROPS:")
    console.log(this.props)
    return (
      <div>
        {/* here we check to see if our postReducer exists on our props (which it 
        should if you have done the redux steps ) and if it does we will map over
        the posts array stored in that reducer. We have access to this redux state
        because we used connect down below and are putting our reduxState onto
        our props. */}
        {this.props.postReducer && this.props.postReducer.posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

export default Posts
// once you've done the first 2 steps in redux use the export below instead
// of the export above. We use the connect higherOrderComponent to do 2 things.
// 1. The first thing we pass to connect is a function that determines what parts
// of the reduxState in our store we want to put onto our props. In this example
// you can see above I am returning the whole reduxState. The connect
// higherOrderComponent will therefore take our entire redux state and put it
// onto our props.
// 2. The second thing we pass to connect is an object with all of the action
// builders we want to have access to. I want to have the ability to update
// the posts array in our postReducer so notice I have imported the setPosts
// action builder up at the top and have placed it onto this object in connect.

// export default connect(mapStateToProps, { setPosts })(Posts)
