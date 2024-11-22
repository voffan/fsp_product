import { FC } from "react"
import { IContainerProps } from "./container.interface"

import cn from "clsx"

const Container: FC<IContainerProps> = ({ className, children }) => {
  return <div className={cn("w-[1366px] mx-auto", className)}>{children}</div>
}

export default Container
