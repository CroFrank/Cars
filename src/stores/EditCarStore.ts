import { action, makeObservable, observable } from "mobx"
import { firebaseConfig } from "../utils/firebase-config"
import { ApiService } from "../services/ApiService"

export class EditCarStore {
  name = ""
  brand = ""
  price = ""
  apiService: ApiService

  constructor(apiService: ApiService) {
    this.apiService = apiService

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
  resetForm = () => {
    this.name = ""
    this.brand = ""
    this.price = ""
  }
  saveCar = async (id: string) => {
    try {
      const data = {
        fields: {
          name: { stringValue: this.name },
          brand: { stringValue: this.brand },
          price: { stringValue: this.price },
        },
      }
      await this.apiService.fetchData(
        `${firebaseConfig.collection}/${id}?key=${firebaseConfig.apiKey}`,
        "PATCH",
        data
      )
      this.resetForm()
    } catch (error) {
      console.error("Error saving car:", error)
    }
  }
}

const apiService = new ApiService(
  `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`
)
export const editCarStore = new EditCarStore(apiService)
