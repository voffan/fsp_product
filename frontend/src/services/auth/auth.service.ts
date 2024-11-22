import { instance } from "../../api/api.interceptor"
import { IAuthCheckResponse, IEmailPassword } from "../../interfaces/auth"

export const AuthService = {
  async check(): Promise<boolean> {
    const response = await instance<IAuthCheckResponse>({
      url: "/userapi/check-token/",
      method: "GET",
    })

    return response.data.detail
  },

  async login(data: IEmailPassword) {
    const response = await instance({
      url: "/userapi/api-token-auth/",
      method: "POST",
      data,
    })

    
  },

  async register() {},
}
