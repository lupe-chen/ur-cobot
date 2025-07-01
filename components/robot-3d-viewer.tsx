"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Grid, Html } from "@react-three/drei"
import { Suspense, useRef } from "react"
import { type Group, Vector3 } from "three"
import { Badge } from "@/components/ui/badge"

interface Robot3DViewerProps {
  jointAngles: number[] // [J1, J2, J3, J4, J5, J6] in degrees
  tcpPosition: number[] // [X, Y, Z] in mm
  targetPosition?: number[] // [X, Y, Z] in mm
  showTrajectory?: boolean
  showWorkspace?: boolean
  height?: string
  controls?: boolean
}

// UR5e 機器人組件
function UR5eRobot({ jointAngles, tcpPosition }: { jointAngles: number[]; tcpPosition: number[] }) {
  const robotRef = useRef<Group>(null)

  // 將角度轉換為弧度
  const radians = jointAngles.map((angle) => (angle * Math.PI) / 180)

  // UR5e 的 DH 參數 (簡化版)
  const linkLengths = [0.1625, 0.425, 0.3922, 0.1333, 0.0997, 0.0996] // 米

  return (
    <group ref={robotRef} position={[0, 0, 0]}>
      {/* 基座 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.1]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>

      {/* 關節 1 - 基座旋轉 */}
      <group rotation={[0, radians[0], 0]}>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.16]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>

        {/* 關節 2 - 肩部 */}
        <group position={[0, 0.1625, 0]} rotation={[radians[1], 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.12, 0.08, 0.08]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>

          {/* 上臂連桿 */}
          <mesh position={[0.2125, 0, 0]}>
            <boxGeometry args={[0.425, 0.06, 0.06]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>

          {/* 關節 3 - 肘部 */}
          <group position={[0.425, 0, 0]} rotation={[radians[2], 0, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.08, 0.08, 0.08]} />
              <meshStandardMaterial color="#dc2626" />
            </mesh>

            {/* 前臂連桿 */}
            <mesh position={[0.1961, 0, 0]}>
              <boxGeometry args={[0.3922, 0.05, 0.05]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>

            {/* 關節 4 - 腕部 1 */}
            <group position={[0.3922, 0, 0.1333]} rotation={[0, 0, radians[3]]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.08]} />
                <meshStandardMaterial color="#dc2626" />
              </mesh>

              {/* 關節 5 - 腕部 2 */}
              <group position={[0, 0, -0.0997]} rotation={[radians[4], 0, 0]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.03, 0.03, 0.06]} />
                  <meshStandardMaterial color="#dc2626" />
                </mesh>

                {/* 關節 6 - 腕部 3 */}
                <group position={[0, 0, -0.0996]} rotation={[0, 0, radians[5]]}>
                  <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.025, 0.025, 0.04]} />
                    <meshStandardMaterial color="#dc2626" />
                  </mesh>

                  {/* 工具中心點 (TCP) */}
                  <mesh position={[0, 0, -0.05]}>
                    <sphereGeometry args={[0.02]} />
                    <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} />
                  </mesh>

                  {/* TCP 標籤 */}
                  <Html position={[0, 0, -0.08]} center>
                    <Badge className="bg-green-100 text-green-800 text-xs">TCP</Badge>
                  </Html>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

// 工作空間顯示組件
function Workspace() {
  return (
    <group>
      {/* 工作空間邊界 (圓柱形) */}
      <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 0.85, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} />
      </mesh>

      {/* 安全邊界 */}
      <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 0.95, 32]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

// 軌跡顯示組件
function Trajectory({ currentPosition, targetPosition }: { currentPosition: number[]; targetPosition?: number[] }) {
  if (!targetPosition) return null

  // 將毫米轉換為米，並調整座標系
  const current = new Vector3(currentPosition[0] / 1000, currentPosition[2] / 1000, -currentPosition[1] / 1000)
  const target = new Vector3(targetPosition[0] / 1000, targetPosition[2] / 1000, -targetPosition[1] / 1000)

  return (
    <group>
      {/* 當前位置標記 */}
      <mesh position={current}>
        <sphereGeometry args={[0.01]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
      </mesh>

      {/* 目標位置標記 */}
      <mesh position={target}>
        <sphereGeometry args={[0.01]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
      </mesh>

      {/* 軌跡線 */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([current.x, current.y, current.z, target.x, target.y, target.z])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8b5cf6" linewidth={2} />
      </line>

      {/* 位置標籤 */}
      <Html position={target} center>
        <Badge className="bg-red-100 text-red-800 text-xs">目標點</Badge>
      </Html>
    </group>
  )
}

// 載入中組件
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">載入 3D 模型中...</p>
      </div>
    </div>
  )
}

export function Robot3DViewer({
  jointAngles,
  tcpPosition,
  targetPosition,
  showTrajectory = false,
  showWorkspace = false,
  height = "h-64",
  controls = false,
}: Robot3DViewerProps) {
  return (
    <div className={`w-full ${height} bg-gray-50 rounded-lg overflow-hidden`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{
            position: [1.5, 1.5, 1.5],
            fov: 50,
            near: 0.1,
            far: 100,
          }}
          shadows
        >
          {/* 環境設定 */}
          <Environment preset="studio" />
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          {/* 地面網格 */}
          <Grid
            position={[0, 0, 0]}
            args={[2, 2]}
            cellSize={0.1}
            cellThickness={0.5}
            cellColor="#6b7280"
            sectionSize={0.5}
            sectionThickness={1}
            sectionColor="#374151"
            fadeDistance={2}
            fadeStrength={1}
          />

          {/* 機器人模型 */}
          <UR5eRobot jointAngles={jointAngles} tcpPosition={tcpPosition} />

          {/* 工作空間 */}
          {showWorkspace && <Workspace />}

          {/* 軌跡 */}
          {showTrajectory && <Trajectory currentPosition={tcpPosition} targetPosition={targetPosition} />}

          {/* 控制器 */}
          {controls && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={0.5}
              maxDistance={5}
              target={[0, 0.4, 0]}
            />
          )}
        </Canvas>
      </Suspense>

      {/* 控制提示 */}
      {controls && (
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          拖拽旋轉 | 滾輪縮放 | 右鍵平移
        </div>
      )}
    </div>
  )
}
