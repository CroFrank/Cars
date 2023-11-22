import { ChangeEvent, useEffect } from "react"
import Car from "../components/Car"
import Pagination from "../components/Pagination"
import { firebaseConfig } from "../utils/firebase-config"
import FilterBtn from "../components/FilterBtn"
import SortBtn from "../components/SortBtn"
import carsStore from "../stores/CarsStore"
import { observer } from "mobx-react"
import { ApiService } from "../services/ApiService"

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
    setCars,
    carsPerPage,
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
      const apiGETService = new ApiService(
        `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`
      )

      try {
        const responseData = await apiGETService.fetchData(
          `${firebaseConfig.collection}?key=${firebaseConfig.apiKey}`
        )
        const filtered = responseData.documents.filter((car: NewCarData) => {
          if (filteredOption === "All") {
            return car
          }
          return car.fields.brand.stringValue === filteredOption.toUpperCase()
        })
        filtered.sort((a: NewCarData, b: NewCarData) => {
          if (sortedOption === "Price-down") {
            return (
              parseInt(b.fields.price.stringValue) -
              parseInt(a.fields.price.stringValue)
            )
          } else if (sortedOption === "Price-up") {
            return (
              parseInt(a.fields.price.stringValue) -
              parseInt(b.fields.price.stringValue)
            )
          } else {
            return a.fields.name.stringValue.localeCompare(
              b.fields.name.stringValue
            )
          }
        })
        setCars(filtered)
      } catch (error) {
        console.error("API request failed:", error)
      }
    }
    getCars()
  }, [filteredOption, sortedOption, setCars])

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
})

export default Home
