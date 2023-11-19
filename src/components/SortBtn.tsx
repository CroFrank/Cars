export default function SortBtn({ option, action }: FilterBtnProps) {
  return (
    <select
      id="selectOption"
      name="selectOption"
      className="border-2 border-red-500 text-black bg-transparent px-4 py-2 rounded inline-flex items-center"
      value={option}
      onChange={action}
    >
      <optgroup label="Sort" className="bg-yellow-700">
        <option value="Alphabetic" className="bg-yellow-500">
          Alphabetic
        </option>
        <option value="Price-up" className="bg-yellow-500">
          Price-up
        </option>
        <option value="Price-down" className="bg-yellow-500">
          Price-down
        </option>
      </optgroup>
    </select>
  )
}
