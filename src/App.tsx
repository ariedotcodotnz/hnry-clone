import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>HNRY Clone</h1>
        <p>Welcome to HNRY Clone - Running on Cloudflare Workers</p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        <p className="read-the-docs">
          This app is successfully deployed on Cloudflare Workers!
        </p>
      </header>
    </div>
  )
}

export default App
