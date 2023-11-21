import { FormEvent } from "react"
import { firebaseConfig } from "../utils/firebase-config"
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react"
import newCarStore from "../stores/NewCarStore"
import ApiService from "../services/ApiService"
import Form from "../components/Form"

const New = observer(() => {
  const { name, brand, price, resetForm } = newCarStore

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
      <Form store={newCarStore} action={handleSubmit} button={false} />
    </div>
  )
})

export default New
