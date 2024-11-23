import { FC, useContext } from "react"
import { IPaginationProps } from "./pagination.interface"
import { FiltersContext } from "../../../providers/filters-provider"

import ArrowDownIcon from "../icons/arrow-down.icon"

const Pagination: FC<IPaginationProps> = ({ pagination }) => {
  const { total, cur_page } = pagination

  const { setCurPage } = useContext(FiltersContext)

  return (
    <div className="w-full flex flex-row justify-end">
      <div className="flex flex-row">
        <div className="flex flex-row gap-3">
          <div
            onClick={() => {
              if (cur_page !== 1) setCurPage((Number(cur_page) - 1).toString())
            }}
            className={(cur_page !== 1 ? "cursor-pointer" : "") + "rotate-90"}
          >
            <ArrowDownIcon color={cur_page !== 1 ? "black" : "gray"} />
          </div>

          <div className="">
            {cur_page} / {total}
          </div>

          <div
            onClick={() => {
              if (cur_page !== total - 1)
                setCurPage((Number(cur_page) + 1).toString())
            }}
            className={
              (cur_page !== total ? "cursor-pointer " : "") + "-rotate-90"
            }
          >
            <ArrowDownIcon color={cur_page !== total ? "black" : "gray"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination
