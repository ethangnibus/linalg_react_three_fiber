import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import AxisLines from "./components/AxisLines";
import GridLines from "./components/GridLines";
import VectorSphere from "./components/VectorSphere";
import { Vector3 } from "three"; // Import Vector3 from three
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTransition, animated, easings } from "@react-spring/web";

const config = {
  "fast-preview": {
    disabled: true
  },
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  },
  messageStyle: "none"
};

function App() {
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);
  const [vectorSpherePosition, setVectorSpherePosition] = useState<Vector3>(
    new Vector3(0, 0, 0)
  );
  const [cameraTarget, setCameraTarget] = useState<Vector3>(
    new Vector3(0, 0, 0)
  );
  const [infoBlockPosition, setInfoBlockPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });



  // states to show span components
  const [showV1Span, setShowV1Span] = useState(false);
  const [showV2Span, setShowV2Span] = useState(false);
  const [showV3Span, setShowV3Span] = useState(false);
  const [showV1V2Span, setShowV1V2Span] = useState(false);
  const [showV1V3Span, setShowV1V3Span] = useState(false);
  const [showV2V3Span, setShowV2V3Span] = useState(false);
  const [showV1V2V3Span, setShowV1V2V3Span] = useState(false);



  const [showInfoBlock, setShowInfoBlock] = useState(false); // New state for hover
  const [infoBlockText, setInfoBlockText] = useState<String>(`Info Block`);

  const [showEditBlock, setShowEditBlock] = useState(false); // New state for hover
  const [editBlockText, setEditBlockText] = useState<String>(`
  $$\\text{Span } \\{ \\}$$
  `); // New state for hover

  

  const handleToggleOrbitControls = (enabled: boolean) => {
    setOrbitControlsEnabled(enabled);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setInfoBlockPosition({ x: e.clientX + 50, y: e.clientY + 50 });
  };

  const fadeEditBlock = useTransition(showEditBlock, {
    from: { opacity: 0.0 },
    enter: { opacity: 0.95 },
    leave: { opacity: 0.0 },
    config: { duration: 500, easing: easings.easeInOutQuad }, // 1 second duration
  });

  const fadeInfoBlock = useTransition(showInfoBlock, {
    from: { opacity: 0.0 },
    enter: { opacity: 0.95 },
    leave: { opacity: 0.0 },
    config: { duration: 500, easing: easings.easeInOutQuad }, // 1 second duration
  });

  return (
    <MathJaxContext
      version={2}
      config={config}
      onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
    
    >
      <div
        className="w-full h-full fixed bg-white"
        onMouseMove={handleMouseMove}
      >
        {/* Edit Block */}
        {fadeEditBlock((style, item) =>
          item ? (
            <animated.div
              className="z-30 absolute w-auto rounded-md flex flex-col align-start p-2 border-2 border-gray-300 bg-gray-200 left-10 top-10"
              style={{
                ...style,
              }}
            >
              <div className="h-auto w-full left-0 flex justify-end">
                <button
                  className=" h-4 aspect-square rounded-xl bg-red-500 border-2 hover:border-red-300 flex items-center justify-center drop-shadow-sm select-none "
                  onClick={() => setShowEditBlock(false)}
                >
                </button>
              </div>

              <div className="h-12 w-50 mb-2 flex justify-center">
                <div className="h-full w-40 px-5 flex justify-center rounded-sm  bg-white drop-shadow">
                  <MathJax className="text-center self-center px-1" dynamic={true} hideUntilTypeset={"first"}>
                    {editBlockText}
                    {/* Edit Block Text */}
                  </MathJax>

                </div>
                
              </div>

              <div className="h-auto w-full flex flex-row">
                <button
                  className="h-8 w-auto px-2 flex rounded drop-shadow-sm bg-white border-2 border-white hover:border-yellow-300"
                  onClick={() => console.log("hello")}
                >
                  <MathJax className="self-center" dynamic={true} hideUntilTypeset={"first"}>
                    {`$$\\small{\\text{Edit } \\mathbf{v}_1}$$`}
                    {/* help2 */}
                  </MathJax>

                </button>

                <button className="h-8 w-auto px-2 ml-1 mr-1 flex drop-shadow-sm rounded bg-white border-2 border-white hover:border-teal-300">
                  <MathJax className="self-center" dynamic={true} hideUntilTypeset={"first"}>
                    {`$$\\small{\\text{Edit } \\mathbf{v}_2}$$`}
                    {/* help3 */}
                    </MathJax>
                </button>

                <button className="h-8 w-auto px-2 flex drop-shadow rounded bg-white border-2 border-white hover:border-red-400">
                  <MathJax className="self-center" dynamic={true} hideUntilTypeset={"first"}>
                    {`$$\\small{\\text{Edit } \\mathbf{v}_3}$$`}
                    {/* help4 */}
                  </MathJax>
                </button>
              </div>

            </animated.div>
          ) : null
        )}

        {/* Info Block */}
        {fadeInfoBlock((style, item) =>
          item ? (
            <animated.div
              className="z-30 px-2 absolute rounded-lg border-2 bg-white border-black"
              style={{
                ...style,
                left: infoBlockPosition.x, // Fixme: Change to be in the bounds of the window
                top: infoBlockPosition.y,
              }}
            >
              <MathJax className="text-center" dynamic={true} hideUntilTypeset={"first"}>
                {infoBlockText}
                {/* Help5 */}
              </MathJax>
            </animated.div>
          ) : null
        )}

        <Canvas
          className="select-none"
          camera={{
            fov: 90,
            position: [2.5, 2, 1.5],
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
          <AxisLines />

          <VectorSphere
            onToggleOrbitControls={handleToggleOrbitControls}
            vectorSpherePosition={vectorSpherePosition}
            setVectorSpherePosition={setVectorSpherePosition}
            setCameraTarget={setCameraTarget}
            setShowInfoBlock={setShowInfoBlock}
            setInfoBlockText={setInfoBlockText}
            setShowEditBlock={setShowEditBlock}
            setEditBlockText={setEditBlockText}
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
          />
          <Stats />
        </Canvas>
      </div>
    </MathJaxContext>
  );
}

export default App;
