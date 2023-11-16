import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { FormEvent, useState } from "react"
import { firebaseConfig } from "../firebase-config"

export default function Edit() {
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [price, setPrice] = useState("")
  const data = {
    fields: {
      name: { stringValue: name },
      brand: { stringValue: brand },
      price: { stringValue: price },
    },
  }
  const searchParams = new URLSearchParams(document.location.search)
  const id = searchParams.get("id")
  const urlOne = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/${firebaseConfig.collection}/${id}?key=${firebaseConfig.apiKey}`
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await fetch(urlOne, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        console.log("Document updated successfully.")
        navigate(`/car/${id}`)
      })
      .catch((error) => {
        console.error("Error updating document:", error)
      })
  }

  return (
    <div className="container mx-auto flex-grow p-4">
      <h2 className="mx-auto mt-8 mb-12 text-center font-semibold text-yellow-600 text-2xl">
        Edit car model
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
          <input
            type="text"
            id="carBrand"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
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
          <Button type="submit" style="submit" children="Edit" />
          <Button
            action={() => navigate(-1)}
            style="delete"
            children="Cancle"
            type="button"
          />
        </div>
      </form>
    </div>
  )
}
