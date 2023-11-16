import { useEffect, useState } from "react"
import Car from "../components/Car"
import Pagination from "../components/Pagination"
import SelectBtn from "../components/SelectBtn"
import { url } from "../firebase-config"

export default function Home() {
  const [cars, setCars] = useState([])
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
          setCars(data.documents)
          console.log(data.documents)
        })
        .catch((error) => {
          console.error("Error fetching data:", error)
        })
    }
    getCars()
  }, [])
  return (
    <div className="container mx-auto flex-grow p-4">
      <main className="flex flex-col">
        <section className="flex flex-col items-center sm:flex-row sm:justify-between mt-7 font-bold">
          <h1 className="text-red-700 text-3xl max-sm:mb-5">MONO CARS</h1>
          <div className="flex justify-between gap-4">
            <SelectBtn children="Filter" />
            <SelectBtn children="Sort" />
          </div>
        </section>
        <section className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
          {cars.map((car: CarProps) => {
            return <Car car={car} />
          })}
        </section>
        <Pagination />
      </main>
    </div>
  )
}
