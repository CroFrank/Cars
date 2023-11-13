export default function Navbar() {
  return (
    <div className="bg-gray-800 text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold">Cars</h2>
        <a
          href="#"
          className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded"
        >
          New Car
        </a>
      </nav>
    </div>
  )
}
