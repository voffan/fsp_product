import { FC } from "react"
import { IContestTableRowProps } from "./contest-table-row.interface"

const ContestTableRow: FC<IContestTableRowProps> = ({
  contest,
  isOdd = false,
}) => {
  return (
    <tr className={isOdd ? "bg-whitespace" : "bg-white"}>
      <td>{contest.code}</td>
      <td>{contest.program}</td>
      <td>
        {contest.start.toLocaleDateString()}
        <br />
        {contest.end.toLocaleDateString()}
      </td>
      <td>{contest.place.city + ", " + contest.place.region}</td>
      <td>{contest.contestants}</td>
    </tr>
  )
}

export default ContestTableRow
