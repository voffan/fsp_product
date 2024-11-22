import { useState } from "react"
import { useUserStore } from "../../../store/user.store"

import Logo from "../logo/logo"
import cn from "clsx"
import { Link } from "react-router"

const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false)

  const { logout } = useUserStore()

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
          onClick={() => setIsProfileMenuOpen((prev) => !prev)}
          className="h-14 w-14 bg-lightgreen rounded-full relative cursor-pointer"
        >
          <div
            className={cn(
              isProfileMenuOpen ? "flex" : "hidden",
              "absolute flex-col top-[64px] right-0 rounded-xl overflow-hidden bg-white shadow-lg",
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
        </div>
      </div>
    </header>
  )
}

export default Header
