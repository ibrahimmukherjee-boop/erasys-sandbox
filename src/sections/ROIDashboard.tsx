import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingDown, Shield, Clock, Users, Zap } from 'lucide-react'

const metrics = [
  { label: 'Fraud Reduction', value: 89, target: 85, unit: '%', icon: <Shield className="w-5 h-5" />, color: 'text-green-400' },
  { label: 'IT Cost Savings', value: 60, target: 55, unit: '%', icon: <TrendingDown className="w-5 h-5" />, color: 'text-blue-400' },
  { label: 'Auth Time', value: 0.3, target: 1.0, unit: 's', icon: <Clock className="w-5 h-5" />, color: 'text-purple-400', lowerIsBetter: true },
  { label: 'User Friction', value: 2, target: 10, unit: '%', icon: <Users className="w-5 h-5" />, color: 'text-orange-400', lowerIsBetter: true },
  { label: 'Incident Response', value: 95, target: 90, unit: '%', icon: <Zap className="w-5 h-5" />, color: 'text-red-400' },
]

const costBreakdown = [
  { category: 'Password resets', before: 45000, after: 8000 },
  { category: 'MFA tokens', before: 28000, after: 0 },
  { category: 'SIEM licensing', before: 65000, after: 25000 },
  { category: 'Incident response', before: 120000, after: 35000 },
  { category: 'Compliance audit', before: 35000, after: 12000 },
]

export function ROIDashboard() {
  const totalBefore = costBreakdown.reduce((sum, c) => sum + c.before, 0)
  const totalAfter = costBreakdown.reduce((sum, c) => sum + c.after, 0)
  const totalSavings = totalBefore - totalAfter

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#00d4aa] flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-[#0a0e1a]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">ROI Dashboard</h2>
          <p className="text-sm text-gray-400">Security metrics and cost savings analysis</p>
        </div>
        <Badge className="ml-auto bg-[#00d4aa]/20 text-[#00d4aa] border-[#00d4aa]/30">Analytics</Badge>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {metrics.map((m) => (
          <Card key={m.label} className="bg-[#0f172a] border-[#1e293b]">
            <CardContent className="p-4">
              <div className={`${m.color} mb-2`}>{m.icon}</div>
              <p className="text-2xl font-bold">
                {m.value}
                {m.unit}
              </p>
              <p className="text-xs text-gray-400">{m.label}</p>
              <p className="text-xs text-gray-600 mt-1">
                Target: {m.lowerIsBetter ? '<' : '>'}
                {m.target}
                {m.unit}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-[#0f172a] border-[#1e293b]">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Annual Cost Comparison</h3>
          <div className="space-y-4">
            {costBreakdown.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{item.category}</span>
                  <div className="flex gap-4">
                    <span className="text-gray-500 line-through">${(item.before / 1000).toFixed(0)}k</span>
                    <span className="text-green-400 font-medium">${(item.after / 1000).toFixed(0)}k</span>
                  </div>
                </div>
                <div className="relative h-4 bg-[#1e293b] rounded-full overflow-hidden">
                  <div className="absolute h-full bg-red-500/30 rounded-full" style={{ width: `${(item.before / totalBefore) * 100}%` }} />
                  <div className="absolute h-full bg-green-500/50 rounded-full" style={{ width: `${(item.after / totalBefore) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-[#00d4aa]/10 border border-[#00d4aa]/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Annual Savings</p>
                <p className="text-3xl font-bold text-[#00d4aa]">${(totalSavings / 1000).toFixed(0)}k</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Reduction</p>
                <p className="text-2xl font-bold text-[#00d4aa]">{((totalSavings / totalBefore) * 100).toFixed(0)}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
