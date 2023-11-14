import AnchorTag from "./AnchorTagBtn"

export default function Navbar() {
  return (
    <div className="bg-gray-800 text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <a href="/">
          <h2 className="text-2xl font-bold">Cars</h2>
        </a>
        <AnchorTag location="/new" style="create" children="New Car" />
      </nav>
    </div>
  )
}
