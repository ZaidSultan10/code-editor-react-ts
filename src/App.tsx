import React, { useEffect, useRef, useState } from 'react';
import * as esBuild from 'esbuild-wasm'
import './App.css';

function App() {
  const [input, setInput] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const ref = useRef<any>(null)

  const startService = async () => {
    ref.current = await esBuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
  }

  useEffect(() => {
    startService()
  }, [])

  const handleClick = async () => {
    if(!ref.current){
      return
    }
    const result = await ref?.current.transform(input, {
      loader: 'jsx',
      target: 'es2015'
    })
    setCode(result.code)
  }

  return (
    <div className="App">
      <div>
        <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)} />
      </div>
      <div>
        <button onClick={() => handleClick()}>
          {`Submit`}
        </button>
      </div>
      <div>
        <pre>{code}</pre>
      </div>
    </div>
  );
}

export default App;
