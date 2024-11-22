import { FC } from "react"
import { IButtonProps } from "./button.interface"

import cn from "clsx"

const Button: FC<IButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button
      className={cn(
        "rounded-xl bg-lightgreen flex justify-center items-center py-5 px-auto w-full text-white",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
