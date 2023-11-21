import { makeObservable, observable, action, computed } from "mobx"

class CarsStore {
  cars = []
  filteredOption = "All"
  sortedOption = "Alphabetic"
  currentPage = 1
  carsPerPage = 12

  constructor() {
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
}

const carsStore = new CarsStore()
export default carsStore
