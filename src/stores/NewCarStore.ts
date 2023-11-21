import { action, makeObservable, observable } from "mobx"

class NewCarStore {
  name = ""
  brand = ""
  price = ""

  constructor() {
    makeObservable(this, {
      name: observable,
      brand: observable,
      price: observable,
      setName: action,
      setBrand: action,
      setPrice: action,
      resetForm: action,
    })
  }

  setName = (name: string) => {
    this.name = name
  }

  setBrand = (brand: string) => {
    this.brand = brand
  }

  setPrice = (price: string) => {
    this.price = price
  }

  resetForm = () => {
    this.name = ""
    this.brand = ""
    this.price = ""
  }
}

const newCarStore = new NewCarStore()
export default newCarStore
