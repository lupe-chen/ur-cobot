"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, AlertTriangle, Clock } from "lucide-react"

const productionData = [
  { date: "01/10", production: 1200, target: 1500, oee: 82 },
  { date: "01/11", production: 1350, target: 1500, oee: 85 },
  { date: "01/12", production: 1180, target: 1500, oee: 79 },
  { date: "01/13", production: 1420, target: 1500, oee: 88 },
  { date: "01/14", production: 1250, target: 1500, oee: 85 },
  { date: "01/15", production: 1380, target: 1500, oee: 87 },
]

const downtimeData = [
  { reason: "待料", value: 35, color: "#ef4444" },
  { reason: "設備故障", value: 25, color: "#f97316" },
  { reason: "程式調整", value: 20, color: "#eab308" },
  { reason: "品質檢查", value: 15, color: "#22c55e" },
  { reason: "其他", value: 5, color: "#6b7280" },
]

const cycleTimeData = [
  { time: "08:00", cycleTime: 36.2 },
  { time: "10:00", cycleTime: 35.8 },
  { time: "12:00", cycleTime: 37.1 },
  { time: "14:00", cycleTime: 35.2 },
  { time: "16:00", cycleTime: 34.9 },
  { time: "18:00", cycleTime: 35.5 },
]

export function DataAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">數據分析</h1>
        <div className="flex gap-2">
          <Select defaultValue="week">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">今日</SelectItem>
              <SelectItem value="week">本週</SelectItem>
              <SelectItem value="month">本月</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            導出報表
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">週平均 OEE</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">84.3%</div>
            <p className="text-xs text-muted-foreground">+3.2% 較上週</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總產量</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,180</div>
            <p className="text-xs text-muted-foreground">件 (本週)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均循環時間</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35.6秒</div>
            <p className="text-xs text-muted-foreground">-0.8秒 較上週</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">停機次數</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-muted-foreground">次 (本週)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Production Trend */}
        <Card>
          <CardHeader>
            <CardTitle>產能趨勢圖</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                production: {
                  label: "實際產量",
                  color: "#3b82f6",
                },
                target: {
                  label: "目標產量",
                  color: "#ef4444",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="production" fill="#3b82f6" name="實際產量" />
                  <Bar dataKey="target" fill="#ef4444" name="目標產量" opacity={0.3} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Downtime Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>停機原因分析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={downtimeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {downtimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-2 border rounded shadow">
                            <p className="font-medium">{data.reason}</p>
                            <p className="text-sm text-muted-foreground">{data.value}%</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {downtimeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.reason}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cycle Time Trend */}
      <Card>
        <CardHeader>
          <CardTitle>循環時間趨勢</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              cycleTime: {
                label: "循環時間 (秒)",
                color: "#10b981",
              },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cycleTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="cycleTime"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
