import { FC, useContext } from "react"
import { IContestTableRowProps } from "./contest-table-row.interface"
import { FiltersContext } from "../../../providers/filters-provider"
import { SubscriptionContext } from "../../../providers/subscription-provider"

const ContestTableRow: FC<IContestTableRowProps> = ({
  contest,
  isOdd = false,
}) => {
  const { cities, countries, contesttypes } = useContext(FiltersContext)
  const { subscriptions, subscribe, unsubscribe } =
    useContext(SubscriptionContext)

  const isSubscribed = subscriptions.find((item) => item.contest === contest.id)

  return (
    <tr className={isOdd ? "bg-whitespace" : "bg-white2"}>
      <td>{contest.code}</td>
      <td>
        {contesttypes.find((item) => item.id === contest.contest_type)?.name}
        <br />
        {contest.program}
        <br />
        {(contest.male ? "Мужской" : "") +
          " " +
          (contest.female ? "Женский" : "")}
      </td>
      <td>
        {contest.start}
        <br />
        {contest.end}
      </td>
      <td>
        {[
          countries.find((item) => item.id === contest.country)?.name,
          cities.find((item) => item.id === contest.place)?.region?.name,
          cities.find((item) => item.id === contest.place)?.region?.district
            ?.name,
          cities.find((item) => item.id === contest.place)?.name,
        ].join(" ")}
      </td>
      <td>{contest.contestants}</td>
      <td
        onClick={() => {
          isSubscribed ? unsubscribe([contest.id]) : subscribe([contest.id])
        }}
        className="text-blue cursor-pointer"
      >
        {!isSubscribed ? "Подписаться" : "Отписаться"}
      </td>
    </tr>
  )
}

export default ContestTableRow
