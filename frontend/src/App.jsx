import { useEffect, useState } from 'react'
import './App.css'

const API = process.env.API_URL || 'http://localhost:5050'

function App() {
  const [hello, setHello] = useState('Loading...')
  const [ping, setPing] = useState('')
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [sum, setSum] = useState('')

  useEffect(() => {
    fetch(`${API}/ping`)
      .then((res) => res.text())
      .then(setPing)
      .catch(() => setPing('Backend offline'))
    sayHello();
  }, [])

  const sayHello = async () => {
    try {
      const res = await fetch(API)
      setHello(await res.text())
    } catch {
      setHello('Backend offline')
    }
  }

  const add = async () => {
    try {
      const res = await fetch(`${API}/sum`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: Number(a), b: Number(b) }),
      })
      const text = await res.text()
      setSum(res.ok ? text : 'a and b must be numbers')
    } catch {
      setSum('Backend offline')
    }
  }

  return (
    <section id="center">
      <div>
        <h1>Hello, world</h1>
        <p>{ping}</p>
      </div>

      <button type="button" className="counter" onClick={sayHello}>
        {hello}
      </button>

      <div>
        <input
          value={a}
          onChange={(e) => setA(e.target.value)}
          inputMode="numeric"
          size="5"
        />
        {' + '}
        <input
          value={b}
          onChange={(e) => setB(e.target.value)}
          inputMode="numeric"
          size="5"
        />
        <button type="button" className="counter" onClick={add}>
          = {sum || 'sum'}
        </button>
      </div>
    </section>
  )
}

export default App
