import { useContext } from "react"
import { FiltersContext } from "../../../../providers/filters-provider"

import Checkbox from "../../checkbox/checkbox"
import Loader from "../../loader/loader"

const DisciplineFilter = () => {
  const { disciplines, isDisciplinesLoading, toggleFilter, isActive } =
    useContext(FiltersContext)

  return (
    <div className="">
      {isDisciplinesLoading ? (
        <Loader />
      ) : disciplines && disciplines.length > 0 ? (
        <div className="cursor-pointer flex flex-col gap-1 justify-start items-start">
          {disciplines.map((discipline) => (
            <Checkbox
              onClick={() => {
                toggleFilter("discipline", discipline.id.toString())
              }}
              checked={isActive("discipline", discipline.id.toString())}
              direction="row"
              key={discipline.id}
              label={discipline.name}
            />
          ))}
        </div>
      ) : (
        <div className="text-xs whitespace-nowrap">
          Дисциплин нет, выберите вид спорта
        </div>
      )}
    </div>
  )
}

export default DisciplineFilter
