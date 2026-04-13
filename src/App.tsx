import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import WaitlistModal from './components/landing/WaitlistModal'

function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <>
      <LandingPage onShowAuth={() => setIsWaitlistOpen(true)} />
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
      />
    </>
  )
}

export default App
