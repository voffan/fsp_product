import OdnoklassnikiIcon from "../icons/odnoklassniki.icon"
import TelegramIcon from "../icons/telegram.icon"
import VkIcon from "../icons/vk.icon"
import WhatsappIcon from "../icons/whatsapp.icon"
import YoutubeIcon from "../icons/youtube.icon"
import Logo from "../logo/logo"

const Footer = () => {
  return (
    <div className="w-full mx-auto h-[220px] flex flex-col px-8">
      <div className="w-full flex flex-col gap-5 border-b-[1px] border-smoke pt-8">
        {/* Логотип и контакты с адресом */}
        <div className="w-full flex flex-row justify-between items-center">
          <Logo />

          <div className="">Министерство спорта России</div>

          <div className="">677000, Якутск, ул. Кулаковского 48</div>

          <div className="text-darkblue">
            +7 (495) 720-53-80
            <br />
            info@minsport.gov.ru
          </div>
        </div>

        {/* Ссылки */}
        <div className="flex flex-row justify-center items-center gap-10 pb-6">
          <a className="cursor-pointer">
            <TelegramIcon />
          </a>
          <a className="cursor-pointer">
            <OdnoklassnikiIcon />
          </a>
          <a className="cursor-pointer">
            <WhatsappIcon />
          </a>
          <a className="cursor-pointer">
            <VkIcon />
          </a>
          <a className="cursor-pointer">
            <YoutubeIcon />
          </a>
        </div>
      </div>
      {/* Надпись Министерство спорта России */}
      <div className="w-full h-full flex justify-center items-center">
        © МИНИСТЕРСТВО СПОРТА РОССИИ, 2008-2024
      </div>
    </div>
  )
}

export default Footer
