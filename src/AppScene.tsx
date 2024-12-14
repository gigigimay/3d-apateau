import { useRef } from 'react'

import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, SoftShadows } from '@react-three/drei'
import { getBeatDuration, getBouncingValue, getNthBar, getNthBeat } from 'utils'
import { Heart } from 'Heart'
import { BPM, primaryColor } from 'config'

const AnimatedHeart = () => {
  const ref = useRef<THREE.Group<THREE.Object3DEventMap>>(null)

  useFrame(({ clock }, delta) => {
    ref.current!.rotation.y += delta / 2

    const time = clock.elapsedTime + getBeatDuration(BPM) * 0.25
    const bar = getNthBar(time, BPM)
    const beat = getNthBeat(time, BPM)
    if (bar % 4 !== 0) {
      let value = getBouncingValue(
        time,
        BPM,
        beat === 3 ? 0 : beat === 4 ? 0.3 : 0.1
      )
      if (beat !== 2) value *= -1
      if (bar % 2 === 0) value *= -1
      const modifier = beat === 4 ? 0.75 : 1
      ref.current!.rotation.z = (value / 8) * modifier
      ref.current!.position.y = 0.1
    } else {
      let value = getBouncingValue(time, BPM, beat === 3 ? 0 : undefined)
      ref.current!.rotation.z = 0
      if (beat === 2) value = 0
      const modifier = beat === 1 ? 1 : 0.9
      ref.current!.position.y = 0.1 + (value / 12) * modifier
      ref.current!.scale.y = 1 + (value / 15) * modifier
    }
  })

  return <Heart ref={ref} />
}

export const AppScene = () => {
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const meshRef = useRef<THREE.MeshStandardMaterial>(null)
  const fogRef = useRef<THREE.Fog>(null)

  useFrame(({ clock }, _delta) => {
    const bar = getNthBar(clock.elapsedTime, BPM)
    ambientRef.current!.color = new THREE.Color(
      bar % 2 === 0 ? 'black' : primaryColor
    )
    meshRef.current!.color = new THREE.Color(
      bar % 4 === 0 ? 'black' : primaryColor
    )
  })

  return (
    <>
      <OrbitControls />
      <fog ref={fogRef} attach="fog" args={['white', 0, 40]} />
      <ambientLight ref={ambientRef} intensity={0.5} />
      <directionalLight
        castShadow
        position={[2.5, 10, 5]}
        intensity={3}
        shadow-mapSize={1024}
        color="white"
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </directionalLight>
      <pointLight
        position={[-10, -1.4, -10]}
        decay={1}
        intensity={1.5}
        color="violet"
      />
      <AnimatedHeart />
      <shadowMaterial />
      <SoftShadows />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial ref={meshRef} />
      </mesh>
      <Environment preset="apartment" environmentIntensity={1} />
    </>
  )
}
