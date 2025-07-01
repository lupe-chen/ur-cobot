"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Robot3DViewer } from "./robot-3d-viewer"
import { Play, Pause, RotateCcw, Settings } from "lucide-react"

export function RobotControlPanel() {
  const [jointAngles, setJointAngles] = useState([45.2, -30.1, 90.5, 15.0, -45.0, 0.0])
  const [tcpPosition, setTcpPosition] = useState([245.6, -123.4, 156.8])
  const [targetPosition, setTargetPosition] = useState([300, -100, 200])
  const [isMoving, setIsMoving] = useState(false)
  const [movementProgress, setMovementProgress] = useState(68)

  // 模擬機器人運動
  useEffect(() => {
    if (isMoving) {
      const interval = setInterval(() => {
        setMovementProgress((prev) => {
          if (prev >= 100) {
            setIsMoving(false)
            return 100
          }
          return prev + 1
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isMoving])

  const handleJointChange = (jointIndex: number, value: number[]) => {
    const newAngles = [...jointAngles]
    newAngles[jointIndex] = value[0]
    setJointAngles(newAngles)

    // 這裡可以添加正向運動學計算來更新 TCP 位置
    // 簡化版本：模擬 TCP 位置變化
    const newTcp = [...tcpPosition]
    newTcp[0] += (value[0] - jointAngles[jointIndex]) * 2
    setTcpPosition(newTcp)
  }

  const resetToHome = () => {
    setJointAngles([0, -90, 0, -90, 0, 0])
    setTcpPosition([0, -400, 300])
    setMovementProgress(0)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* 3D 視覺化 */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>3D 機器人控制</CardTitle>
            <div className="flex gap-2">
              <Button variant={isMoving ? "destructive" : "default"} size="sm" onClick={() => setIsMoving(!isMoving)}>
                {isMoving ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isMoving ? "暫停" : "開始"}
              </Button>
              <Button variant="outline" size="sm" onClick={resetToHome}>
                <RotateCcw className="h-4 w-4 mr-2" />
                回原點
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Robot3DViewer
            jointAngles={jointAngles}
            tcpPosition={tcpPosition}
            targetPosition={targetPosition}
            showTrajectory={true}
            showWorkspace={true}
            height="h-96"
            controls={true}
          />

          {/* 運動狀態 */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">運動進度</span>
              <Badge variant={isMoving ? "default" : "secondary"}>{isMoving ? "運行中" : "停止"}</Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${movementProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>當前位置: [{tcpPosition.map((p) => p.toFixed(1)).join(", ")}]</span>
              <span>{movementProgress}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 關節控制面板 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            關節控制
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {jointAngles.map((angle, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">J{index + 1}</label>
                <span className="text-sm text-muted-foreground">{angle.toFixed(1)}°</span>
              </div>
              <Slider
                value={[angle]}
                onValueChange={(value) => handleJointChange(index, value)}
                min={-180}
                max={180}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-180°</span>
                <span>180°</span>
              </div>
            </div>
          ))}

          <Separator />

          {/* TCP 位置顯示 */}
          <div className="space-y-3">
            <h4 className="font-medium">TCP 位置 (mm)</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center">
                <div className="font-medium text-red-600">X</div>
                <div className="font-mono">{tcpPosition[0].toFixed(1)}</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-green-600">Y</div>
                <div className="font-mono">{tcpPosition[1].toFixed(1)}</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-blue-600">Z</div>
                <div className="font-mono">{tcpPosition[2].toFixed(1)}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* 目標位置設定 */}
          <div className="space-y-3">
            <h4 className="font-medium">目標位置 (mm)</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center">
                <div className="font-medium text-red-600">X</div>
                <div className="font-mono">{targetPosition[0].toFixed(1)}</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-green-600">Y</div>
                <div className="font-mono">{targetPosition[1].toFixed(1)}</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-blue-600">Z</div>
                <div className="font-mono">{targetPosition[2].toFixed(1)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
