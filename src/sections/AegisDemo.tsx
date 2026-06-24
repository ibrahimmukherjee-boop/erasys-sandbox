import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Crosshair, Hand, Pause, RotateCcw, CheckCircle, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

interface ToolCall {
  id: string
  tool: string
  args: string
  alignment: number
  status: 'pending' | 'allowed' | 'blocked' | 'human_review'
}

interface AegisDemoProps {
  compact?: boolean
}

const sampleCalls: ToolCall[] = [
  { id: 'tc-1', tool: 'web_search', args: 'query: "cybersecurity best practices 2026"', alignment: 95, status: 'allowed' },
  { id: 'tc-2', tool: 'send_email', args: 'to: "team@company.com", subject: "Security Report"', alignment: 88, status: 'allowed' },
  { id: 'tc-3', tool: 'file_delete', args: 'path: "/important/data.csv"', alignment: 25, status: 'human_review' },
  { id: 'tc-4', tool: 'db_query', args: 'query: "DROP TABLE users"', alignment: 5, status: 'blocked' },
  { id: 'tc-5', tool: 'api_call', args: 'endpoint: "/internal/secrets"', alignment: 35, status: 'human_review' },
]

export function AegisDemo({ compact }: AegisDemoProps) {
  const [calls, setCalls] = useState<ToolCall[]>(sampleCalls)
  const [hitlEnabled, setHitlEnabled] = useState(true)
  const [autoPauseThreshold] = useState(50)

  const approveCall = (id: string) => {
    setCalls(calls.map((c) => (c.id === id ? { ...c, status: 'allowed' as const } : c)))
    toast.success(`Tool call ${id} approved`)
  }

  const blockCall = (id: string) => {
    setCalls(calls.map((c) => (c.id === id ? { ...c, status: 'blocked' as const } : c)))
    toast.error(`Tool call ${id} blocked`)
  }

  const reset = () => {
    setCalls(sampleCalls)
  }

  if (compact) {
    return (
      <Card className="bg-[#0f172a] border-[#1e293b] hover:border-orange-500/50 transition-colors cursor-pointer">
        <CardContent className="p-6 pt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Crosshair className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm font-semibold">Aegis</p>
          </div>
          <p className="text-xs text-gray-400 mb-3">Goal monitoring & human-in-the-loop</p>
          <div className="flex gap-2">
            <Badge className="bg-green-500/20 text-green-400 text-xs">{calls.filter((c) => c.status === 'allowed').length} Allowed</Badge>
            <Badge className="bg-red-500/20 text-red-400 text-xs">{calls.filter((c) => c.status === 'blocked').length} Blocked</Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
          <Crosshair className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Aegis</h2>
          <p className="text-sm text-gray-400">Goal Monitoring & Human-in-the-Loop — SHOULD the agent do this?</p>
        </div>
        <Badge className="ml-auto bg-orange-500/20 text-orange-400 border-orange-500/30">Oversight Layer</Badge>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="bg-[#0f172a] border-[#1e293b] lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Goal Manifest</h3>
            <div className="p-4 bg-[#1e293b] rounded-lg font-mono text-sm space-y-2">
              <p className="text-green-400">goal: "Research cybersecurity trends"</p>
              <p className="text-gray-400">permitted_tools: [web_search, web_fetch, send_email]</p>
              <p className="text-gray-400">max_steps: 30</p>
              <p className="text-red-400">allow_file_delete: false</p>
              <p className="text-red-400">allow_db_write: false</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold">Controls</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">HITL Enabled</span>
              <Switch checked={hitlEnabled} onCheckedChange={setHitlEnabled} />
            </div>
            <div>
              <span className="text-sm">Auto-pause threshold: {autoPauseThreshold}%</span>
              <Progress value={autoPauseThreshold} className="h-2 mt-2" />
            </div>
            <Button variant="outline" size="sm" onClick={reset} className="w-full border-[#334155] gap-2">
              <RotateCcw className="w-4 h-4" /> Reset
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-[#0f172a] border-[#1e293b]">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Tool Call Monitor</h3>
          <div className="space-y-2">
            {calls.map((call) => (
              <div key={call.id} className="flex items-center gap-3 p-3 bg-[#1e293b]/50 rounded-lg">
                {call.status === 'allowed' && <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />}
                {call.status === 'blocked' && <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />}
                {call.status === 'human_review' && <Hand className="w-4 h-4 text-yellow-400 shrink-0" />}
                {call.status === 'pending' && <Pause className="w-4 h-4 text-gray-400 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{call.tool}</p>
                  <p className="text-xs text-gray-500 truncate">{call.args}</p>
                </div>
                <div className="w-20">
                  <Progress value={call.alignment} className="h-1.5" />
                  <p className="text-xs text-gray-500 text-right">{call.alignment}%</p>
                </div>
                <Badge
                  className={`text-xs shrink-0 ${
                    call.status === 'allowed'
                      ? 'bg-green-500/20 text-green-400'
                      : call.status === 'blocked'
                        ? 'bg-red-500/20 text-red-400'
                        : call.status === 'human_review'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {call.status}
                </Badge>
                {call.status === 'human_review' && hitlEnabled && (
                  <div className="flex gap-1">
                    <Button size="sm" onClick={() => approveCall(call.id)} className="bg-green-500 hover:bg-green-600 h-7 px-2">
                      <CheckCircle className="w-3 h-3" />
                    </Button>
                    <Button size="sm" onClick={() => blockCall(call.id)} className="bg-red-500 hover:bg-red-600 h-7 px-2">
                      <AlertTriangle className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
