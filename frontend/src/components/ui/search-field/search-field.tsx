import { InputHTMLAttributes, forwardRef } from "react"
import { IFieldProps } from "../field/field.interface"

import cn from "clsx"

const SearchField = forwardRef<
  HTMLInputElement,
  IFieldProps & InputHTMLAttributes<HTMLInputElement>
>(
  (
    {
      label = "",
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
        {!disabled && (
          <label>
            <div className="text-xl">{label}</div>
          </label>
        )}

        <div className="w-full">
          <input
            ref={ref}
            type={"search"}
            disabled={disabled}
            className={cn(
              className ? "" : "py-3 px-4 text-xl placeholder:text-xl",
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

export default SearchField
