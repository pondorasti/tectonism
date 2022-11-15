import React, { useRef, useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { PivotControls, RoundedBox, PresentationControls } from "@react-three/drei"
import { useControls } from "leva"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

function Box() {
  const {
    width,
    height,
    "r-value": thickness,
    radius,
    color,
  } = useControls({
    width: { value: 2, min: 0.1, max: 4, step: 0.1 },
    height: { value: 2, min: 0.1, max: 4, step: 0.1 },
    "r-value": { value: 0.1, min: 0.2, max: 0.75, step: 0.01 },
    radius: { value: 0.1, min: 0, max: 0.15, step: 0.01 },
    color: "orange",
  })

  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // useFrame((state, delta) => (mesh.current.rotation.x += 0.01))

  return (
    <PivotControls disableSliders>
      <RoundedBox
        ref={mesh}
        args={[height, width, thickness]}
        radius={radius}
        rotation={[-0.5, 1, -1]}
        scale={1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <meshStandardMaterial color={color} />
      </RoundedBox>
    </PivotControls>
  )
}

function House() {
  const gltf = useLoader(GLTFLoader, "./a_piece_of_japan/scene.gltf")

  return (
    <Suspense fallback={null}>
      <primitive scale={0.25} object={gltf.scene} />
    </Suspense>
  )
}

export default function App() {
  return (
    <Canvas style={{ height: "100vh" }}>
      <color attach="background" args={["#171717"]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <PresentationControls>
        <Box />
        {/* <House /> */}
      </PresentationControls>
    </Canvas>
  )
}
