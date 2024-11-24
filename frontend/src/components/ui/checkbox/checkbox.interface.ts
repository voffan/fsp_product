import { HTMLAttributes } from "react"

export interface ICheckboxProps extends HTMLAttributes<HTMLInputElement> {
  direction?: "row" | "column" | "row-reverse" | "column-reverse"
  label?: string
  checked?: boolean,
  size?: string 
  labelSize?: string
}
