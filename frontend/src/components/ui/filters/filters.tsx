import { useState } from "react"

import FilterItem from "../filter-item/filter-item"

interface IFilter {
  id: number
  label: string
  isOpen: boolean
}

const allFilters: IFilter[] = [
  { id: 0, label: "Дьулуур", isOpen: false },
  { id: 1, label: "Дьулуур", isOpen: false },
  { id: 2, label: "Дьулуур", isOpen: false },
  { id: 3, label: "Дьулуур", isOpen: true },
  { id: 4, label: "Дьулуур", isOpen: false },
  { id: 5, label: "Дьулуур", isOpen: false },
]

const Filters = () => {
  const [filters, setFilters] = useState<IFilter[]>(allFilters)

  return (
    <div className="flex flex-row gap-2 px-8">
      {filters.map((filter, index) => (
        <FilterItem setFilters={setFilters} label={filter.label} isOpen={filter.isOpen} />
      ))}
    </div>
  )
}

export default Filters
