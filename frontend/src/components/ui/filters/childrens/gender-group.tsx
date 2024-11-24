import { useContext } from "react"
import { FiltersContext } from "../../../../providers/filters-provider"

import Checkbox from "../../checkbox/checkbox"

const GenderGroupFilter = () => {
  const { toggleFilter, isActive, male, female } = useContext(FiltersContext)

  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        onClick={() => {
          toggleFilter("male", "Мужской")
        }}
        checked={isActive("male", "Мужской")}
        direction="row"
        label="Мужской"
      />
      <Checkbox
        onClick={() => {
          toggleFilter("female", "Женский")
        }}
        checked={isActive("female", "Женский")}
        direction="row"
        label="Женский"
      />
    </div>
  )
}

export default GenderGroupFilter
