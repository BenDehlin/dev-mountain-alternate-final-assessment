// for our Header to have access to the react-router-dom actions
// we will need to import withRouter from react-router-dom because
// Header is not a direct descendant of the Switch. Go take a look at
// the ./src/routes.js file to see all the components that will have access
// to the history/match/location objects be default. These objects have
// a ton of useful information and functions on them but the one we want
// to use here is the history.push() function that will allow us to push a
// user to a new page when the function is called.
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from '../redux/userReducer'
import axios from 'axios'

const Header = (props) => {

    // this function is called when we click the Login Page button below.
    // it should push us to the login page. our login page location is
    // at the route "/". you can verify this by looking at the ./src/routes.js
    // file. The Login component that will be rendered when we visit this
    // page can be found at ./src/Components/Login.js
    const goToLogin = () => {
        props.history.push('/')
    }

    // this function will take us to the posts page. you can see in the routes
    // this will render the component for Posts that can be found at
    // ./src/Components/Posts.js
    // the function will be called when we click the Posts Page button below
    const goToPosts = () => {
        props.history.push('/posts')
    }

    // this function will take us to the AddPost page.
    const goToAddPost = () => {
        props.history.push('/addpost')
    }

    // this function will hit our logout endpoint on the server and after
    // it logs us out on the server it will update our redux using the logoutUser
    // action builder to set us back to a logged out state in our userReducer.
    // notice that we imported our logoutUser action builder at the top and then
    // used connect down at the bottom to put it on our props.
    const handleLogout = ()=> {
        axios.post('/auth/logout').then(() => {
            props.logoutUser()
            props.history.push('/')
        })
    }

    return(
        <header>
            <button onClick={goToLogin}>Login Page</button>
            <button onClick={goToPosts}>Posts Page</button>
            <button onClick={goToAddPost}>Add Post Page</button>
            {/* we use conditional rendering in a ternary here to display
            something different if we are logged out or logged in. To tell
            that we are logged in we will use the loggedIn boolean in
            our userReducer. If it is set to true that means we have logged
            in. You can double check this by looking in our
            userReducer at how state there gets updated when someone logs
            in. If we are logged in we will display a span that says
            Hello and then the user's email. It will also display the logout
            button. If we are not logged in it will simply display a
            span that says Please Log In. */}
            {props.userReducer && props.userReducer.loggedIn ? (
                <div>
                    <span>Hello {props.userReducer.email}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ):(
                <div>
                    <span>Please Log In</span>
                </div>
            )}
        </header>
    )
}


const mapStateToProps = (reduxState) => {
    return reduxState
}

// notice down here that we use the withRouter higherOrderComponent in order
// to get access to the history object on our props. as we mentioned above
// we have to do this because the Header is not a direct child of the switch
// in our ./src/routes.js file
export default withRouter(Header)


// use the export above until we have done the first 2 redux steps, then
// use the export below. notice that we pass the mapStateToProps function
// above that takes our entire reduxState and puts it on our props.
// export default connect(mapStateToProps, {logoutUser})(withRouter(Header))