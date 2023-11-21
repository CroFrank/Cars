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
  option: string
  action: (e: ChangeEvent<HTMLSelectElement>) => void
}

interface PaginationProps {
  action: (currentPage: number) => void
  currentPage: number
  endIndex: number
  allCars: CarProps[]
  carsPerPage: number
}

interface NewCarData {
  fields: {
    name: { stringValue: string }
    brand: { stringValue: string }
    price: { stringValue: string }
  }
}

interface RequestOptions {
  method?: string
  headers: {
    "Content-Type": string
  }
  body?: string
}
