import React, { useRef, useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { PivotControls, RoundedBox, PresentationControls } from "@react-three/drei"
import { useControls } from "leva"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import Head from "next/head"
import Image from "next/image"

import uml_diagram from "../public/uml_study.png"

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
    color: "#83807b",
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

function Title() {
  const title = "Tectonism Web App [Demo]"
  return (
    <div style={{backgroundColor:"black", color: "white", textAlign:"center", paddingTop: "5vh"}}>
      <h1>{title}</h1>
    </div>
  )
}

function Text() {
  return (
    <div style={{color:"white", textAlign:"center"}}>
      <h4>v0.1 <del>Work in Progress</del></h4>
      <h4>Part 1/2: Modifiable Geometry (could be parametrically generated with 2/2)</h4>
      <h4>Part 2/2: (Relational) UML Diagram</h4>
    </div>
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
    <div style={{ backgroundColor: "black"}}>
      <Head>
        <meta name="robots" content="noindex" />
        <title>secret-projects</title>
      </Head>
      <Title />
      <Text />
      <Canvas style={{ height: "80vh" }}>
        <color attach="background" args={["#171717"]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <PresentationControls>
          <Box />
          {/* <House /> */}
        </PresentationControls>
      </Canvas>
      
      <div style ={{ width: "90vw", height: "90vh", position: "relative", margin: "0 auto", paddingBottom: "10vh"}}>
        <Image src={uml_diagram} alt="uml-diagram" layout="fill"/>
      </div>
      <br />
      <br />
      <br />
    </div>
  )
}
