// This component lets us add a post to the posts array. this component
// is rendered in our ./src/routes.js file when we visit the route '/addpost'.
// you can verify this by looking at the routes file.

import { Component } from "react"
// we import the setPosts action builder from the postReducer so that after
// we hit our endpoint that adds a post on the server we can get the updated
// posts array back from the server and save it into redux.
import { setPosts } from "../redux/postReducer"
import axios from 'axios'
// we need connect to allow us to put our setPosts action builder onto our props
import {connect} from 'react-redux'

class AddPost extends Component {
  constructor() {
    super()
    this.state = {
      // this state is tied to the input field for post_content.
      post_content: "",
    }
  }

  // when we type into the input field this handleChange function will update
  // the post_content on state. See the onChange event handler down below
  // on our input field.
  handleChange = (value) => {
    this.setState({ post_content: value })
  }

  // the addPost function will get called when the Add Post button down below
  // is clicked. this function hits the 'post' endpoint in our './server/index.js'
  // NOTE THAT WHEN I SAY POST ENDPOINT I MEAN app.post('/api/posts') IN THIS SPECIFIC
  // CIRCUMSTANCE. WHEN HAVE AN ADD ENDPOINT IT IS CALLED A POST ENDPOINT. THIS IS A LITTLE
  // CONFUSING BECAUSE OUR DATA IS ALSO CALLED POSTS.
  // when that endpoint is hit it will perform the addPOst action in our 
  // './server/controllers/postController.js' file that will add a 
  // new post to our database.
  addPost = () => {
    //notice that we pass back a "body" object that has the post_content
    // that was saved to our local state by the input field. This means that
    // when we click the addPost button we will take whatever info is typed into
    // the input field and send it back to the addPost action in our postController.
    // go look at that function and notice that we destructure post_content off of
    // req.body and then pass that into the database. This is where that req.body is
    // coming from.
    axios
      .post("/api/posts", { post_content: this.state.post_content })
      .then((results) => {
        // when the addPost action in our postController updates the database
        // it will get an updated version of the posts array and send it back to
        // us here. We will take this array and save it into redux using the
        // setPosts action builder (go look in postReducer to remind yourself
        //   what that does.)
        this.props.setPosts(results.data)
        // after we save our posts array into redux we want to push our user
        // back to the './src/Components/Posts.js' component so we can see the
        // updated array with our new post in it
        this.props.history.push('/posts')
      })
  }

  render() {
    return (
      <div>
        {/* input field to update the post_content piece of state */}
        <input
          value={this.state.post_content}
          onChange={(e) => this.handleChange(e.target.value)}
        />
        {/* button that will call the addPost function created up above. */}
        <button onClick={() => this.addPost()}>Add Post</button>
      </div>
    )
  }
}

export default AddPost
// when redux step 2 is done use the export below instead of the export above.
// We use connect here to connect this component to redux and put our setPosts
// action builder onto our props. We do not need access to the posts array
// in redux or the user information in redux so we pass in null as the first
// argument.
// export default connect(null, { setPosts })(AddPost)
