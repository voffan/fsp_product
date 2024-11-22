import { create } from "zustand"
import { IUser } from "../interfaces/user"
import { AuthService } from "../services/auth/auth.service"
import { removeFromStorage, setToken } from "../services/auth/auth.helper"

interface IUserStore {
  isLoading: boolean
  isAuth: boolean
  user: IUser | null
  isError: boolean
  error: string | null
  check: () => void
  login: () => void
  register: () => void
  logout: () => void
}

export const useUserStore = create<IUserStore>((set) => ({
  isLoading: true,
  isAuth: false,
  user: null,
  isError: false,
  error: null,
  check: async () => {
    set({
      isLoading: true,
      isAuth: false,
      isError: false,
      error: null,
    })

    const isLogged = await AuthService.check()

    if (!isLogged) {
      removeFromStorage()
      set({
        isLoading: false,
        isAuth: false,
        isError: false,
        error: null,
      })
    } else
      set({
        isLoading: false,
        isAuth: true,
        isError: false,
        error: null,
      })
  },
  login: async () => {
    
  },
  register: async () => {},
  logout: async () => {
    set({
      isLoading: true,
      isAuth: false,
      isError: false,
      error: null,
    })

    removeFromStorage()

    set({
      isLoading: false,
      isAuth: false,
      isError: false,
      error: null,
    })
  },
}))
