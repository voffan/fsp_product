import { FC } from "react"
import { IIconProps } from "./icon.interface"

const CrossIcon: FC<IIconProps> = ({ size = 10, color = "black" }) => {
  if (size === 10)
    return (
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="10" height="10" fill="url(#pattern0_3374_299)" />
        <defs>
          <pattern
            id="pattern0_3374_299"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_3374_299" transform="scale(0.0416667)" />
          </pattern>
          <image
            id="image0_3374_299"
            width="24"
            height="24"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVR4nO2VQQ7DIAwE+URR+rw9eOX6uc2hz0mF1ENUBWK7iXqJT0h4dxJYoJSrokXyoao1qlPV2rTDJhExkouIzBGIqtam+Wit2wjgRvLZGkm+SN73zL81ZjaFBBxAwuYRCLLmHgh+NR9BcJR5JyHzepyJs+dPlkO+fA9AR4T/v0TY2NDMYXSbl85cGOKJIrKQSM4RhWQOESKQ06/r0x+cq8pGvQGLCguZk85BHgAAAABJRU5ErkJggg=="
          />
        </defs>
      </svg>
    )
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.3536 5.35355C19.5488 5.15829 19.5488 4.84171 19.3536 4.64645C19.1583 4.45118 18.8417 4.45118 18.6464 4.64645L12 11.2929L5.35355 4.64645C5.15829 4.45118 4.84171 4.45118 4.64645 4.64645C4.45119 4.84171 4.45119 5.15829 4.64645 5.35355L11.2929 12L4.64645 18.6464C4.45118 18.8417 4.45118 19.1583 4.64645 19.3536C4.84171 19.5488 5.15829 19.5488 5.35355 19.3536L12 12.7071L18.6464 19.3536C18.8417 19.5488 19.1583 19.5488 19.3536 19.3536C19.5488 19.1583 19.5488 18.8417 19.3536 18.6464L12.7071 12L19.3536 5.35355Z"
        fill={color}
      />
    </svg>
  )
}

export default CrossIcon
