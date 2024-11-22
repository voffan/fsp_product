export interface IAuthResponse {
  token: string
}

export interface IEmailPassword {
  email: string
  password: string
}

export interface IAuthCheckResponse {
  detail: boolean
}
