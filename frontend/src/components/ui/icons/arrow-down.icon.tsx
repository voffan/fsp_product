import { FC } from "react"
import { IIconProps } from "./icon.interface"

const ArrowDownIcon: FC<IIconProps> = ({ color = "black" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width="12"
      height="12"
      fill={color}
      version="1.1"
      viewBox="0 0 330 330"
    >
      <g>
        <path d="M325.607 79.393c-5.857-5.857-15.355-5.858-21.213.001l-139.39 139.393L25.607 79.393c-5.857-5.857-15.355-5.858-21.213.001-5.858 5.858-5.858 15.355 0 21.213l150.004 150a15 15 0 0 0 21.212-.001l149.996-150c5.859-5.857 5.859-15.355.001-21.213"></path>
      </g>
    </svg>
  )
}

export default ArrowDownIcon
