/// <reference types="vite/client" />

interface CarData {
  stringValue: string
}
interface CarProps {
  name: string
  fields: {
    name: CarData
    brand: CarData
    price: { integerValue: string }
  }
}
interface Car {
  name: CarData
  brand: CarData
  price: { integerValue: string }
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

interface SelectBtnProps {
  children: string
}
