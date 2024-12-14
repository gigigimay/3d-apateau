import { Canvas } from '@react-three/fiber'
import { AppScene } from 'AppScene'
import { AppOverlay } from 'AppOverlay'

const App = () => {
  return (
    <div className="fixed inset-0">
      <Canvas shadows camera={{ fov: 40, position: [0, 1, 5] }}>
        <AppScene />
      </Canvas>
      <AppOverlay />
    </div>
  )
}

export default App
