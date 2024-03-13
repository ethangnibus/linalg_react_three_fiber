import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AxisLines from './components/AxisLines';
import GridLines from './components/GridLines';
import VectorSphere from './components/VectorSphere';
import { Vector3 } from 'three'; // Import Vector3 from three
import { MathJax, MathJaxContext } from "better-react-mathjax";

function App() {
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);
  const [vectorSpherePosition, setVectorSpherePosition] = useState<Vector3>(new Vector3(0, 0, 0));
  const [cameraTarget, setCameraTarget] = useState<Vector3>(new Vector3(0, 0, 0));
  const [infoBlockPosition, setInfoBlockPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [vectorSphereIsHovered, setVectorSphereIsHovered] = useState(false); // New state for hover

  const handleToggleOrbitControls = (enabled: boolean) => {
    setOrbitControlsEnabled(enabled);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setInfoBlockPosition({ x: e.clientX + 50, y: e.clientY + 50 });
  };

  return (
    <MathJaxContext>
      <div className="w-full h-full fixed bg-white" onMouseMove={handleMouseMove}>
        {vectorSphereIsHovered && ( // Conditional rendering of infoBlock
          <div className="z-40 w-32 h-32 absolute justify-center align-middle rounded-lg border-2 border-black bg-white" style={{ left: infoBlockPosition.x, top: infoBlockPosition.y }}>
            {/* <div className="z-30 w-full h-full bg-white opacity-50 rounded-lg absolute"></div> */}
            <p className="text-center select-none">Sphere Position</p>
            <MathJax className="z-20">{`\\begin{bmatrix} ${vectorSpherePosition.x.toFixed(3)} \\\\ ${vectorSpherePosition.y.toFixed(3)} \\\\ ${vectorSpherePosition.z.toFixed(3)} \\end{bmatrix}`}</MathJax>

          </div>
        )}
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
            maxDistance={80}
          />
          <ambientLight/>
          <directionalLight intensity={5} position={[0, 11, 11]} />
          <directionalLight intensity={1} position={[11, 11, 0]} />
          <directionalLight intensity={1} position={[-11, 11, -11]} />

          <GridLines />
          <AxisLines />

          <VectorSphere
            onToggleOrbitControls={handleToggleOrbitControls}
            vectorSpherePosition={vectorSpherePosition}
            setVectorSpherePosition={setVectorSpherePosition}
            vectorSphereIsHovered={vectorSphereIsHovered} 
            setVectorSphereIsHovered={setVectorSphereIsHovered} 
            setCameraTarget={setCameraTarget}
          />
        </Canvas>
      </div>
    </MathJaxContext>
  );
}

export default App;
