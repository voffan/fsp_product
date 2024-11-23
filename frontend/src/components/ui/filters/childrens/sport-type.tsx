import { useContext } from "react"
import { FiltersContext } from "../../../../providers/filters-provider"

import Loader from "../../loader/loader"
import Checkbox from "../../checkbox/checkbox"

const SportTypeFilter = () => {
  const { sporttypes, isSportTypesLoading, toggleFilter, isActive } =
    useContext(FiltersContext)

  return (
    <div className="">
      {isSportTypesLoading ? (
        <Loader />
      ) : sporttypes && sporttypes.length > 0 ? (
        <div className="cursor-pointer flex flex-col gap-1 justify-start items-start">
          {sporttypes.map((sporttype) => (
            <Checkbox
              onClick={() => {
                toggleFilter("sporttype", sporttype.id.toString())
              }}
              checked={isActive("sporttype", sporttype.id.toString())}
              direction="row"
              key={sporttype.id}
              label={sporttype.name}
            />
          ))}
        </div>
      ) : (
        <div className="text-xs">Видов спорта нет</div>
      )}
    </div>
  )
}

export default SportTypeFilter
