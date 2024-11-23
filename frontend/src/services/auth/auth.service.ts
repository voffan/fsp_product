import { instance } from "../../api/api.interceptor"
import {
  IAuthCheckResponse,
  IAuthResponse,
  IEmailPassword,
  IRegistartionData,
} from "../../interfaces/auth"

export const AuthService = {
  async check(): Promise<boolean> {
    const response = await instance<IAuthCheckResponse>({
      url: "/userapi/check-token/",
      method: "GET",
    })

    return response.data.detail
  },

  async login(data: IEmailPassword): Promise<IAuthResponse> {
    const response = await instance({
      url: "/userapi/api-token-auth/",
      method: "POST",
      data,
    })

    return response.data
  },

  async register(data: IRegistartionData): Promise<IAuthResponse> {
    const response = await instance({
      url: "/userapi/users/create/",
      method: "POST",
      data: {
        username: data.username,
        password: data.password,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      },
    })

    return response.data
  },
}
