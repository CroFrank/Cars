import { useNavigate } from "react-router-dom"
import { FormEvent, useEffect } from "react"
import { observer } from "mobx-react"
import { editCarStore } from "../stores/EditCarStore"
import Form from "../components/Form"
import { carDetailsStore } from "../stores/CarDetailStore"

const Edit = observer(() => {
  // idk why not working if 'name, brand, price' not destructed
  const { name, brand, price, saveCar } = editCarStore
  const { car, getCarDetails } = carDetailsStore

  console.log(name, brand, price)

  const searchParams = new URLSearchParams(document.location.search)
  const id = searchParams.get("id")
  if (!id) {
    throw new Error("missing id")
  }

  const navigate = useNavigate()

  useEffect(() => {
    const getCars = async () => {
      await getCarDetails(id)
    }
    getCars()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await saveCar(id)
    navigate(`/car/${id}`)
  }

  return (
    <div className="container mx-auto flex-grow p-4">
      <h2 className="mx-auto mt-8 mb-12 text-center font-semibold text-yellow-600 text-2xl">
        Edit car model
      </h2>
      <Form store={editCarStore} action={handleSubmit} edit={true} car={car} />
    </div>
  )
})

export default Edit
