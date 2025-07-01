import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Camera, Zap, Gauge, Play, Pause, Square } from "lucide-react"
import { Robot3DViewer } from "./robot-3d-viewer"
import { RobotControlPanel } from "./robot-control-panel"

export function LiveMonitor() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">即時監控</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-2" />
            開始
          </Button>
          <Button variant="outline" size="sm">
            <Pause className="h-4 w-4 mr-2" />
            暫停
          </Button>
          <Button variant="destructive" size="sm">
            <Square className="h-4 w-4 mr-2" />
            停止
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Camera Feed */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              攝影機視圖
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">即時影像串流</p>
                <p className="text-sm opacity-75">1920x1080 @ 30fps</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className="bg-red-100 text-red-800">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  錄影中
                </Badge>
                <span className="text-sm text-muted-foreground">14:32:15</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  截圖
                </Button>
                <Button variant="outline" size="sm">
                  錄影
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3D Robot Model */}
        <Card>
          <CardHeader>
            <CardTitle>3D 機器人視覺化</CardTitle>
          </CardHeader>
          <CardContent>
            <Robot3DViewer
              jointAngles={[45.2, -30.1, 90.5, 15.0, -45.0, 0.0]}
              tcpPosition={[245.6, -123.4, 156.8]}
              targetPosition={[300, -100, 200]}
              showTrajectory={true}
              showWorkspace={true}
              height="aspect-square"
              controls={true}
            />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>當前位置:</span>
                <span className="font-mono">X:245 Y:-123 Z:157</span>
              </div>
              <div className="flex justify-between">
                <span>目標位置:</span>
                <span className="font-mono">X:300 Y:-100 Z:200</span>
              </div>
              <div className="flex justify-between">
                <span>移動進度:</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* I/O Status Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              I/O 狀態面板
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">數位輸入 (DI)</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <div key={num} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">DI{num}</span>
                      <Badge variant={num <= 3 ? "default" : "secondary"}>{num <= 3 ? "HIGH" : "LOW"}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">數位輸出 (DO)</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <div key={num} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">DO{num}</span>
                      <Switch checked={num <= 2} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">類比輸入 (AI)</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI1 (電壓)</span>
                    <span className="font-mono text-sm">3.24V</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI2 (電流)</span>
                    <span className="font-mono text-sm">1.85A</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parameter Override */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              參數微調
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">全局速度</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <Slider defaultValue={[75]} max={100} step={1} />
              <p className="text-xs text-muted-foreground mt-1">調整所有動作的執行速度</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">加速度</span>
                <span className="text-sm text-muted-foreground">50%</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={1} />
              <p className="text-xs text-muted-foreground mt-1">調整加速度參數</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">力覺靈敏度</span>
                <span className="text-sm text-muted-foreground">80%</span>
              </div>
              <Slider defaultValue={[80]} max={100} step={1} />
              <p className="text-xs text-muted-foreground mt-1">調整力覺感測器靈敏度</p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">安全模式</span>
                <Badge className="bg-green-100 text-green-800">啟用</Badge>
              </div>
              <p className="text-xs text-muted-foreground">在安全模式下，所有參數調整都會受到限制，確保操作安全。</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <RobotControlPanel />
      </div>
    </div>
  )
}
