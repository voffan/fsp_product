import { InputHTMLAttributes, forwardRef } from "react"
import { IFieldProps } from "./field.interface"

import cn from "clsx"

const Field = forwardRef<
  HTMLInputElement,
  IFieldProps & InputHTMLAttributes<HTMLInputElement>
>(
  (
    {
      label = "",
      type = "text",
      placeholder = "",
      error = "",
      disabled = false,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={cn("w-full flex flex-col justify-center items-start gap-3")}
      >
        {!disabled && label && (
          <label>
            <div className="text-xl">{label}</div>
          </label>
        )}

        <div className="w-full">
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(
              className ? "" : "text-xl placeholder:text-xl py-3 px-4 ",
              "w-full border-[1px] border-black placeholder:text-gray rounded-xl outline-none",
              className
            )}
            placeholder={placeholder}
            {...rest}
          />

          {error && !disabled && (
            <div className="pt-1 text-red-500">{error}</div>
          )}
        </div>
      </div>
    )
  }
)

export default Field
