import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  // Stats
} from "@react-three/drei";
import AxisLines3D from "@/components/AxisLines3D";
import GridLines from "@/components/GridLines";
import VectorSphere from "@/components/VectorSphere";
import * as THREE from 'three';

// Before optimizing for mobile

function Example20_2() {
  const [v1, setV1] = useState<THREE.Vector3>(new THREE.Vector3(-3.0, 2.0, -1.0));
  const [v2, setV2] = useState<THREE.Vector3>(new THREE.Vector3(-2.0, 1.0, 3.0));
  const [v3, setV3] = useState<THREE.Vector3>(new THREE.Vector3(2.0, 2.0, -3.0));
  const [vectorSphereIsSelected, setVectorSphereIsSelected] = useState(true);


  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);
  const [vectorSpherePosition, setVectorSpherePosition] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0)
  );
  const [cameraTarget, setCameraTarget] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0)
  );

  // states for when vectors are selected
  const [v1IsSelected, setV1IsSelected] = useState(true);
  const [v2IsSelected, setV2IsSelected] = useState(true);
  const [v3IsSelected, setV3IsSelected] = useState(false);

  // states to show span components
  const [showV1Span, setShowV1Span] = useState(false);
  const [showV2Span, setShowV2Span] = useState(false);
  const [showV3Span, setShowV3Span] = useState(false);
  const [showV1V2Span, setShowV1V2Span] = useState(false);
  const [showV1V3Span, setShowV1V3Span] = useState(false);
  const [showV2V3Span, setShowV2V3Span] = useState(false);
  const [showV1V2V3Span, setShowV1V2V3Span] = useState(false);

  // states for when we are rotating vectors
  const [v1IsRotating, _setV1IsRotating] = useState(false);
  const [v2IsRotating, _setV2IsRotating] = useState(false);
  const [v3IsRotating, _setV3IsRotating] = useState(false);

  // states for when we are scaling vectors
  const [v1IsScaling, _setV1IsScaling] = useState(true);
  const [v2IsScaling, _setV2IsScaling] = useState(true);
  const [v3IsScaling, _setV3IsScaling] = useState(true);

  // states for showing context menus
  const [_contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [_showV1ContextMenu, setShowV1ContextMenu] = useState(false);
  const [_showV2ContextMenu, setShowV2ContextMenu] = useState(false);
  const [_showV3ContextMenu, setShowV3ContextMenu] = useState(false);

  const [_showInfoBlock, setShowInfoBlock] = useState(false); // New state for hover
  const [_infoBlockText, setInfoBlockText] = useState<String>(`Info Block`);

  const [_showEditPanel, _setShowEditPanel] = useState(true);
  const [_editBlockText, setEditBlockText] = useState<String>(`
  $$\\text{Span } \\{ \\}$$
  `); // New state for hover

  const handleToggleOrbitControls = (enabled: boolean) => {
    setOrbitControlsEnabled(enabled);
  };



  // State to determine if examples are rendered side to side or vertical
  const [_resizablePanelIsVertical, setResizablePanelIsVertical] = useState(
    true
  );
  useEffect(() => {
    const handleResize = () => {
      setResizablePanelIsVertical(window.innerWidth >= 768);
    };

    // Initial call to set direction
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full border-t-2 border-b-2 border-r-2 bg-white">
      <Canvas
        resize={{ debounce: 0 }}
        className="select-none"
        camera={{
          fov: 90,
          position: [3, 2.5, 2.5],
        }}
        onPointerDown={() => {
          setShowV1ContextMenu(false);
          setShowV2ContextMenu(false);
          setShowV3ContextMenu(false);
        }}
      >
        <color attach="background" args={["white"]} />
        <OrbitControls
          enableRotate={orbitControlsEnabled}
          dampingFactor={0.1}
          rotateSpeed={0.5}
          target={cameraTarget}
          maxDistance={80}
        />
        <ambientLight />
        <directionalLight intensity={5} position={[0, 11, 11]} />
        <directionalLight intensity={1} position={[11, 11, 0]} />
        <directionalLight intensity={1} position={[-11, 11, -11]} />

        <GridLines />
        <AxisLines3D />

        <VectorSphere
          v1={v1}
          v2={v2}
          v3={v3}
          setV1={setV1}
          setV2={setV2}
          setV3={setV3}
          vectorSphereIsSelected={vectorSphereIsSelected}
          setVectorSphereIsSelected={setVectorSphereIsSelected}
          onToggleOrbitControls={handleToggleOrbitControls}
          vectorSpherePosition={vectorSpherePosition}
          setVectorSpherePosition={setVectorSpherePosition}
          setCameraTarget={setCameraTarget}
          setShowInfoBlock={setShowInfoBlock}
          setInfoBlockText={setInfoBlockText}
          setEditBlockText={setEditBlockText}
          v1IsSelected={v1IsSelected}
          setV1IsSelected={setV1IsSelected}
          v2IsSelected={v2IsSelected}
          setV2IsSelected={setV2IsSelected}
          v3IsSelected={v3IsSelected}
          setV3IsSelected={setV3IsSelected}
          showV1Span={showV1Span}
          setShowV1Span={setShowV1Span}
          showV2Span={showV2Span}
          setShowV2Span={setShowV2Span}
          showV3Span={showV3Span}
          setShowV3Span={setShowV3Span}
          showV1V2Span={showV1V2Span}
          setShowV1V2Span={setShowV1V2Span}
          showV1V3Span={showV1V3Span}
          setShowV1V3Span={setShowV1V3Span}
          showV2V3Span={showV2V3Span}
          setShowV2V3Span={setShowV2V3Span}
          showV1V2V3Span={showV1V2V3Span}
          setShowV1V2V3Span={setShowV1V2V3Span}
          v1IsRotating={v1IsRotating}
          v2IsRotating={v2IsRotating}
          v3IsRotating={v3IsRotating}
          v1IsScaling={v1IsScaling}
          v2IsScaling={v2IsScaling}
          v3IsScaling={v3IsScaling}
          setContextMenuPosition={setContextMenuPosition}
          setShowV1ContextMenu={setShowV1ContextMenu}
          setShowV2ContextMenu={setShowV2ContextMenu}
          setShowV3ContextMenu={setShowV3ContextMenu}
          v1IsShown={true}
          v2IsShown={true}
          v3IsShown={true}
        />
        {/* <Stats/> */}
      </Canvas>
    </div>
  );
}

export default Example20_2;
