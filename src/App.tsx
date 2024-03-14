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
  const [showInfoBlock, setShowInfoBlock] = useState(false); // New state for hover

  const [infoBlockText, setInfoBlockText] = useState<String>(`Hello`);

  const handleToggleOrbitControls = (enabled: boolean) => {
    setOrbitControlsEnabled(enabled);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setInfoBlockPosition({ x: e.clientX + 50, y: e.clientY + 50 });
  };

  return (
    <MathJaxContext>
      <div className="w-full h-full fixed bg-white" onMouseMove={handleMouseMove}>
        {showInfoBlock && ( // Conditional rendering of infoBlock
        <>
          
          {/* <div className="z-20 absolute bg-white rounded-lg opacity-95" style={{ left: infoBlockPosition.x, top: infoBlockPosition.y }}></div> */}
          <div className="z-30 px-2 absolute rounded-lg border-2 bg-white border-black drop-shadow-xl" style={{ left: infoBlockPosition.x, top: infoBlockPosition.y }}>
            <MathJax className="z-20 text-center">{infoBlockText}</MathJax>
          </div>
        </>)}

        <Canvas className="select-none" camera={{
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
            setCameraTarget={setCameraTarget}
            setShowInfoBlock={setShowInfoBlock}
            setInfoBlockText={setInfoBlockText}
          />
        </Canvas>
      </div>
    </MathJaxContext>
  );
}

export default App;
