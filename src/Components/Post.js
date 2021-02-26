// our Post componet is what is being rendered for each item in the posts
// array. go take a look at the ./src/Components/Posts.js component to see
// how we get that array from the server and save it to redux. You will also
// see where we retrieve that array from redux to display in that component.
import { Component } from "react"
// we import the setPosts action builder from redux so that after we hit the
// endpoint to update or delete a post we can get the posts array those endpoints
// send back to us and save them into redux.
import {setPosts} from '../redux/postReducer'
import axios from 'axios'
// we use connect to connect to redux
import {connect} from 'react-redux'

class Post extends Component {
  constructor() {
    super()
    this.state = {
      // this state allows us to put ourselves in edit mode. when we are
      // in edit mode we will display an input field to update the post_content
      // for this specific post and a save button that will save the post.
      // when we are not in edit mode the post will simply show whatever the
      // post information is that we got passed down as a prop from the
      // ./src/Components/Posts.js Component and it will also show an
      // edit button that puts us into edit mode
      post_content: "",
      editing: false,
    }
  }

  // this function gets called when we click the edit button
  handleEditToggle = () => {
    this.setState({ editing: true })
  }

  // this function is how we save what gets typed into the post_content
  // input field to our state
  handleChange = (value) => {
    this.setState({ post_content: value })
  }

  // this function gets called when we click the delete button for this post
  // it will take the post_id that the ./src/Components/Posts.js file passes to
  // us as a prop and will send it to the server as a parameter. We use this post_id
  // the server what post we want to delete out of the database. 
  
  // notice that we are hitting the delete endpoint for '/api/posts/:post_id'
  // in our ./server/index.js file. this endpoint will call the deletePost
  // function that we export in our postController.
  // Go look at the ./server/controllers/postController.js 
  // file to see how we delete things
  // out of a database. Notice in the controller that when the deletePost 
  // function is finished running it will send us back an updated posts array. 
  // Back in this file we call the
  // setPosts action builder that we put onto our props to save that updated
  // array in redux in the ./src/redux/userReducer.js file.
  handleDelete = () => {
    axios
      .delete(`/api/posts/${this.props.post.post_id}`)
      .then((results) => {
        // the delete endpoint on the server sends us back the posts array
        // as results.data. we take that results.data and save it into our
        // redux state in ./src/redux/userReducer.js so that it will update
        // the posts we have saved here on the frontend.
        this.props.setPosts(results.data)
      })
      .catch((err) => console.log(err))
  }

  // This function is called when we click the Save button on a post. This button
  // should make an axios call that hits our put endpoint for '/api/posts/:post_id'
  // go look in ./server/index.js to see what this endpoint looks like.
  // notice how that endpoint calls the editPost function we export from
  // our ./server/controllers/authController.js. go look at that function
  // to see what it does. Notice that is sends back the updated posts array
  // when it is finished.
  handleSave = () => {
    axios
      .put(`/api/posts/${this.props.post.post_id}`, {
        post_content: this.state.post_content,
      })
      .then((results) => {
        // here we take the updated posts array that the put endpoint
        // for '/api/posts/:post_id' sent back to us and we save it into redux
        // using the setPosts action builder we put on our props using connect.
        this.props.setPosts(results.data)
        // when we are done saving the updated posts array we got back from the server
        // to redux we want to update the local state of this post to remove us from
        // edit mode.
        this.setState({ editing: false })
      })
      .catch((err) => console.log(err))
  }
  render() {
    // here we using conditional rendering determine if we are in edit mode or
    // not. If we are in editing mode (meaing the boolean editing that's on
    // our state is set to true) then we will display the div between this first
    // set of parentheses. this will have an input field and a button that takes
    // the contents of that input field and calls the handleSave function above
    return this.state.editing ? (
      <div>
        <input
          value={this.state.post_content}
          onChange={(e) => this.handleChange(e.target.value)}
        />
        <button onClick={this.handleSave}>Save Post</button>
      </div>
      // if we are not in edit mode we will instead display the post information
      // which is the content of the post and the author of the post. this
      // information is being passed to us from the ./src/Components/Posts.js
      // file where this Component is being rendered. Go take a look at the Posts
      // component to see how we are getting our post information here to display.
      // this section also has a button that calls the handleDelete function up
      // above and a button that will put us in edit mode by calling the
      // handleEditToggle function up above
    ) : (
      <div>
        <h2>Author: {this.props.post.email}</h2>
        <p>{this.props.post.post_content}</p>
        <button onClick={this.handleDelete}>Delete Post</button>
        <button onClick={this.handleEditToggle}>Edit Post</button>
      </div>
    )
  }
}

export default Post
// once we have the first 2 steps of redux done use the export below.
// Notice that we are putting our setPosts action builder onto our props
// here so that we can use it to save the posts array to redux after we
// edit or delete a post out of the array. We do not pass anything as the
// first argument for connect because we do not need access to the redux
// state here, we just need access to the function that can update that state
// which is setPosts.
// export default connect(null, { setPosts })(Post)
