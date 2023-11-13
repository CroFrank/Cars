import AnchorTag from "./AnchorTag"

export default function Navbar() {
  return (
    <div className="bg-gray-800 text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold">Cars</h2>
        <AnchorTag location="#" style="create" children="New Car" />
      </nav>
    </div>
  )
}
