import { useContext } from "react"
import { Link } from "react-router"
import { ModalContext } from "../../../providers/modal-provider"

import Logo from "../logo/logo"
import ProfileMenu from "../profile-menu/profile-menu"
import UserIcon from "../icons/user.icon"

const Header = () => {
  const { setIsProfileMenuOpen } = useContext(ModalContext)

  return (
    <header className="w-full px-8 h-16 flex flex-row justify-between items-center">
      {/* Логотип */}
      <div className="w-14 h-14">
        <Logo />
      </div>

      {/* Ссылки и аватарка */}
      <div className="w-full flex justify-between items-center gap-8">
        {/* Ссылки */}
        <div className="w-full flex flex-row justify-end gap-2">
          <Link to="/" className="cursor-pointer">
            Главная
          </Link>
        </div>

        {/* Аватарка */}
        <div
          onClick={() => {
            setIsProfileMenuOpen((prev) => !prev)
          }}
          className="h-14 w-14 aspect-square bg-[url('/user.png')] bg-cover bg-center rounded-full relative cursor-pointer"
        >
          <div className="relative">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
