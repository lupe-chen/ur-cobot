"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Move, Hand, Clock, Zap, Eye, Play, Save, Upload, ArrowRight, Settings } from "lucide-react"
import { useState } from "react"
import { RobotSimulation } from "./robot-simulation"

const commandCategories = [
  {
    name: "移動",
    icon: Move,
    commands: ["線性移動", "關節移動", "圓弧移動", "回到原點"],
  },
  {
    name: "夾爪",
    icon: Hand,
    commands: ["夾取", "放開", "設定力度", "檢測物件"],
  },
  {
    name: "邏輯",
    icon: Zap,
    commands: ["條件判斷", "迴圈", "變數設定", "計算"],
  },
  {
    name: "等待",
    icon: Clock,
    commands: ["延遲", "等待輸入", "等待信號", "等待完成"],
  },
  {
    name: "感測",
    icon: Eye,
    commands: ["力覺感測", "視覺檢測", "位置確認", "碰撞檢測"],
  },
]

export function ProcessEditor() {
  const [showSimulation, setShowSimulation] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">流程編輯器</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            儲存
          </Button>
          <Button variant="outline" onClick={() => setShowSimulation(!showSimulation)}>
            <Play className="h-4 w-4 mr-2" />
            3D 模擬
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            部署至機器人
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Command Library */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">指令庫</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {commandCategories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center gap-2 mb-2">
                  <category.icon className="h-4 w-4" />
                  <h3 className="font-medium">{category.name}</h3>
                </div>
                <div className="space-y-1">
                  {category.commands.map((command) => (
                    <div
                      key={command}
                      className="p-2 text-sm bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                      draggable
                    >
                      {command}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Process Canvas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">流程畫布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-96 border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border">
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">回到原點</p>
                    <p className="text-sm text-muted-foreground">速度: 50% | 加速度: 30%</p>
                  </div>
                  <Settings className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border">
                  <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">線性移動</p>
                    <p className="text-sm text-muted-foreground">目標點: P1 | 速度: 75%</p>
                  </div>
                  <Settings className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg border">
                  <div className="h-8 w-8 rounded-full bg-yellow-600 text-white flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">夾取</p>
                    <p className="text-sm text-muted-foreground">力度: 80% | 檢測: 開啟</p>
                  </div>
                  <Settings className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>

                <div className="text-center text-muted-foreground text-sm mt-8">拖曳指令到此處建立流程</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parameter Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">參數設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="command-name">指令名稱</Label>
              <Input id="command-name" value="線性移動" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="target-point">目標點位</Label>
              <Input id="target-point" value="P1" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="speed">速度 (%)</Label>
              <Input id="speed" type="number" value="75" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="acceleration">加速度 (%)</Label>
              <Input id="acceleration" type="number" value="50" className="mt-1" />
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">安全設定</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>碰撞檢測</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    開啟
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>安全邊界</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    已設定
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {showSimulation && (
        <div className="mt-6">
          <RobotSimulation />
        </div>
      )}
    </div>
  )
}
