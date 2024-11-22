import Logo from "../logo/logo"

const Header = () => (
  <header className="w-full h-16 flex flex-row justify-between items-center">
    {/* Логотип */}
    <div className="w-14 h-14 bg-blue-500">
      <Logo />
    </div>

    {/* Ссылки и аватарка */}
    <div className="w-full flex justify-between items-center">
      {/* Ссылки */}
      <div className="">
        <div className="cursor-pointer">Главная</div>
      </div>

      {/* Аватарка */}
      <div className="h-14 w-14 bg-lightgreen rounded-full"></div>
    </div>
  </header>
)

export default Header
