import { FormEvent } from "react"
import { brands } from "../utils/brands"
import AnchorTagBtn from "./AnchorTagBtn"
import Button from "./Button"
import { NewCarStore } from "../stores/NewCarStore"
import { EditCarStore } from "../stores/EditCarStore"
import { useNavigate } from "react-router-dom"

export default function Form({
  store,
  action,
  button,
}: {
  store: NewCarStore | EditCarStore
  action: (e: FormEvent) => Promise<void>
  button: boolean
}) {
  const { name, brand, price, setName, setPrice, setBrand } = store
  const navigate = useNavigate()

  return (
    <form
      onSubmit={action}
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
        {button ? (
          <Button
            action={() => navigate(-1)}
            style="delete"
            children="Cancle"
            type="button"
          />
        ) : (
          <AnchorTagBtn location="/" style="cancel" children="Cancel" />
        )}
      </div>
    </form>
  )
}
