import { createContext, ReactNode, useEffect } from "react"
import { useUserStore } from "../store/user.store"
import { useLocation, useNavigate } from "react-router"

import LoaderScreen from "../components/ui/loader/loader-screen"

interface IAuthContext {}

export const AuthContext = createContext<IAuthContext>({})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { check, isAuth, isLoading } = useUserStore()

  const { pathname } = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      await check()
    }

    checkAuth()
  }, [check])

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (isAuth) {
  //       if (pathname === "/auth") {
  //         navigate("/")
  //       }
  //     } else {
  //       if (pathname !== "/auth") {
  //         navigate("/auth")
  //       }
  //     }
  //   }
  // }, [isAuth, isLoading, pathname, navigate])

  if (isLoading) return <LoaderScreen />

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

export default AuthProvider
