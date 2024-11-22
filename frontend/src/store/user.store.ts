import { create } from "zustand"
import { IUser } from "../interfaces/user"
import { AuthService } from "../services/auth/auth.service"
import {
  getToken,
  removeFromStorage,
  setToken,
} from "../services/auth/auth.helper"
import { IEmailPassword, IRegistartionData } from "../interfaces/auth"

interface IUserStore {
  isLoading: boolean
  isAuth: boolean
  user: IUser | null
  isError: boolean
  error: string | null
  check: () => void
  login: (data: IEmailPassword) => void
  register: (data: IRegistartionData) => void
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
      })
    } else
      set({
        isLoading: false,
        isAuth: true,
        isError: false,
        error: null,
      })
  },
  login: async (data: IEmailPassword) => {
    set({
      isLoading: true,
      isAuth: false,
      isError: false,
      error: null,
    })

    const response = await AuthService.login(data)

    if (response.token) {
      setToken(response.token)
      set({
        isLoading: false,
        isAuth: true,
        isError: false,
        error: null,
      })
    } else {
      set({
        isLoading: false,
        isAuth: false,
        isError: true,
        error: "Ошибка",
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

    const response = await AuthService.register(data)

    if (response.token) {
      setToken(response.token)
      set({
        isLoading: false,
        isAuth: true,
        isError: false,
        error: null,
      })
    } else {
      set({
        isLoading: false,
        isAuth: false,
        isError: true,
        error: "Ошибка",
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
