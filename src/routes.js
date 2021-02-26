import {Switch, Route} from 'react-router-dom'
import Login from './Components/Login'
import Posts from './Components/Posts'
import AddPost from './Components/AddPost'

export default (
    // this piece of jsx we will import into `./src/App.js` and is what simulates
    // us having multiple pages in our application
    <Switch>
        {/* the default route will be our login page and can be reached by
        going to `http://localhost:3000/#/` in the browser */}
        <Route exact path='/' component={Login} />
        {/* any other page can be reached by going to to appropriate url
        in the browser. for instance here we can see the posts by going to
        `http://localhost:3000/#/posts` */}
        <Route path='/posts' component={Posts} />
        <Route path='/addpost' component={AddPost} />
    </Switch>
)