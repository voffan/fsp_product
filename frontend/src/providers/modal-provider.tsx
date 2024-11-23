import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { useLocation } from "react-router"

interface IModalProvider {
  isChangeAvatarOpen: boolean
  isProfileMenuOpen: boolean
  setIsChangeAvatarOpen: Dispatch<SetStateAction<boolean>>
  setIsProfileMenuOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext<IModalProvider>({
  isChangeAvatarOpen: false,
  isProfileMenuOpen: false,
  setIsChangeAvatarOpen: () => {},
  setIsProfileMenuOpen: () => {},
})

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState<boolean>(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false)

  const { pathname } = useLocation()

  useEffect(() => {
    setIsProfileMenuOpen(false)
  }, [pathname])

  return (
    <ModalContext.Provider
      value={{
        isChangeAvatarOpen,
        isProfileMenuOpen,
        setIsChangeAvatarOpen,
        setIsProfileMenuOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
