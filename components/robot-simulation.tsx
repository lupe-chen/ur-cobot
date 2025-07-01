"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Robot3DViewer } from "./robot-3d-viewer"
import { Play, Pause, Square, FastForward, Rewind } from "lucide-react"

interface SimulationStep {
  name: string
  jointAngles: number[]
  tcpPosition: number[]
  duration: number
  description: string
}

const simulationSteps: SimulationStep[] = [
  {
    name: "回到原點",
    jointAngles: [0, -90, 0, -90, 0, 0],
    tcpPosition: [0, -400, 300],
    duration: 3000,
    description: "機器人回到安全原點位置",
  },
  {
    name: "移動到取料點",
    jointAngles: [45, -60, 45, -75, 0, 0],
    tcpPosition: [200, -300, 150],
    duration: 2000,
    description: "移動到工件取料位置",
  },
  {
    name: "下降取料",
    jointAngles: [45, -60, 60, -90, 0, 0],
    tcpPosition: [200, -300, 50],
    duration: 1500,
    description: "下降到工件表面進行取料",
  },
  {
    name: "夾取工件",
    jointAngles: [45, -60, 60, -90, 0, 0],
    tcpPosition: [200, -300, 50],
    duration: 1000,
    description: "啟動夾爪夾取工件",
  },
  {
    name: "提升工件",
    jointAngles: [45, -60, 45, -75, 0, 0],
    tcpPosition: [200, -300, 150],
    duration: 1500,
    description: "提升工件到安全高度",
  },
  {
    name: "移動到放料點",
    jointAngles: [-30, -45, 30, -75, 0, 0],
    tcpPosition: [-150, -250, 150],
    duration: 2500,
    description: "移動到工件放置位置",
  },
  {
    name: "下降放料",
    jointAngles: [-30, -45, 45, -90, 0, 0],
    tcpPosition: [-150, -250, 50],
    duration: 1500,
    description: "下降到放置位置",
  },
  {
    name: "放開工件",
    jointAngles: [-30, -45, 45, -90, 0, 0],
    tcpPosition: [-150, -250, 50],
    duration: 1000,
    description: "打開夾爪放置工件",
  },
]

export function RobotSimulation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  useEffect(() => {
    if (isPlaying && currentStep < simulationSteps.length) {
      const stepDuration = simulationSteps[currentStep].duration / playbackSpeed
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentStep < simulationSteps.length - 1) {
              setCurrentStep((prev) => prev + 1)
              return 0
            } else {
              setIsPlaying(false)
              return 100
            }
          }
          return prev + 100 / (stepDuration / 100)
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isPlaying, currentStep, playbackSpeed])

  const handlePlay = () => {
    if (currentStep >= simulationSteps.length) {
      setCurrentStep(0)
      setProgress(0)
    }
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleStop = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
  }

  const handleStepForward = () => {
    if (currentStep < simulationSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setProgress(0)
    }
  }

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setProgress(0)
    }
  }

  const currentStepData = simulationSteps[currentStep] || simulationSteps[0]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>機器人流程模擬</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                步驟 {currentStep + 1} / {simulationSteps.length}
              </Badge>
              <Badge variant={isPlaying ? "default" : "secondary"}>{isPlaying ? "播放中" : "已暫停"}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* 3D 視覺化 */}
            <div className="lg:col-span-2">
              <Robot3DViewer
                jointAngles={currentStepData.jointAngles}
                tcpPosition={currentStepData.tcpPosition}
                targetPosition={
                  currentStep < simulationSteps.length - 1 ? simulationSteps[currentStep + 1].tcpPosition : undefined
                }
                showTrajectory={true}
                showWorkspace={true}
                height="h-80"
                controls={true}
              />
            </div>

            {/* 控制面板 */}
            <div className="space-y-4">
              {/* 播放控制 */}
              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" onClick={handleStepBackward}>
                  <Rewind className="h-4 w-4" />
                </Button>
                <Button
                  variant={isPlaying ? "destructive" : "default"}
                  size="sm"
                  onClick={isPlaying ? handlePause : handlePlay}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={handleStop}>
                  <Square className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleStepForward}>
                  <FastForward className="h-4 w-4" />
                </Button>
              </div>

              {/* 播放速度 */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Button
                    variant={playbackSpeed === 0.5 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPlaybackSpeed(0.5)}
                  >
                    0.5x
                  </Button>
                  <Button
                    variant={playbackSpeed === 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPlaybackSpeed(1)}
                  >
                    1x
                  </Button>
                  <Button
                    variant={playbackSpeed === 2 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPlaybackSpeed(2)}
                  >
                    2x
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">播放速度</p>
              </div>

              {/* 當前步驟信息 */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{currentStepData.name}</h4>
                  <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>步驟進度</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>

                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>預計時間:</span>
                    <span>{(currentStepData.duration / 1000).toFixed(1)}秒</span>
                  </div>
                  <div className="flex justify-between">
                    <span>剩餘時間:</span>
                    <span>{((currentStepData.duration * (100 - progress)) / 100 / 1000).toFixed(1)}秒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 步驟時間軸 */}
      <Card>
        <CardHeader>
          <CardTitle>流程時間軸</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {simulationSteps.map((step, index) => (
              <div
                key={index}
                className={`flex-shrink-0 p-3 rounded-lg border cursor-pointer transition-colors ${
                  index === currentStep
                    ? "bg-blue-50 border-blue-200"
                    : index < currentStep
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                }`}
                onClick={() => {
                  setCurrentStep(index)
                  setProgress(0)
                  setIsPlaying(false)
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      index === currentStep ? "bg-blue-500" : index < currentStep ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                <p className="text-xs text-muted-foreground w-24">{step.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
