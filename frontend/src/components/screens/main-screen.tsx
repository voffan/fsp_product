import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { ContestService } from "../../services/contest/contest.service"

import ContestTable from "../ui/contest-table/contest-table"
import Filters from "../ui/filters/filters"
import Pagination from "../ui/pagination/pagination"

const MainScreen = () => {
  const [searchParams] = useSearchParams()

  const { data, isLoading } = useQuery({
    queryKey: ["contests", searchParams.toString()],
    queryFn: () => ContestService.getAll(searchParams.toString()),
  })

  if (data)
    return (
      <div className="w-full flex flex-col gap-3">
        {/* Фильтры */}
        <Filters />

        {/* Таблица мероприятий */}
        <ContestTable data={data.data} isLoading={isLoading} />

        {/* Пагинация */}
        <Pagination pagination={data.pages} />
      </div>
    )
}

export default MainScreen
