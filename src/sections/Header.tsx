import { Shield, Fingerprint, Database, Eye, Crosshair, Radar, Workflow, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Section } from '../App'

interface HeaderProps {
  activeSection: Section
  setActiveSection: (s: Section) => void
}

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <Shield className="w-4 h-4" /> },
  { id: 'safepulse', label: 'SafePulse', icon: <Fingerprint className="w-4 h-4" /> },
  { id: 'trustregistry', label: 'TrustRegistry', icon: <Database className="w-4 h-4" /> },
  { id: 'clearframe', label: 'ClearFrame', icon: <Eye className="w-4 h-4" /> },
  { id: 'aegis', label: 'Aegis', icon: <Crosshair className="w-4 h-4" /> },
  { id: 'sonar', label: 'Sonar', icon: <Radar className="w-4 h-4" /> },
  { id: 'pipeline', label: 'Pipeline', icon: <Workflow className="w-4 h-4" /> },
  { id: 'roi', label: 'ROI', icon: <BarChart3 className="w-4 h-4" /> },
]

export function Header({ activeSection, setActiveSection }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0e1a]/95 backdrop-blur-md border-b border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#4361ee] rotate-45 flex items-center justify-center">
            <span className="text-white font-bold text-xs -rotate-45">E</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">Erasys</h1>
            <p className="text-[10px] text-gray-400 leading-tight">AI Safety Stack</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection(item.id)}
              className={`gap-1.5 text-xs ${
                activeSection === item.id
                  ? 'bg-[#4361ee] hover:bg-[#3651d4]'
                  : 'text-gray-400 hover:text-white hover:bg-[#1e293b]'
              }`}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  )
}
