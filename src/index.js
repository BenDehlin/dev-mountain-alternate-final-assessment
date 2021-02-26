import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

// Import HashRouter for react-router-dom and Provider
// for react-redux. We also import the redux store
// that we created from the path to our store.
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
// WE NEED TO import our redux store from the store that exists in
// our redux folder. you can find that at ./src/redux/store. REMEMBER
// our path to the store is relative to the folder this file is in so make
// sure when you import you import from ./redux/store instead of the full
// path to the file (./src/redux/store)

ReactDOM.render(
  <React.StrictMode>
    {/*we wrap our app in the redux Provider
    NOTE: we need to pass our provider a store prop and we have
    not done that. if you are unsure how we do this look at the
    ./src/index.js from previous lectures or reviews. Once you've 
    checked that out come back and uncomment our Provider and pass
    it the store prop*/}
    {/* <Provider> */}
      {/*we wrap our app in the react-router-dom HashRouter */}
      <HashRouter>
        <App />
      </HashRouter>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()
