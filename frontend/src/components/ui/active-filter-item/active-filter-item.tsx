import { FC } from "react"
import { IActiveFilterItemProps } from "./active-filter-item.interface"

import CrossIcon from "../icons/cross.icon"

const ActiveFilterItem: FC<IActiveFilterItemProps> = ({
  label,
  withIcon = true,
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      className="flex flex-row items-center gap-1 py-1 px-2 bg-gray2 rounded-lg cursor-pointer"
    >
      <div className="text-[0.65rem] text-[rgb(0,0,0,0.5)] leading-[0.85rem] whitespace-nowrap">
        {label}
      </div>

      {withIcon && (
        <div className="cursor-pointer">
          <CrossIcon />
        </div>
      )}
    </div>
  )
}

export default ActiveFilterItem
