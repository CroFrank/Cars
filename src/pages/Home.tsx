import { ChangeEvent, useEffect, useState } from "react"
import Car from "../components/Car"
import Pagination from "../components/Pagination"
import { url } from "../firebase-config"
import FilterBtn from "../components/FilterBtn"

export default function Home() {
  const [cars, setCars] = useState([])
  const [selectedOption, setSelectedOption] = useState("All")

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value)
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
          if (selectedOption === "All") {
            return setCars(data.documents)
          }
          const filtered = data.documents.filter(
            (car: FilterCar) =>
              car.fields.brand.stringValue === selectedOption.toUpperCase()
          )
          setCars(filtered)
          console.log(filtered)
        })
        .catch((error) => {
          console.error("Error fetching data:", error)
        })
    }
    getCars()
  }, [selectedOption])

  return (
    <div className="container mx-auto flex-grow p-4">
      <main className="flex flex-col">
        <section className="flex flex-col items-center sm:flex-row sm:justify-between mt-7 font-bold">
          <h1 className="text-red-700 text-3xl max-sm:mb-5">MONO CARS</h1>
          <div className="flex justify-between gap-4">
            <FilterBtn action={handleSelectChange} option={selectedOption} />
          </div>
        </section>
        <section className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
          {cars.map((car: CarProps) => {
            return <Car key={car.name} car={car} />
          })}
        </section>
        <Pagination />
      </main>
    </div>
  )
}
