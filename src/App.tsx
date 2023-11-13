function App() {
  return (
    <div className="container mx-auto flex-grow p-4">
      <main className="flex flex-col">
        <section className="flex flex-col items-center sm:flex-row sm:justify-between mt-7 font-bold">
          <h1 className="text-red-700 text-3xl max-sm:mb-5">MONO CARS</h1>
          <div className="flex justify-between gap-4">
            <button>filter</button>
            <button>sort</button>
          </div>
        </section>
        <section className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
          <div>grid system</div>
          <div>grid system</div>
          <div>grid system</div>
          <div>grid system</div>
          <div>grid system</div>
          <div>grid system</div>
          <div>grid system</div>
          <div>grid system</div>
        </section>
        <section className="flex justify-center mt-8">pagination</section>
      </main>
    </div>
  )
}

export default App
