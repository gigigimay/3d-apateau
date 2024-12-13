import { useEffect, useRef } from 'react'

import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Gltf, OrbitControls, SoftShadows } from '@react-three/drei'
// import appleGlb from './assets/apple.glb'
import heartGlb from './assets/props_heart.glb'
import classNames from 'classnames'
import { useDesc } from 'DescContext'

const blendModes = [
  'mix-blend-normal',
  'mix-blend-multiply',
  'mix-blend-screen',
  'mix-blend-overlay',
  'mix-blend-darken',
  'mix-blend-lighten',
  'mix-blend-color-dodge',
  'mix-blend-color-burn',
  'mix-blend-hard-light',
  'mix-blend-soft-light',
  'mix-blend-difference',
  'mix-blend-exclusion',
  'mix-blend-hue',
  'mix-blend-saturation',
  'mix-blend-color',
  'mix-blend-luminosity',
  'mix-blend-plus-darker',
  'mix-blend-plus-lighter',
]

// const AppleComponent = () => {
//   const ref = useRef<THREE.Group<THREE.Object3DEventMap>>(null)
//   return (
//     <Gltf
//       ref={ref}
//       src={appleGlb}
//       scale={0.01}
//       position={[0.35, -0, -0.3]}
//       rotation={[0, 0, 0]}
//       castShadow
//     />
//   )
// }

const HeartComponent = () => {
  const ref = useRef<THREE.Group<THREE.Object3DEventMap>>(null)
  useFrame((_state, delta) => {
    ref.current!.rotation.y += delta
    // ref.current!.scale.x *= Math.sin(Math.PI)
  })
  return (
    <Gltf
      ref={ref}
      src={heartGlb}
      // scale={0.01}
      // position={[-0.2, 0, 0]}
      rotation={[0, Math.PI * 0.75, 0]}
      castShadow
      receiveShadow
    />
  )
}

const Apateu = ({ className }: { className: string }) => {
  const { setDesc, setBlendMode, blendMode } = useDesc()
  return (
    <button
      id={`btn-${className}`}
      className={classNames(
        className,
        'block text-right group cursor-pointer',
        'rounded-md px-2',
        'focus:outline-dotted focus:outline-current focus:outline-4',
        blendMode === className && '!mix-blend-normal'
      )}
      onMouseEnter={() => setDesc(className)}
      onMouseLeave={() => setDesc('')}
      onClick={() => setBlendMode(className)}
    >
      {blendMode === className && '> '}apateu
    </button>
  )
}

const Scene = () => {
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const meshRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame(({ clock }, _delta) => {
    const on = Math.floor(clock.elapsedTime * 2.45) % 2
    ambientRef.current!.color = new THREE.Color(on ? 'maroon' : 'white')
    // meshRef.current!.color = new THREE.Color(on ? 'black' : 'white')
  })
  return (
    <>
      <OrbitControls />
      <fog attach="fog" args={['white', 0, 40]} />
      <ambientLight ref={ambientRef} intensity={0.5} color="lightpink" />
      {/* <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI * 1.5}
          color="violet"
          castShadow
          // color="navy"
        /> */}
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={3}
        shadow-mapSize={1024}
        color="hotpink"
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </directionalLight>
      <pointLight
        position={[-10, -1.4, -10]}
        decay={0}
        intensity={1.5}
        color="violet"
      />
      {/* <DreiBox /> */}
      <HeartComponent />
      <shadowMaterial />
      <SoftShadows />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        {/* <shadowMaterial transparent opacity={1} /> */}
        <meshStandardMaterial ref={meshRef} color={'white'} />
      </mesh>
      {/* <Environment preset="apartment" /> */}
    </>
  )
}

const App = () => {
  const { desc, blendMode, setBlendMode } = useDesc()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      const currIndex = blendModes.findIndex((b) => b === blendMode)
      const modifier = e.key === 'ArrowDown' ? 1 : -1
      const newIndex = Math.min(
        blendModes.length - 1,
        Math.max(0, currIndex + modifier)
      )
      const newBlendMode = blendModes[newIndex]
      setBlendMode(newBlendMode)
      document.getElementById(`btn-${newBlendMode}`)?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [blendMode, setBlendMode])

  return (
    <div className="fixed inset-0">
      <Canvas shadows camera={{ fov: 30, position: [0, 1, 5] }}>
        <Scene />
      </Canvas>
      <div
        className={classNames(
          'absolute top-0 left-0 p-8 z-10 text-pink-700',
          'flex flex-col items-start pointer-events-none',
          blendMode
        )}
      >
        <div className="text-8xl uppercase font-bold">Kissy face</div>
        <div className="text-6xl whitespace-pre font-serif">
          {'- K i s s y   f a c e -'}
        </div>
        <div className="text-5xl font-extralight">Sent to your phone</div>
        <div className="text-6xl font-bold italic">BUT...</div>
        <div className="text-5xl mt-10 font-extralight">I'm tryna</div>
        <div className="text-7xl text-white px-4 py-0 bg-pink-700">
          kiss your lips
        </div>
        <div className="text-8xl font-bold">for real</div>
        <div className="text-2xl font-serif">uh-huh, uh-huh</div>
      </div>

      <div
        className={classNames(
          'absolute bottom-0 right-0 overflow-y-auto p-8',
          'text-right text-pink-700 text-3xl font-black',
          'flex flex-col items-end'
        )}
      >
        {blendModes.map((blendMode) => (
          <Apateu className={blendMode} key={blendMode} />
        ))}
      </div>

      <div
        className={classNames(
          'z-10 absolute left-0 bottom-0 p-8',
          'text-2xl text-pink-700 font-extralight',
          'mix-blend-difference'
        )}
      >
        {desc || blendMode}
      </div>
    </div>
  )
}

export default App
