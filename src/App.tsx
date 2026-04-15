import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import WaitlistModal from './components/landing/WaitlistModal'
import KishanKasulaPage from './pages/KishanKasulaPage'
import AdityaVungiralaPage from './pages/AdityaVungiralaPage'

function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage onShowAuth={() => setIsWaitlistOpen(true)} />
              <WaitlistModal
                isOpen={isWaitlistOpen}
                onClose={() => setIsWaitlistOpen(false)}
              />
            </>
          }
        />
        <Route path="/kishan-kasula" element={<KishanKasulaPage />} />
        <Route path="/aditya-phanidar-vungarala" element={<AdityaVungiralaPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
