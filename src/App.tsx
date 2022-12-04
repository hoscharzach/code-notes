import { useEffect, useRef, useState } from 'react'
import './App.css'
import * as esbuild from 'esbuild-wasm'

function App() {

  const serviceRef = useRef<any>()
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
  }

  useEffect(() => {
    startService()
  }, [])



  const onClick = async () => {
    if (!serviceRef) {
      return
    }

    const result = await serviceRef.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    })

    setCode(result.code)
  }

  return (
    <>
      <textarea onChange={(e) => setInput(e.target.value)} value={input}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </>
  )
}

export default App
