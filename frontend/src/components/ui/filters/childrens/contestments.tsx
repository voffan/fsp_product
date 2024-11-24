import { useContext } from "react"
import { FiltersContext } from "../../../../providers/filters-provider"

import Field from "../../field/field"

const ContestmentsFilter = () => {
  const { handleFilterChange, mincontestant, maxcontestant } =
    useContext(FiltersContext)

  return (
    <div className="flex flex-row gap-2 text-xs">
      <div className="flex flex-col gap-1">
        <div className="">От</div>
        <Field
          value={mincontestant}
          onChange={(e) => {
            handleFilterChange("mincontestant", e.target.value)
          }}
          type="number"
          className="py-2 px-4 text-xs placeholder:text-xs"
          placeholder="1"
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="">До</div>
        <Field
          value={maxcontestant}
          onChange={(e) => {
            handleFilterChange("maxcontestant", e.target.value)
          }}
          type="number"
          className="py-2 px-4 text-xs placeholder:text-xs"
          placeholder="1000"
        />
      </div>
    </div>
  )
}

export default ContestmentsFilter
