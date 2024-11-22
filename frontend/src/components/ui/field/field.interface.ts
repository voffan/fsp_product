import { InputHTMLAttributes } from "react"

export interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string
  label?: string
  placeholder?: string
  error?: string | null
  disabled?: boolean
}
