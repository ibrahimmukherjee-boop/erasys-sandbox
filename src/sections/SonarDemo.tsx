import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Radar, AlertTriangle, Shield, Activity, Clock } from 'lucide-react'

interface SonarDemoProps {
  compact?: boolean
}

interface ThreatEvent {
  id: string
  timestamp: string
  agent: string
  type: 'anomaly' | 'policy_violation' | 'credential_abuse' | 'insider_threat'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
}

const threatEvents: ThreatEvent[] = [
  { id: 'evt-1', timestamp: '14:32:08', agent: 'CodeReviewer-Alpha', type: 'policy_violation', severity: 'high', description: 'Attempted file access outside allowed scope' },
  { id: 'evt-2', timestamp: '14:31:45', agent: 'SupportBot-Gamma', type: 'anomaly', severity: 'medium', description: 'Unusual query pattern detected' },
  { id: 'evt-3', timestamp: '14:30:12', agent: 'DataAnalyst-Beta', type: 'credential_abuse', severity: 'critical', description: 'API key used from unknown IP range' },
  { id: 'evt-4', timestamp: '14:28:33', agent: 'CodeReviewer-Alpha', type: 'insider_threat', severity: 'low', description: 'Off-hours activity pattern' },
]

const severityColors = {
  low: 'bg-blue-500/20 text-blue-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-orange-500/20 text-orange-400',
  critical: 'bg-red-500/20 text-red-400',
}

export function SonarDemo({ compact }: SonarDemoProps) {
  const [threatScore, setThreatScore] = useState(42)
  const [activeAlerts] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatScore((prev) => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 10)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (compact) {
    return (
      <Card className="bg-[#0f172a] border-[#1e293b] hover:border-red-500/50 transition-colors cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
              <Radar className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-sm">Sonar</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-400 mb-3">AI SOC — Real-time threat detection</p>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-sm font-mono">{threatScore.toFixed(0)}% threat level</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{activeAlerts} active alerts</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
          <Radar className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Sonar</h2>
          <p className="text-sm text-gray-400">AI-Powered SOC — Real-time threat detection for agent ecosystems</p>
        </div>
        <Badge className="ml-auto bg-red-500/20 text-red-400 border-red-500/30">Detection Layer</Badge>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-red-400 animate-pulse" />
              <span className="text-sm text-gray-400">Threat Level</span>
            </div>
            <p className="text-4xl font-bold text-red-400">{threatScore.toFixed(0)}%</p>
            <Progress value={threatScore} className="h-2 mt-3" />
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-400">Active Alerts</span>
            </div>
            <p className="text-4xl font-bold text-yellow-400">{activeAlerts}</p>
            <p className="text-xs text-gray-500 mt-2">2 high, 1 critical</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Agents Protected</span>
            </div>
            <p className="text-4xl font-bold text-green-400">12</p>
            <p className="text-xs text-gray-500 mt-2">All monitored</p>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-[#0f172a] border-[#1e293b]">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Live Threat Feed</h3>
          <div className="space-y-2">
            {threatEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-[#1e293b]/50 rounded-lg">
                <AlertTriangle
                  className={`w-4 h-4 mt-0.5 ${
                    event.severity === 'critical'
                      ? 'text-red-400'
                      : event.severity === 'high'
                        ? 'text-orange-400'
                        : event.severity === 'medium'
                          ? 'text-yellow-400'
                          : 'text-blue-400'
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{event.type.replace('_', ' ')}</span>
                    <Badge className={`text-xs ${severityColors[event.severity]}`}>{event.severity}</Badge>
                  </div>
                  <p className="text-xs text-gray-400">{event.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-gray-600" />
                    <span className="text-xs text-gray-600">
                      {event.timestamp} · {event.agent}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
