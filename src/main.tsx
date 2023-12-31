import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Navbar from "./components/Navbar.tsx"
import Footer from "./components/Footer.tsx"
import App from "./app.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <App />
      <Footer />
    </div>
  </React.StrictMode>
)
