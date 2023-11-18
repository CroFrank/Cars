/// <reference types="vite/client" />

interface CarData {
  stringValue: string
}
interface CarProps {
  name: string
  fields: {
    name: CarData
    brand: CarData
    price: CarData
  }
}
interface Car {
  name: CarData
  brand: CarData
  price: CarData
}

interface FilterCar {
  fields: { brand: { stringValue: string } }
}
interface AnchorTagProps {
  location: string
  style: "create" | "edit" | "cancel"
  children: string
}

interface ButtonProps {
  style: "submit" | "delete"
  children: string
  action?: () => void
  type?: "button" | "reset" | "submit" | undefined
}

interface FilterBtnProps {
  children: string
}
