import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //useRefHook 
  const password_ref = useRef(null) 
  //useRefHook 
  const [length, setLength] = useState(9)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")

  const password_generator = useCallback(
    () => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if (numAllow) {
        str += "0123456789"
      } 
      if (charAllow) {
        str += "/*-+!@#$%^&*)(_=\|}{][:;><,./?"
      } 

      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        
        pass += str.charAt(char)
      }

      setPassword(pass)


    },
    [length, numAllow, charAllow, setPassword ]
  )
  

  const copy_pass_to_clip = useCallback( () => {
    password_ref.current?.select()
    password_ref.current?.setSelectionRange(0,200)
    window.navigator.clipboard.writeText(password)
  }, [password]
   )



  useEffect(() => {
    password_generator ()
  }, [length, numAllow, charAllow, password_generator])
  

  return (
    <>
      <div className='w-92 h-60 mx-auto shadow-md rounded-lg px-2 my-8 text-lime-300 bg-purple-700' >
        <h1 className='text-white mb-6 text-center' >Password Generator</h1>
      <div className='flex shadow-lg overflow-hidden mb-4' >
        <input type="text" value={password} className='outline-none text-center  bg-green-500 w-96 h-20 py-1 px-3' placeholder='password' readOnly ref={password_ref}  name="" id="" />


        <button onClick={copy_pass_to_clip} className='outline-none bg-blue-600 text-white px-3  py-0.5 shrink-0' > Copy </button>
      </div>

<div className='text-sm flex gap-x-2' >
<div className='flex items-center gap-x-1' >
  <input type="range" min={9}  max={100} value={length} className='cursor-pointer' onChange={ (e) => {
    setLength(e.target.value)
  }
   } />
  <label > length: {length} </label>
</div>
<div className='flex items-center gap-x-1' >
  <input type="checkbox"  defaultChecked={numAllow} id="numberInput" onChange={ () => {
    setNumAllow( (prev) => !prev  )
  }
   } />
   <label htmlFor="numberInput">Numbers</label>
</div>


<div className='flex items-center gap-x-1' >
  <input type="checkbox" defaultChecked={charAllow}  id="characterInput" onChange={ () => {
    setCharAllow( (prev) => !prev )
  }
   } />
      <label htmlFor="characterInput">Characters</label>
</div>



</div>

      </div>
    </>
  )
}

export default App
