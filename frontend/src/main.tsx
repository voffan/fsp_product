import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"

import Router from "./router/router"

import "./assets/styles/globals.css"
import AuthProvider from "./providers/auth-provider"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </BrowserRouter>
)
