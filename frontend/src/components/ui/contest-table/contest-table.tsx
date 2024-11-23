import { IContest } from "../../../interfaces/contest"
import ContestTableRow from "../contest-table-row/contest-table-row"
import Filters from "../filters/filters"

const data: IContest[] = [
  {
    id: 0,
    code: "22232323",
    program: "Федерация спортивного программирования",
    start: new Date("11-22-2024"),
    end: new Date("11-22-2024"),
    contestants: 25,
    place: {
      id: 0,
      city: "г. Якутск",
      region: 0,
    },
  },
  {
    id: 1,
    code: "22232323",
    program: "Федерация спортивного программирования",
    start: new Date("11-22-2024"),
    end: new Date("11-22-2024"),
    contestants: 25,
    place: {
      id: 0,
      city: "г. Якутск",
      region: 0,
    },
  },
  {
    id: 2,
    code: "22232323",
    program: "Федерация спортивного программирования",
    start: new Date("11-22-2024"),
    end: new Date("11-22-2024"),
    contestants: 25,
    place: {
      id: 0,
      city: "г. Якутск",
      region: 0,
    },
  },
  {
    id: 3,
    code: "22232323",
    program: "Федерация спортивного программирования",
    start: new Date("11-22-2024"),
    end: new Date("11-22-2024"),
    contestants: 25,
    place: {
      id: 0,
      city: "г. Якутск",
      region: 0,
    },
  },
]

const ContestTable = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Фильтры */}
      <Filters />
      
      {/* Таблица мероприятий */}
      <div className="w-full rounded-3xl overflow-hidden border-[1px] border-gray2 flex flex-col">
        {/* Таблица мероприятий */}
        <table className="table-auto">
          {/* Шапка таблицы */}
          <thead className="py-3">
            <tr>
              <th>№ СМ в ЕКП</th>
              <th>
                Наименование спортивного мероприятия (пол, возрастная группа)
                (дисциплина, программа)
              </th>
              <th>Сроки проведения</th>
              <th>
                Место проведения (страна (-ы), субъект РФ, город) (спортивная
                база, центр)
              </th>
              <th>Количество участников(чел.)</th>
            </tr>
          </thead>

          {/* Тело таблицы */}
          <tbody>
            {data.map((contest, index) => (
              <ContestTableRow
                key={contest.id}
                isOdd={index % 2 == 0}
                contest={contest}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ContestTable
