import { ChangeEvent, useEffect, useState } from "react"
import Car from "../components/Car"
import Pagination from "../components/Pagination"
import { url } from "../firebase-config"
import FilterBtn from "../components/FilterBtn"
import SortBtn from "../components/SortBtn"

export default function Home() {
  const [cars, setCars] = useState([])
  const [filteredOption, setFilteredOption] = useState("All")
  const [sortedOption, setSortedOption] = useState("Alphabetic")
  const [currentPage, setCurrentPage] = useState(1)

  const carsPerPage = 3
  const startIndex = (currentPage - 1) * carsPerPage
  const endIndex = startIndex + carsPerPage
  const currentCars = cars.slice(startIndex, endIndex)

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
      await fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          const filtered = data.documents.filter((car: FilterCar) => {
            if (filteredOption === "All") {
              return car.fields.brand.stringValue
            }
            return car.fields.brand.stringValue === filteredOption.toUpperCase()
          })
          filtered.sort((a: FilterCar, b: FilterCar) => {
            if (sortedOption === "Price-down") {
              console.log(b.fields.price.stringValue)
              return (
                parseInt(b.fields.price.stringValue) -
                parseInt(a.fields.price.stringValue)
              )
            } else if (sortedOption === "Price-up") {
              console.log(b.fields.price.stringValue)
              return (
                parseInt(a.fields.price.stringValue) -
                parseInt(b.fields.price.stringValue)
              )
            } else {
              return a.fields.brand.stringValue.localeCompare(
                b.fields.brand.stringValue
              )
            }
          })
          setCars(filtered)
        })
        .catch((error) => {
          console.error("Error fetching data:", error)
        })
    }
    getCars()
  }, [filteredOption, sortedOption])

  return (
    <div className="container mx-auto flex-grow p-4">
      <main className="flex flex-col">
        <section className="flex flex-col items-center sm:flex-row sm:justify-between mt-7 font-bold">
          <h1 className="text-red-700 text-3xl max-sm:mb-5">MONO CARS</h1>
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
}
