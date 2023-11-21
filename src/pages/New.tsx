import { FormEvent } from "react"
import AnchorTagBtn from "../components/AnchorTagBtn"
import Button from "../components/Button"
import { firebaseConfig } from "../firebase-config"
import { useNavigate } from "react-router-dom"
import { brands } from "../brands"
import { observer } from "mobx-react"
import newCarStore from "../stores/NewCarStore"
import ApiService from "../services/ApiService"

const New = observer(() => {
  const { name, brand, price, setName, setPrice, setBrand, resetForm } =
    newCarStore

  const data = {
    fields: {
      name: { stringValue: name },
      brand: { stringValue: brand },
      price: { stringValue: price },
    },
  }

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const apiPOSTService = new ApiService(
      `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`
    )
    try {
      await apiPOSTService.fetchData(
        `${firebaseConfig.collection}?key=${firebaseConfig.apiKey}`,
        "POST",
        data
      )
    } catch (error) {
      console.error("API request failed:", error)
    }
    resetForm()
    navigate("/")
  }

  return (
    <div className="container mx-auto flex-grow p-4">
      <h2 className="mx-auto mt-8 mb-12 text-center font-semibold text-yellow-600 text-2xl">
        Create new car model
      </h2>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="max-w-md mx-auto my-8 p-4 border-2 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="carModel"
            className="block text-sm font-medium text-gray-600"
          >
            Car Model
          </label>
          <input
            type="text"
            id="carModel"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="carBrand"
            className="block text-sm font-medium text-gray-600"
          >
            Car Brand
          </label>
          <select
            id="carBrand"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          >
            {brands.map((brand, index) => {
              return (
                <option key={index} value={brand}>
                  {brand.toUpperCase()}
                </option>
              )
            })}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="flex justify-between">
          <Button type="submit" style="submit" children="Create" />
          <AnchorTagBtn location="/" style="cancel" children="Cancel" />
        </div>
      </form>
    </div>
  )
})

export default New
