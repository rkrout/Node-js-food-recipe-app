import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { adminRoutes } from "./routes/adminRoutes"
import { userRoutes } from "./routes/userRoutes"

function App() {
  return useRoutes([
    ...adminRoutes,
    ...userRoutes
  ])
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)