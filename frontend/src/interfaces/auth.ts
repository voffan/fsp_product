export interface IAuthResponse {
  token: string
}

export interface IEmailPassword {
  email: string
  password: string
}

export interface IRegistartionData extends IEmailPassword {
  username: string
  first_name: string
  last_name: string
}

export interface IRegistartionDataWithSecondName extends IRegistartionData {
  second_name?: string
}

export interface IAuthCheckResponse {
  detail: boolean
}
