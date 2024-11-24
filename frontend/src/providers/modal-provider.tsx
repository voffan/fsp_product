import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { useLocation } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { INotification } from "../interfaces/notification"
import { NotificationService } from "../services/notification/notification.service"

import NotificationWindow from "../components/ui/notification/notification"
import LoaderScreen from "../components/ui/loader/loader-screen"
import { useUserStore } from "../store/user.store"

interface IModalProvider {
  isChangeAvatarOpen: boolean
  isProfileMenuOpen: boolean
  notifications: INotification[]
  setIsChangeAvatarOpen: Dispatch<SetStateAction<boolean>>
  setIsProfileMenuOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext<IModalProvider>({
  isChangeAvatarOpen: false,
  isProfileMenuOpen: false,
  notifications: [],
  setIsChangeAvatarOpen: () => {},
  setIsProfileMenuOpen: () => {},
})

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState<boolean>(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false)

  const { pathname } = useLocation()
  const { isAuth } = useUserStore()

  const { data: notifications, isLoading: isNotificationsLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => (isAuth ? NotificationService.getAll() : null),
  })

  useEffect(() => {
    setIsProfileMenuOpen(false)
  }, [pathname])

  if (isNotificationsLoading) return <LoaderScreen />

  return (
    <ModalContext.Provider
      value={{
        isChangeAvatarOpen,
        isProfileMenuOpen,
        setIsChangeAvatarOpen,
        setIsProfileMenuOpen,
        notifications: notifications || [],
      }}
    >
      <div className="absolute top-20 right-8 flex flex-col gap-2 z-50">
        {notifications &&
          notifications.map((notification) => (
            <NotificationWindow id={notification.id} key={notification.id}>
              {notification.text}
            </NotificationWindow>
          ))}
      </div>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
