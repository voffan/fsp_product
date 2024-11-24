import { useContext, useState } from "react"
import { IFilter } from "../../../interfaces/filter"
import { FiltersContext } from "../../../providers/filters-provider"
import { convertDate } from "../../utils/format-date"

import FilterItem from "../filter-item/filter-item"
import SportTypeFilter from "./childrens/sport-type"
import DisciplineFilter from "./childrens/discipline"
import ProgramFilter from "./childrens/program"
import ContestmentsFilter from "./childrens/contestments"
import GenderGroupFilter from "./childrens/gender-group"
import AgeGroupFilter from "./childrens/age-group"
import ContestTypeFilter from "./childrens/contest-type"
import ActiveFilterItem from "../active-filter-item/active-filter-item"
import DateRangeFilter from "./childrens/date-range"

const allFilters: IFilter[] = [
  { id: 0, label: "Вид спорта", isOpen: false, children: <SportTypeFilter /> },
  { id: 1, label: "Дисциплина", isOpen: false, children: <DisciplineFilter /> },
  { id: 2, label: "Программа", isOpen: false, children: <ProgramFilter /> },
  {
    id: 3,
    label: "Количество участников",
    isOpen: false,
    children: <ContestmentsFilter />,
  },
  { id: 4, label: "Пол", isOpen: false, children: <GenderGroupFilter /> },
  {
    id: 5,
    label: "Возрастная группа",
    isOpen: false,
    children: <AgeGroupFilter />,
  },
  {
    id: 6,
    label: "Сроки проведения",
    isOpen: false,
    children: <DateRangeFilter />,
  },
  {
    id: 7,
    label: "Тип соревнования",
    isOpen: false,
    children: <ContestTypeFilter />,
  },
  // {
  //   id: 8,
  //   label: "Место проведения",
  //   isOpen: false,
  //   children: <PlaceFilter />,
  // },
]

const Filters = () => {
  const [filters, setFilters] = useState<IFilter[]>(allFilters)

  const {
    sporttypes,
    disciplines,
    contesttypes,
    activeSportTypes,
    activeDisciplines,
    activeContestTypes,
    handleFilterChange,
    handleGenderClear,
    handleClearFilter,
    dateend,
    datestart,
    male,
    female,
    mincontestant,
    maxcontestant,
  } = useContext(FiltersContext)

  return (
    <div className="flex flex-col gap-2">
      {/* Облако включенных фильтров */}
      <div className="flex flex-row gap-2 flex-wrap">
        {activeSportTypes.length > 0 && (
          <ActiveFilterItem
            label={
              "Вид спорта: " +
              sporttypes
                .map((item, index) => {
                  if (activeSportTypes.includes(item.id.toString()))
                    if (index === activeSportTypes.length - 1) return item.name
                    else return item.name + " "
                })
                .join("")
            }
            onClick={() => handleFilterChange("sporttype", "")}
          />
        )}
        {activeDisciplines.length > 0 && activeSportTypes && (
          <ActiveFilterItem
            label={
              "Дисциплина: " +
              disciplines
                .map((item, index) => {
                  if (activeDisciplines.includes(item.id.toString()))
                    if (index === activeDisciplines.length - 1) return item.name
                    else return item.name + " "
                })
                .join("")
            }
            onClick={() => handleFilterChange("discipline", "")}
          />
        )}
        {datestart && (
          <ActiveFilterItem
            label={"Дата начала: " + convertDate(datestart)}
            onClick={() => handleFilterChange("datestart", "")}
          />
        )}
        {dateend && (
          <ActiveFilterItem
            label={"Дата конца: " + convertDate(dateend)}
            onClick={() => handleFilterChange("dateend", "")}
          />
        )}
        {(male || female) && (
          <ActiveFilterItem
            label={"Пол: " + [male, female].join(" ")}
            onClick={() => {
              handleGenderClear()
            }}
          />
        )}
        {activeContestTypes.length > 0 && (
          <ActiveFilterItem
            label={
              "Тип соревнования: " +
              contesttypes
                .map((item) =>
                  activeContestTypes.includes(item.id.toString())
                    ? item.name
                    : null
                )
                .join(" ")
            }
            onClick={() => {
              handleClearFilter("contesttype")
            }}
          />
        )}
        {mincontestant && (
          <ActiveFilterItem
            label={"Минимальное количество участников: " + mincontestant}
            onClick={() => {
              handleClearFilter("mincontestant")
            }}
          />
        )}
        {maxcontestant && (
          <ActiveFilterItem
            label={"Максимальное количество участников: " + maxcontestant}
            onClick={() => {
              handleClearFilter("maxcontestant")
            }}
          />
        )}
        <ActiveFilterItem label="Удалить все" withIcon={false} />
        <ActiveFilterItem label="Сохранить" withIcon={false} />
      </div>

      {/* Фильтры */}
      <div className="flex flex-row gap-2 flex-wrap">
        {/* Фильтры */}
        {filters.map((filter) => (
          <div key={filter.id} className="relative">
            <FilterItem
              setIsOpen={(isOpen: boolean) =>
                setFilters((prev) =>
                  prev.map((item) =>
                    item.id === filter.id
                      ? { ...item, isOpen: isOpen }
                      : { ...item, isOpen: false }
                  )
                )
              }
              filter={filter}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filters
