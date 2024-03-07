import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AxisLines from './components/AxisLines';
import GridLines from './components/GridLines';
import VectorSphere from './components/VectorSphere';
import { Vector3 } from 'three'; // Import Vector3 from three

function App() {
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);
  const [vectorSpherePosition, setVectorSpherePosition] = useState<Vector3>(new Vector3(0, 0, 0));
  const handleToggleOrbitControls = (enabled: boolean) => {
    setOrbitControlsEnabled(enabled);
  };
  const [cameraTarget, setCameraTarget] = useState<Vector3>(new Vector3(0, 0, 0));


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
          rotateSpeed={0.5}
          target={cameraTarget}
        />
        <ambientLight/>
        <directionalLight intensity={5} position={[0, 11, 11]} />
        <directionalLight intensity={1} position={[11, 11, 0]} />
        <directionalLight intensity={1} position={[-11, 11, -11]} />

        <GridLines />
        <AxisLines />

        
        <VectorSphere onToggleOrbitControls={handleToggleOrbitControls} vectorSpherePosition={vectorSpherePosition} setVectorSpherePosition={setVectorSpherePosition} setCameraTarget={setCameraTarget}/>
       
        
      </Canvas>
    </div>
  );
}

export default App;