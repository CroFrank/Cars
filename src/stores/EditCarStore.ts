import { action, makeObservable, observable } from "mobx"

export class EditCarStore {
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
}

const editCarStore = new EditCarStore()
export default editCarStore
