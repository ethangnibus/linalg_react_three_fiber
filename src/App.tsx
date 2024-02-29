// import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AxisLines from './components/AxisLines';
import GridLines from './components/GridLines';
import VectorSphere from './components/VectorSphere';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);


  return (
    <div className="w-full h-full fixed bg-white">
      <Canvas>
        <color attach="background" args={["white"]} />
        <OrbitControls
          enabled={orbitControlsEnabled}
          // enablePan={enablePanRotate}
          // enableRotate={enablePanRotate}
        />

        <ambientLight/>
        <directionalLight intensity={5} position={[0, 11, 11]} />
        <directionalLight intensity={1} position={[11, 11, 0]} />
        <directionalLight intensity={1} position={[-11, 11, -11]} />

        <AxisLines />
        <GridLines />

        <VectorSphere
        />
      </Canvas>
    </div>
  );
}

export default App;