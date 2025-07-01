import { Bell, Shield, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GlobalStatusBar() {
  return (
    <div className="flex items-center justify-between border-b bg-white px-6 py-3">
      <div className="flex items-center gap-4">
        <Select defaultValue="ur5e-01">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ur5e-01">UR5e-組裝產線01</SelectItem>
            <SelectItem value="ur5e-02">UR5e-組裝產線02</SelectItem>
            <SelectItem value="ur10-01">UR10-包裝產線01</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            運行中
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Wifi className="h-4 w-4" />
          <span>連線正常</span>
        </div>

        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
          <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
        </Button>

        <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
          <Shield className="h-4 w-4 mr-2" />
          緊急停止
        </Button>
      </div>
    </div>
  )
}
