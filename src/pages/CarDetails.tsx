import { useNavigate, useParams } from "react-router"
import AnchorTagBtn from "../components/AnchorTagBtn"
import Button from "../components/Button"
import { useEffect } from "react"
import { observer } from "mobx-react"
import { carDetailsStore } from "../stores/CarDetailStore"

const CarDetails = observer(() => {
  const navigate = useNavigate()
  const { id } = useParams()
  if (!id) {
    throw new Error("missing id")
  }
  // idk why not working if 'car' not destructed
  const { car, getCarDetails, deleteCar } = carDetailsStore
  console.log(car)

  useEffect(() => {
    const getCars = async () => {
      await getCarDetails(id)
    }
    getCars()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async () => {
    await deleteCar(id)
    navigate("/")
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
