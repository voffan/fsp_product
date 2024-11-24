import { useQuery } from "@tanstack/react-query"
import { AgeGroupService } from "../../../../services/contest/age-group.service"

import Loader from "../../loader/loader"
import Checkbox from "../../checkbox/checkbox"

const AgeGroupFilter = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["age groups"],
    queryFn: AgeGroupService.getAll,
  })

  return (
    <div className="flex flex-col gap-1">
      {isLoading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        data.map((agegroup) => (
          <Checkbox
            direction="row"
            key={agegroup.id}
            label={`от ${agegroup.start} до ${agegroup.end} лет`}
          />
        ))
      ) : (
        <div className="text-xs">Возрастных групп нет</div>
      )}
    </div>
  )
}

export default AgeGroupFilter
