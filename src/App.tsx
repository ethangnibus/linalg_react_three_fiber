// import React from 'react';
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
        <OrbitControls
          enablePan={false}
        />
        <pointLight position={[10, 10, 10]} />

        <AxisLines />
        <GridLines />

        {/* <mesh
          onClick={(e) => console.log('click' + e)}
          onContextMenu={(e) => console.log('context menu' + e)}
          onDoubleClick={(e) => console.log('double click' + e)}
          onWheel={(e) => console.log('wheel spins' + e)}
          onPointerUp={(e) => console.log('up' + e)}
          onPointerDown={(e) => console.log('down' + e)}
          onPointerOver={(e) => console.log('over' + e)}
          onPointerOut={(e) => console.log('out' + e)}
          onPointerEnter={(e) => console.log('enter' + e)}
          onPointerLeave={(e) => console.log('leave' + e)}
          onPointerMove={(e) => console.log('move' + e)}
          onPointerMissed={() => console.log('missed')}
          onUpdate={(self) => console.log('props have been updated' + self)}
        >
          <sphereGeometry />
          <meshStandardMaterial color="RED" />
        </mesh> */}
      </Canvas>
    </div>
  );
}

export default App;