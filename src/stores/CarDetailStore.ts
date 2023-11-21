import { action, makeObservable, observable } from "mobx"

class CarDetailsStore {
  car = {
    name: { stringValue: "Car model" },
    brand: { stringValue: "Car Brand" },
    price: { stringValue: "Price" },
  }

  constructor() {
    makeObservable(this, {
      car: observable,
      setCar: action,
    })
  }

  setCar = (newCar: Car) => {
    this.car = newCar
  }
}

const carDetailsStore = new CarDetailsStore()
export default carDetailsStore
