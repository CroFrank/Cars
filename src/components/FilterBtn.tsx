import { ChangeEvent } from "react"

interface FilterBtnProps {
  option: string
  action: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function FilterBtn({ option, action }: FilterBtnProps) {
  const brands = ["Peugeot", "BMW", "Renault", "Kia", "Ford"].sort()
  return (
    <select
      id="selectOption"
      name="selectOption"
      className="border-2 border-red-500 text-black bg-transparent px-4 py-2 rounded inline-flex items-center"
      value={option}
      onChange={action}
    >
      <optgroup label="Filter" className="bg-yellow-700">
        <option value="All" className="bg-yellow-500">
          All
        </option>
        {brands.map((brand) => {
          return (
            <option
              key={crypto.randomUUID()}
              value={`${brand}`}
              className="bg-yellow-500"
            >
              {brand}
            </option>
          )
        })}
      </optgroup>
    </select>
  )
}
