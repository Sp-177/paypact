// src/App.jsx
function App() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">🌼 DaisyUI + Tailwind + React</h1>

      <button className="btn btn-primary">Primary Button</button>
      <button className="btn btn-secondary">Secondary</button>

      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>This is a simple DaisyUI card.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-success">Okay</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
