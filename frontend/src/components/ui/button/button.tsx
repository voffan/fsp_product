import { FC } from "react"
import { IButtonProps } from "./button.interface"

import cn from "clsx"

const Button: FC<IButtonProps> = ({
  className,
  children,
  disabled,
  type="button",
  ...rest
}) => {
  return (
    <button
      className={cn(
        className ? "" : "py-5 px-5",
        disabled ? "bg-gray" : "bg-lightgreen",
        "rounded-xl flex justify-center items-center w-full text-white cursor-pointer",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
