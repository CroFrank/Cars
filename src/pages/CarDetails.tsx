import { useNavigate, useParams } from "react-router"
import AnchorTagBtn from "../components/AnchorTagBtn"
import Button from "../components/Button"
import { firebaseConfig } from "../utils/firebase-config"
import { useEffect } from "react"
import { observer } from "mobx-react"
import carDetailsStore from "../stores/CarDetailStore"
import ApiService from "../services/ApiService"

const CarDetails = observer(() => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { car, setCar } = carDetailsStore

  useEffect(() => {
    const getCars = async () => {
      const apiGETService = new ApiService(
        `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`
      )
      try {
        const responseData = await apiGETService.fetchData(
          `${firebaseConfig.collection}/${id}?key=${firebaseConfig.apiKey}`
        )
        setCar(responseData.fields)
      } catch (error) {
        console.error("API request failed:", error)
      }
    }
    getCars()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async () => {
    const apiDELETEService = new ApiService(
      `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`
    )
    try {
      await apiDELETEService.fetchData(
        `${firebaseConfig.collection}/${id}?key=${firebaseConfig.apiKey}`,
        "DELETE"
      )
      navigate("/")
    } catch (error) {
      console.error("API request failed:", error)
    }
  }

  return (
    <div className="container mx-auto flex-grow p-4">
      <main className="flex flex-col items-center">
        <article className="relative flex flex-col items-center my-10 py-10 px-5 bg-yellow-300 rounded-xl w-full sm:w-10/12 md:flex-row md:gap-2 md:justify-center lg:max-w-4xl">
          <section className="w-full mb-5 md:max-w-md md:mb-0">
            <img
              src="https://images.unsplash.com/photo-1517407529958-f6dd2b0389b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="car example image"
              className="rounded-md"
            />
          </section>
          <section className="prosto-one flex flex-col items-center w-full md:max-w-md">
            <h3 className="text-black text-3xl mb-3 text-center">
              {car.name.stringValue}
            </h3>
            <h4 className="text-black text-lg mb-3 text-center">
              {car.brand.stringValue}
            </h4>
            <p className="mb-5 text-black text-lg">{car.price.stringValue} €</p>
            <div className="flex justify-between gap-5 w-full md:justify-around">
              <AnchorTagBtn
                location={`/edit?id=${id}`}
                style="edit"
                children="Edit"
              />
              <Button action={handleDelete} style="delete" children="Delete" />
            </div>
          </section>
          <a
            href="/"
            className="absolute top-3 right-5 text-xl text-red-500 hover:scale-110 font-semibold"
          >
            Exit
          </a>
        </article>
      </main>
    </div>
  )
})

export default CarDetails
