module.exports = {
  getPosts: (req, res) => {
    const db = req.app.get("db")
    // call the sql file found in ./db/posts/get_posts to get all the
    // posts in our database
    db.posts.get_posts().then((posts) => {
      // send back the posts we found to the frontend so the user can
      // save it and use the information
      res.status(200).send(posts)
    })
  },
  addPost: (req, res) => {
    const db = req.app.get("db")
    // we expect the user to send back a body object with a "post_content"
    // key/value pair. this will be the info we insert into the post table.
    const { post_content } = req.body
    // we pull the user's id off of where we saved it in req.session.user when
    // the user logged in
    const { user_id } = req.session.user
    // we use the sql file found at ./db/posts/create_post to create a new post
    // in the database with an "author_id" tied to the user that created the
    // post
    db.posts.create_post(user_id, post_content).then((posts) => {
      // note the create_post sql file sends back the updated posts
      // list so that the user can see all the posts on the frontend
      res.status(200).send(posts)
    })
  },
  deletePost: (req, res) => {
    const db = req.app.get("db")
    // recall that we set up our endpoint in ./server/index.js to have
    // a :post_id on the end. This is because are expecting the user
    // on the frontend to pass back a post_id on the end of the url so
    // that we can identify which post to delete. This is where we
    // get that info off the url.
    const { post_id } = req.params
    // Our delete_post is not quite finished! look at the
    //  ./db/posts/delete_post.sql file to see what we are supposed
    //  to pass in to complete this function on the next line.
    //  Look at the addPost function above
    // and the ./db/posts/add_post.sql file if you need a hint
    db.posts.delete_post().then((posts) => {
      // after we delete a post we send back the updated posts to
      // the front end.
      res.status(200).send(posts)
    })
  },
  editPost: (req, res) => {
    const db = req.app.get("db")
    // we need to get our post_id off of our url params to know which
    // post the user on the frontend wants to update.
    const { post_id } = req.params
    // we need to get the post_content off of our req.body to know
    // what the user on the frontend wants to update the post to say.
    const { post_content } = req.body
    // Our update_post function is not quite finished! Look at the
    // ./db/posts/update_post.sql file to see what we are supposed to
    // pass in and in what order to complete this function.
    db.posts.edit_post().then((posts) => {
      res.status(200).send(posts)
    })
  },
}
