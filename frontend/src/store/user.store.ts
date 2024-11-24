import { create } from "zustand"
import { IUser } from "../interfaces/user"
import { AuthService } from "../services/auth/auth.service"
import {
  getToken,
  removeFromStorage,
  setToken,
} from "../services/auth/auth.helper"
import { IEmailPassword, IRegistartionData } from "../interfaces/auth"
import { UserService } from "../services/user/user.service"

interface IUserStore {
  isLoading: boolean
  isLogin: boolean
  isAuth: boolean
  user: IUser | null
  isError: boolean
  error: string | null
  setIsLogin: (data: boolean) => void
  setUser: (data: IUser) => void
  check: () => void
  login: (data: IEmailPassword) => void
  register: (data: IRegistartionData) => void
  logout: () => void
}

export const useUserStore = create<IUserStore>((set) => ({
  isLoading: true,
  isLogin: true,
  isAuth: false,
  user: null,
  isError: false,
  error: null,
  setIsLogin: (data: boolean) => {
    set({
      isLogin: data,
    })
  },
  setUser: (data: IUser) => {
    set({
      user: data,
    })
  },
  check: async () => {
    set({
      isLoading: false,
      isAuth: false,
      isError: false,
      error: null,
    })

    const token = getToken()

    let isLogged = false

    if (token) {
      isLogged = await AuthService.check()
    }

    if (!isLogged) {
      removeFromStorage()

      set({
        isLoading: false,
        isAuth: false,
        isError: false,
        error: null,
        user: null,
      })
    } else {
      const user = await UserService.getProfile()

      set({
        isLoading: false,
        isAuth: true,
        isError: false,
        error: null,
        user,
      })
    }
  },
  login: async (data: IEmailPassword) => {
    set({
      isLoading: true,
      isAuth: false,
      isError: false,
      error: null,
    })

    try {
      const response = await AuthService.login(data)
      setToken(response.token)
      set({
        isLoading: false,
        isAuth: true,
        isError: false,
        error: null,
      })
    } catch (error: any) {
      set({
        isLoading: false,
        isAuth: false,
        isError: true,
        error: error.response.data.errors[0],
      })
    }
  },
  register: async (data: IRegistartionData) => {
    set({
      isLoading: true,
      isAuth: false,
      isError: false,
      error: null,
    })

    try {
      const response = await AuthService.register(data)
      setToken(response.token)
      set({
        isLoading: false,
        isAuth: true,
        isError: false,
        error: null,
      })
    } catch (error: any) {
      set({
        isLoading: false,
        isAuth: false,
        isError: true,
        error: error.response.data.errors[0],
      })
    }
  },
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
