import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, Target, TrendingUp } from "lucide-react"
import { Robot3DViewer } from "./robot-3d-viewer"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">儀表板總覽</h1>
        <Badge variant="outline" className="text-sm">
          最後更新: 2024-01-15 14:32
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">整體設備效率 (OEE)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">85%</div>
            <p className="text-xs text-muted-foreground">+2.1% 較昨日</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日產量</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">/ 1,500 件 (目標)</p>
            <Progress value={83.3} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均循環時間</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35.2秒</div>
            <p className="text-xs text-muted-foreground">-1.2秒 較昨日</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">稼動率</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">92%</div>
            <p className="text-xs text-muted-foreground">+5.2% 較昨日</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Robot Status */}
        <Card>
          <CardHeader>
            <CardTitle>機器人即時狀態</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Robot3DViewer
                jointAngles={[45.2, -30.1, 90.5, 15.0, -45.0, 0.0]}
                tcpPosition={[245.6, -123.4, 156.8]}
                height="h-48"
              />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">關節角度 (度)</p>
                  <div className="space-y-1 mt-2">
                    <div className="flex justify-between">
                      <span>J1:</span>
                      <span>45.2°</span>
                    </div>
                    <div className="flex justify-between">
                      <span>J2:</span>
                      <span>-30.1°</span>
                    </div>
                    <div className="flex justify-between">
                      <span>J3:</span>
                      <span>90.5°</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-medium">TCP 座標 (mm)</p>
                  <div className="space-y-1 mt-2">
                    <div className="flex justify-between">
                      <span>X:</span>
                      <span>245.6</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Y:</span>
                      <span>-123.4</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Z:</span>
                      <span>156.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Task */}
        <Card>
          <CardHeader>
            <CardTitle>當前任務</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">手機背蓋組裝作業_v1.2</h3>
                  <Badge className="bg-green-100 text-green-800">執行中</Badge>
                </div>
                <Progress value={68} className="mb-2" />
                <p className="text-sm text-muted-foreground">進度: 68% | 預計剩餘時間: 12分鐘</p>
              </div>

              <div>
                <h4 className="font-medium mb-3">近期事件日誌</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-muted-foreground">14:28</span>
                    <span>任務開始執行</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-muted-foreground">14:15</span>
                    <span>流程部署完成</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <span className="text-muted-foreground">13:45</span>
                    <span>安全檢查通過</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                    <span className="text-muted-foreground">13:30</span>
                    <span>系統啟動</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
