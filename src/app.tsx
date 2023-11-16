import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home.tsx"
import New from "./pages/New.tsx"
import Edit from "./pages/Edit.tsx"
import CarDetails from "./pages/CarDetails.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "car/:id",
    element: <CarDetails />,
  },
  {
    path: "new",
    element: <New />,
  },
  {
    path: "edit",
    element: <Edit />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
