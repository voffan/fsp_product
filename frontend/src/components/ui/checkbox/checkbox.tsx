import { FC } from "react"
import { ICheckboxProps } from "./checkbox.interface"

const Checkbox: FC<ICheckboxProps> = ({
  direction = "col",
  label = "",
  checked = false,
  size = "4",
  labelSize = "xs",
  ...rest
}) => {
  return (
    <div className={`flex flex-${direction} gap-1 justify-start items-center`}>
      <input
        id={label}
        onChange={() => {}}
        type="checkbox"
        checked={checked}
        className={`h-${size} w-${size}`}
        {...rest}
      />

      <label htmlFor={label} className={`text-${labelSize} whitespace-nowrap`}>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
