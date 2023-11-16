export default function SelectBtn({ children }: SelectBtnProps) {
  return (
    <button className="border-2 border-red-500 text-red-500 bg-transparent px-4 py-2 rounded inline-flex items-center">
      {children}
      <svg
        className="fill-current h-4 w-4 ml-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M8.293 11.293a1 1 0 011.414 0L10 12.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
      </svg>
    </button>
  )
}
