import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Database, Plus, Trash2, AlertTriangle, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface Agent {
  id: string
  name: string
  role: string
  owner: string
  trustScore: number
  status: 'active' | 'suspended' | 'revoked'
  registeredAt: string
}

interface TrustRegistryDemoProps {
  compact?: boolean
}

const initialAgents: Agent[] = [
  { id: 'agt-7f3a9b', name: 'CodeReviewer-Alpha', role: 'code-review', owner: 'DevOps Team', trustScore: 94, status: 'active', registeredAt: '2026-06-20' },
  { id: 'agt-2e8c1d', name: 'DataAnalyst-Beta', role: 'data-analysis', owner: 'Data Science', trustScore: 87, status: 'active', registeredAt: '2026-06-21' },
  { id: 'agt-5b1f4e', name: 'SupportBot-Gamma', role: 'customer-support', owner: 'Support Team', trustScore: 45, status: 'suspended', registeredAt: '2026-06-22' },
]

export function TrustRegistryDemo({ compact }: TrustRegistryDemoProps) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)
  const [newAgentName, setNewAgentName] = useState('')
  const [newAgentRole, setNewAgentRole] = useState('')
  const [showForm, setShowForm] = useState(false)

  const registerAgent = () => {
    if (!newAgentName || !newAgentRole) {
      toast.error('Please provide agent name and role')
      return
    }
    const agent: Agent = {
      id: `agt-${Math.random().toString(36).substring(2, 8)}`,
      name: newAgentName,
      role: newAgentRole,
      owner: 'Current User',
      trustScore: 100,
      status: 'active',
      registeredAt: new Date().toISOString().split('T')[0],
    }
    setAgents([...agents, agent])
    setNewAgentName('')
    setNewAgentRole('')
    setShowForm(false)
    toast.success(`Agent "${agent.name}" registered with ID ${agent.id}`)
  }

  const revokeAgent = (id: string) => {
    setAgents(agents.map((a) => (a.id === id ? { ...a, status: 'revoked' as const, trustScore: 0 } : a)))
    toast.warning(`Agent ${id} has been revoked`)
  }

  const statusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'suspended':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'revoked':
        return <Trash2 className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  if (compact) {
    return (
      <Card className="bg-[#0f172a] border-[#1e293b] hover:border-purple-500/50 transition-colors cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-sm">TrustRegistry</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-400 mb-3">{agents.length} agents registered</p>
          <div className="flex gap-2">
            <Badge className="bg-green-500/20 text-green-400 text-xs">{agents.filter((a) => a.status === 'active').length} Active</Badge>
            <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">{agents.filter((a) => a.status === 'suspended').length} Suspended</Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
          <Database className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">TrustRegistry</h2>
          <p className="text-sm text-gray-400">Agent Identity & Registration — IS the agent trusted?</p>
        </div>
        <Badge className="ml-auto bg-purple-500/20 text-purple-400 border-purple-500/30">Identity Layer</Badge>
      </div>
      <Card className="bg-[#0f172a] border-[#1e293b] mb-4">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Registered Agents ({agents.length})</h3>
            <Button size="sm" onClick={() => setShowForm(!showForm)} className="bg-purple-500 hover:bg-purple-600 gap-2">
              <Plus className="w-4 h-4" /> Register Agent
            </Button>
          </div>
          {showForm && (
            <div className="mb-4 p-4 bg-[#1e293b] rounded-lg space-y-3">
              <Input placeholder="Agent name (e.g., MyAgent)" value={newAgentName} onChange={(e) => setNewAgentName(e.target.value)} className="bg-[#0f172a] border-[#334155]" />
              <Select value={newAgentRole} onValueChange={setNewAgentRole}>
                <SelectTrigger className="bg-[#0f172a] border-[#334155]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="code-review">Code Review</SelectItem>
                  <SelectItem value="data-analysis">Data Analysis</SelectItem>
                  <SelectItem value="customer-support">Customer Support</SelectItem>
                  <SelectItem value="security-scan">Security Scan</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button onClick={registerAgent} className="bg-purple-500 hover:bg-purple-600">
                  Register
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)} className="border-[#334155]">
                  Cancel
                </Button>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center gap-3 p-3 bg-[#1e293b]/50 rounded-lg">
                {statusIcon(agent.status)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{agent.name}</p>
                  <p className="text-xs text-gray-500">
                    {agent.id} · {agent.role} · {agent.owner}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono">{agent.trustScore}%</div>
                  <Badge
                    className={`text-xs ${
                      agent.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : agent.status === 'suspended'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {agent.status}
                  </Badge>
                </div>
                {agent.status !== 'revoked' && (
                  <Button size="sm" variant="ghost" onClick={() => revokeAgent(agent.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
