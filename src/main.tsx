import React from "react"
import ReactDOM from "react-dom/client"
import App from "./pages/Home.tsx"
import "./index.css"
import Navbar from "./components/Navbar.tsx"
import Footer from "./components/Footer.tsx"
import New from "./pages/New.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <New />
      <Footer />
    </div>
  </React.StrictMode>
)
