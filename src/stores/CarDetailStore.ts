import { action, makeObservable, observable } from "mobx"
import { ApiService } from "../services/ApiService"
import { firebaseConfig } from "../utils/firebase-config"

class CarDetailsStore {
  car = {
    name: { stringValue: "Car model" },
    brand: { stringValue: "Car Brand" },
    price: { stringValue: "Price" },
  }
  apiService: ApiService

  constructor(apiService: ApiService) {
    this.apiService = apiService

    makeObservable(this, {
      car: observable,
      setCar: action,
    })
  }

  setCar = (newCar: Car) => {
    this.car = newCar
  }

  getCarDetails = async (id: string) => {
    try {
      const responseData = await this.apiService.fetchData(
        `${firebaseConfig.collection}/${id}?key=${firebaseConfig.apiKey}`
      )
      this.setCar(responseData.fields)
    } catch (error) {
      console.error("API request failed:", error)
    }
  }
}

const apiGETService = new ApiService(
  `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`
)
export const carDetailsStore = new CarDetailsStore(apiGETService)
