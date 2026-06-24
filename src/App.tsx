import { useState } from 'react'
import { Header } from './sections/Header'
import { HeroSection } from './sections/HeroSection'
import { SafePulseDemo } from './sections/SafePulseDemo'
import { TrustRegistryDemo } from './sections/TrustRegistryDemo'
import { ClearFrameDemo } from './sections/ClearFrameDemo'
import { AegisDemo } from './sections/AegisDemo'
import { SonarDemo } from './sections/SonarDemo'
import { FullPipelineDemo } from './sections/FullPipelineDemo'
import { ROIDashboard } from './sections/ROIDashboard'
import { Footer } from './sections/Footer'
import { Toaster } from '@/components/ui/sonner'

export type Section =
  | 'overview'
  | 'safepulse'
  | 'trustregistry'
  | 'clearframe'
  | 'aegis'
  | 'sonar'
  | 'pipeline'
  | 'roi'

function App() {
  const [activeSection, setActiveSection] = useState<Section>('overview')

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        {activeSection === 'overview' && (
          <>
            <HeroSection setActiveSection={setActiveSection} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 max-w-7xl mx-auto">
              <SafePulseDemo compact />
              <TrustRegistryDemo compact />
              <AegisDemo compact />
              <SonarDemo compact />
            </div>
            <FullPipelineDemo />
            <ROIDashboard />
          </>
        )}
        {activeSection === 'safepulse' && <SafePulseDemo />}
        {activeSection === 'trustregistry' && <TrustRegistryDemo />}
        {activeSection === 'clearframe' && <ClearFrameDemo />}
        {activeSection === 'aegis' && <AegisDemo />}
        {activeSection === 'sonar' && <SonarDemo />}
        {activeSection === 'pipeline' && <FullPipelineDemo />}
        {activeSection === 'roi' && <ROIDashboard />}
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
