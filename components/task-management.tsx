import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Play, Edit, Copy, Trash2, MoreHorizontal, Clock, CheckCircle, AlertCircle } from "lucide-react"

const tasks = [
  {
    id: 1,
    name: "手機背蓋組裝作業",
    version: "v1.2",
    status: "running",
    lastRun: "2024-01-15 14:28",
    cycleTime: "35.2秒",
    successRate: "98.5%",
    description: "手機背蓋自動組裝流程",
  },
  {
    id: 2,
    name: "PCB板檢測流程",
    version: "v2.1",
    status: "idle",
    lastRun: "2024-01-15 12:45",
    cycleTime: "28.7秒",
    successRate: "99.2%",
    description: "PCB板品質檢測與分類",
  },
  {
    id: 3,
    name: "包裝盒封裝作業",
    version: "v1.0",
    status: "scheduled",
    lastRun: "2024-01-14 16:30",
    cycleTime: "42.1秒",
    successRate: "97.8%",
    description: "產品包裝盒自動封裝",
  },
  {
    id: 4,
    name: "零件上下料",
    version: "v3.0",
    status: "error",
    lastRun: "2024-01-15 10:15",
    cycleTime: "18.5秒",
    successRate: "95.3%",
    description: "CNC加工零件上下料",
  },
]

const templates = [
  { name: "上下料模板", description: "通用上下料作業流程", icon: "📦" },
  { name: "包裝模板", description: "產品包裝作業流程", icon: "📋" },
  { name: "檢測模板", description: "品質檢測作業流程", icon: "🔍" },
  { name: "組裝模板", description: "零件組裝作業流程", icon: "🔧" },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "running":
      return <Badge className="bg-green-100 text-green-800">執行中</Badge>
    case "idle":
      return <Badge variant="secondary">閒置</Badge>
    case "scheduled":
      return <Badge className="bg-blue-100 text-blue-800">已排程</Badge>
    case "error":
      return <Badge variant="destructive">錯誤</Badge>
    default:
      return <Badge variant="secondary">未知</Badge>
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "running":
      return <Play className="h-4 w-4 text-green-600" />
    case "idle":
      return <Clock className="h-4 w-4 text-gray-600" />
    case "scheduled":
      return <CheckCircle className="h-4 w-4 text-blue-600" />
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-600" />
  }
}

export function TaskManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">任務管理</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新增任務
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Task Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">流程模板</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {templates.map((template, index) => (
              <div key={index} className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{template.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{template.name}</p>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              自訂模板
            </Button>
          </CardContent>
        </Card>

        {/* Task List */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">任務列表</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="搜尋任務..." className="pl-8 w-64" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>任務名稱</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>最後執行</TableHead>
                  <TableHead>循環時間</TableHead>
                  <TableHead>成功率</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <span className="font-medium">{task.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {task.version}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{task.lastRun}</TableCell>
                    <TableCell className="font-mono text-sm">{task.cycleTime}</TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">{task.successRate}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Play className="h-4 w-4 mr-2" />
                            執行
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            編輯
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            複製
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            刪除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium mb-2">建立新任務</h3>
            <p className="text-sm text-muted-foreground">從頭開始建立全新的機器人任務流程</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
              <Copy className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium mb-2">複製現有任務</h3>
            <p className="text-sm text-muted-foreground">基於現有任務建立新的變體版本</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-medium mb-2">匯入任務</h3>
            <p className="text-sm text-muted-foreground">從檔案或其他系統匯入任務設定</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
