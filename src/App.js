import "./App.css"
import Header from "./Components/Header"
import routes from "./routes"

function App() {
  return (
    <div className="App">
      {/* here we render our Header component over our routes so that
    it appears on every page */}
      <Header />
      {/* here we render our routes, imported from the
    `./src/routes.js` file. This is what simulates an app that has
    multiple pages. */}
      {routes}
    </div>
  )
}

export default App
