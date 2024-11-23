import { FC, useContext } from "react"
import { IProfileMenuProps } from "./profile-menu.interface"
import { Link } from "react-router"
import { useUserStore } from "../../../store/user.store"
import { ModalContext } from "../../../providers/modal-provider"

import cn from "clsx"

const ProfileMenu: FC<IProfileMenuProps> = ({}) => {
  const { logout } = useUserStore()

  const { isProfileMenuOpen } = useContext(ModalContext)

  return (
    <>
      <div
        className={cn(
          isProfileMenuOpen ? "flex" : "hidden",
          "absolute flex-col top-[64px] right-0 rounded-xl overflow-hidden bg-white shadow-lg z-10",
          "transition-all delay-200"
        )}
      >
        <Link
          to="/profile"
          className="p-2 cursor-pointer whitespace-nowrap hover:bg-gray"
        >
          Мой профиль
        </Link>
        <div
          onClick={() => logout()}
          className="p-2 cursor-pointer hover:bg-gray"
        >
          Выйти
        </div>
      </div>
    </>
  )
}

export default ProfileMenu
