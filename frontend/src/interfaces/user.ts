export interface IUser {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
}

export interface IUserChange {
  email?: string
  first_name?: string
  second_name?: string
  last_name?: string
  subscribe?: boolean
}
