import { FC } from "react"
import { IFilterItemProps } from "./filter-item.interface"

import ArrowDownIcon from "../icons/arrow-down.icon"

const FilterItem: FC<IFilterItemProps> = ({ filter, setFilters }) => {
  return (
    <div onClick={() => {setFilters(prev => [])}} className="flex flex-row gap-1 justify-start items-center rounded-lg p-3 border-[1px] border-black cursor-pointer">
      <div className="text-xs">{filter.label}</div>

      <div className={filter.isOpen ? "rotate-180" : "rotate-0"}>
        <ArrowDownIcon />
      </div>
    </div>
  )
}

export default FilterItem
