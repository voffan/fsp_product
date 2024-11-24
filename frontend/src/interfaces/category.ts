import { IAgeGroup } from "./age-group"
import { IGenderGroup } from "./gender-gorup"

export interface ICategory {
  id: number
  age: IAgeGroup
  gender: IGenderGroup
}

export interface IGetAllCategories {
  data: ICategory[]
}

export interface IGetCategory {
  data: ICategory
}
