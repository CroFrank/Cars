import { ChangeEvent, useEffect } from "react"
import Car from "../components/Car"
import Pagination from "../components/Pagination"
import FilterBtn from "../components/FilterBtn"
import SortBtn from "../components/SortBtn"
import { carsStore } from "../stores/CarsStore"
import { observer } from "mobx-react"

const Home = observer(() => {
  const {
    cars,
    filteredOption,
    sortedOption,
    currentPage,
    endIndex,
    currentCars,
    setFilteredOption,
    setSortedOption,
    setCurrentPage,
    carsPerPage,
    accessCars,
  } = carsStore

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilteredOption(e.target.value)
  }
  const handleSortedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortedOption(e.target.value)
  }
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  useEffect(() => {
    const getCars = async () => {
      await accessCars()
    }
    getCars()
  }, [filteredOption, sortedOption, accessCars])

  return (
    <div className="container mx-auto flex-grow p-4">
      <main className="flex flex-col">
        <section className="flex flex-col items-center sm:flex-row sm:justify-between mt-7 font-bold">
          <h1 className="text-red-700 text-3xl max-sm:mb-5">Marvelous CARS</h1>
          <div className="flex justify-between gap-4">
            <FilterBtn action={handleFilterChange} option={filteredOption} />
            <SortBtn action={handleSortedChange} option={sortedOption} />
          </div>
        </section>
        <section className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
          {currentCars.map((car: CarProps) => {
            return <Car key={car.name} car={car} />
          })}
        </section>
        <Pagination
          action={handlePageChange}
          currentPage={currentPage}
          endIndex={endIndex}
          allCars={cars}
          carsPerPage={carsPerPage}
        />
      </main>
    </div>
  )
})

export default Home
