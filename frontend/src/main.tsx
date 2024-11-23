import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Router from "./router/router"
import AuthProvider from "./providers/auth-provider"
import ModalProvider from "./providers/modal-provider"

import "./assets/styles/globals.css"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <Router />
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
)
