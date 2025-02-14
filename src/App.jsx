import { useState } from 'react'

import News from './components/News'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <div className='h-screen'>
      <News/>
   </div>
   </>
  )
}

export default App
