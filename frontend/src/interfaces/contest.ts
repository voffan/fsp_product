import { ICity } from "./city"

export interface IContest {
  id: number
  program: string
  code: string
  start: Date
  end: Date
  place: ICity
  contestants: number
}

export interface ContestType {
  id: number
  name: string
}
