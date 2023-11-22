import { makeObservable, observable, action, computed } from "mobx"
import { ApiService } from "../services/ApiService"
import { firebaseConfig } from "../utils/firebase-config"

class CarsStore {
  cars = []
  filteredOption = "All"
  sortedOption = "Alphabetic"
  currentPage = 1
  carsPerPage = 12
  apiService: ApiService

  constructor(apiService: ApiService) {
    this.apiService = apiService

    makeObservable(this, {
      cars: observable,
      filteredOption: observable,
      sortedOption: observable,
      currentPage: observable,
      carsPerPage: observable,
      startIndex: computed,
      endIndex: computed,
      currentCars: computed,
      setFilteredOption: action,
      setSortedOption: action,
      setCurrentPage: action,
      setCars: action,
    })
  }

  get startIndex() {
    return (this.currentPage - 1) * this.carsPerPage
  }

  get endIndex() {
    return this.startIndex + this.carsPerPage
  }

  get currentCars() {
    return this.cars.slice(this.startIndex, this.endIndex)
  }

  setFilteredOption = (option: string) => {
    this.filteredOption = option
  }

  setSortedOption = (option: string) => {
    this.sortedOption = option
  }

  setCurrentPage = (page: number) => {
    this.currentPage = page
  }

  setCars = (cars: []) => {
    this.cars = cars
  }

  accessCars = async () => {
    try {
      const responseData = await this.apiService.fetchData(
        `${firebaseConfig.collection}?key=${firebaseConfig.apiKey}`
      )
      const filtered = responseData.documents.filter((car: NewCarData) => {
        if (this.filteredOption === "All") {
          return car
        }
        return (
          car.fields.brand.stringValue === this.filteredOption.toUpperCase()
        )
      })
      filtered.sort((a: NewCarData, b: NewCarData) => {
        if (this.sortedOption === "Price-down") {
          return (
            parseInt(b.fields.price.stringValue) -
            parseInt(a.fields.price.stringValue)
          )
        } else if (this.sortedOption === "Price-up") {
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
      this.setCars(filtered)
    } catch (error) {
      console.error("API request failed:", error)
    }
  }
}

const apiGETService = new ApiService(
  `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`
)
export const carsStore = new CarsStore(apiGETService)
