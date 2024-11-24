import { IFilter } from "../../../interfaces/filter"

export interface IFilterItemProps {
  filter: IFilter
  setIsOpen: (isOpen: boolean) => void
}
