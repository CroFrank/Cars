import { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react"
import Form from "../components/Form"
import { newCarStore } from "../stores/NewCarStore"

const New = observer(() => {
  // idk why not working if 'name, brand, price' not destructed
  const { name, brand, price, saveCar } = newCarStore
  console.log(name, brand, price)

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await saveCar()
    navigate("/")
  }

  return (
    <div className="container mx-auto flex-grow p-4">
      <h2 className="mx-auto mt-8 mb-12 text-center font-semibold text-yellow-600 text-2xl">
        Create new car model
      </h2>
      <Form store={newCarStore} action={handleSubmit} />
    </div>
  )
})

export default New
