export default function Pagination({
  action,
  currentPage,
  endIndex,
  allCars,
  carsPerPage,
}: PaginationProps) {
  return (
    <div className={`flex justify-center mt-8 gap-5`}>
      <button
        className={`${currentPage === 1 ? "text-slate-300" : ""}`}
        onClick={() => action(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H6M12 5l-7 7 7 7" />
        </svg>
      </button>
      <span>
        {" "}
        Page <b>{currentPage}</b> of{" "}
        <b>{Math.ceil(allCars.length / carsPerPage)}</b>
      </span>
      <button
        className={`${endIndex >= allCars.length ? "text-slate-300" : ""}`}
        onClick={() => action(currentPage + 1)}
        disabled={endIndex >= allCars.length}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h13M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
