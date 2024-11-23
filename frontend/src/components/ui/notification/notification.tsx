import { FC, useState } from "react"
import { INotificationWindowProp } from "./notification.interface"
import { NotificationService } from "../../../services/notification/notification.service"

import CrossIcon from "../icons/cross.icon"
import cn from "clsx"

const NotificationWindow: FC<INotificationWindowProp> = ({ id, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <div
      className={cn(
        isOpen ? "block" : "hidden",
        "w-full h-full relative shadow-lg min-w-[500px] p-10 border-[1px] border-gray2 rounded-xl z-[100] bg-white",
        "select-none"
      )}
    >
      <div
        onClick={async () => {
          setIsOpen(false)
          await NotificationService.delete(id)
        }}
        className="absolute top-2 right-2 cursor-pointer"
      >
        <CrossIcon size="24" />
      </div>
      Уведомление{children}
    </div>
  )
}

export default NotificationWindow
