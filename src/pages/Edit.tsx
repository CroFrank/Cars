import { useNavigate } from "react-router-dom"
import { FormEvent } from "react"
import { firebaseConfig } from "../utils/firebase-config"
import { observer } from "mobx-react"
import editCarStore from "../stores/EditCarStore"
import ApiService from "../services/ApiService"
import Form from "../components/Form"

const Edit = observer(() => {
  const { name, brand, price } = editCarStore
  const data = {
    fields: {
      name: { stringValue: name },
      brand: { stringValue: brand },
      price: { stringValue: price },
    },
  }
  const searchParams = new URLSearchParams(document.location.search)
  const id = searchParams.get("id")

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const apiPATCHService = new ApiService(
      `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`
    )
    try {
      await apiPATCHService.fetchData(
        `${firebaseConfig.collection}/${id}?key=${firebaseConfig.apiKey}`,
        "PATCH",
        data
      )
      navigate(`/car/${id}`)
    } catch (error) {
      console.error("API request failed:", error)
    }
  }

  return (
    <div className="container mx-auto flex-grow p-4">
      <h2 className="mx-auto mt-8 mb-12 text-center font-semibold text-yellow-600 text-2xl">
        Edit car model
      </h2>
      <Form store={editCarStore} action={handleSubmit} button={true} />
    </div>
  )
})

export default Edit
