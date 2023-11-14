export default function Car() {
  return (
    <a href="/car/:id" className="w-48 hover:scale-105">
      <div className="h-72">
        <img
          src="https://images.unsplash.com/photo-1517407529958-f6dd2b0389b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="car example image"
        />
      </div>
      <div className="rounded-b-md h-20 bg-red-900 flex items-center justify-center text-white font-semibold">
        <p className="px-3 py-2 text-center">title</p>
      </div>
    </a>
  )
}
