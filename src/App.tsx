import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AxisLines from './components/AxisLines';
import GridLines from './components/GridLines';
import VectorSphere from './components/VectorSphere';
import { Vector3 } from 'three'; // Import Vector3 from three

function App() {
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);
  const initialSpherePosition = new Vector3(0, 0, 0); // Initialize the sphere position

  const handleToggleOrbitControls = (enabled: boolean) => {
    setOrbitControlsEnabled(enabled);
  };

  return (
    <div className="w-full h-full fixed bg-white">
      <Canvas camera={{
        fov: 90,
        position: [2.5, 2, 1.5]
      }}>
        <color attach="background" args={["white"]} />
        <OrbitControls
          enableRotate={orbitControlsEnabled}
          dampingFactor={0.1}
          rotateSpeed={1.0}
        />
        <ambientLight/>
        <directionalLight intensity={5} position={[0, 11, 11]} />
        <directionalLight intensity={1} position={[11, 11, 0]} />
        <directionalLight intensity={1} position={[-11, 11, -11]} />

        <GridLines />
        <AxisLines />

        

        <VectorSphere onToggleOrbitControls={handleToggleOrbitControls} initialPosition={initialSpherePosition} />
      </Canvas>
    </div>
  );
}

export default App;