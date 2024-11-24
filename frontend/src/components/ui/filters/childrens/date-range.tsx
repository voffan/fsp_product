import { useContext, useState } from "react"
import { FiltersContext } from "../../../../providers/filters-provider"
import { IDatePicker } from "../../../../interfaces/date-picker"

import Datepicker from "react-tailwindcss-datepicker"

import "dayjs/locale/ru"


const DateRangeFilter = () => {
  const [value, setValue] = useState<IDatePicker>({
    startDate: null,
    endDate: null,
  })

  const { handleDateRangeFilters } = useContext(FiltersContext)


  return (
    <div className="min-w-[300px]">
      <Datepicker
        i18n="ru"
        placeholder="Выберите сроки проведения"
        primaryColor="teal"
        useRange={false}
        value={value}
        onChange={(date: any) => {
          setValue(date)
          handleDateRangeFilters(date)
        }}
      />
    </div>
  )
}

export default DateRangeFilter
