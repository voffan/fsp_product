import { Dispatch, SetStateAction } from "react"
import { IFilter } from "../../../interfaces/filter"

export interface IFilterItemProps {
  filter: IFilter
  setFilters: Dispatch<SetStateAction<IFilter[]>>
}
