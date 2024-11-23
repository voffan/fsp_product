import { FC } from "react"
import { IContestTableProps } from "./contest-table.interface"

import ContestTableRow from "../contest-table-row/contest-table-row"
import Loader from "../loader/loader"

const ContestTable: FC<IContestTableProps> = ({ data = [], isLoading }) => {
  return (
    <div className="w-full border-[1px] border-gray2 bg-white2 rounded-2xl overflow-hidden">
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
            <th>Подписка</th>
          </tr>
        </thead>

        {/* Тело таблицы */}
        <tbody>
          {isLoading ? (
            <tr className="">
              <td colSpan={6}>
                <div className="w-full flex justify-center items-center">
                  <Loader />
                </div>
              </td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((contest, index) => (
              <ContestTableRow
                key={contest.id}
                isOdd={index % 2 == 0}
                contest={contest}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <div className="w-full text-base">
                  Соревнований по заданным фильтрам нет
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContestTable
