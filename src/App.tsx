import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AxisLines from './components/AxisLines';
import GridLines from './components/GridLines';
import './App.css';

function App() {
  return (
    <div className="w-full h-full fixed bg-white">
      <Canvas>
        <color attach="background" args={["white"]} />
        <OrbitControls />
        <pointLight position={[10, 10, 10]} />

        <AxisLines />
        <GridLines />

        <mesh
          onClick={(e) => console.log('click')}
          onContextMenu={(e) => console.log('context menu')}
          onDoubleClick={(e) => console.log('double click')}
          onWheel={(e) => console.log('wheel spins')}
          onPointerUp={(e) => console.log('up')}
          onPointerDown={(e) => console.log('down')}
          onPointerOver={(e) => console.log('over')}
          onPointerOut={(e) => console.log('out')}
          onPointerEnter={(e) => console.log('enter')}
          onPointerLeave={(e) => console.log('leave')}
          onPointerMove={(e) => console.log('move')}
          onPointerMissed={() => console.log('missed')}
          onUpdate={(self) => console.log('props have been updated')}
        >
          <sphereGeometry />
          <meshStandardMaterial color="RED" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;