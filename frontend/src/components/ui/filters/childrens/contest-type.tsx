import { useContext } from "react"
import { FiltersContext } from "../../../../providers/filters-provider"

import Loader from "../../loader/loader"
import Checkbox from "../../checkbox/checkbox"

const ContestTypeFilter = () => {
  const { contesttypes, isContestTypesLoading, toggleFilter, isActive } =
    useContext(FiltersContext)

  return (
    <div className="flex flex-col gap-1">
      {isContestTypesLoading ? (
        <Loader />
      ) : contesttypes.length > 0 ? (
        contesttypes.map((contesttype) => (
          <Checkbox
            key={contesttype.id}
            checked={isActive("contesttype", contesttype.id.toString())}
            onClick={() => {
              toggleFilter("contesttype", contesttype.id.toString())
            }}
            direction="row"
            label={contesttype.name}
          />
        ))
      ) : (
        <div className="text-xs">Типов соревнования нет</div>
      )}
    </div>
  )
}

export default ContestTypeFilter
