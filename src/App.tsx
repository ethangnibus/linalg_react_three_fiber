import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import AxisLines from "./components/AxisLines";
import GridLines from "./components/GridLines";
import VectorSphere from "./components/VectorSphere";
import { Vector3 } from "three"; // Import Vector3 from three
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTransition, animated, easings } from "@react-spring/web";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"






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

  // states for when vectors are selected
  const [v1IsSelected, setV1IsSelected] = useState(false);
  const [v2IsSelected, setV2IsSelected] = useState(false);
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
  const [v1IsRotating, setV1IsRotating] = useState(false);
  const [v2IsRotating, setV2IsRotating] = useState(false);
  const [v3IsRotating, setV3IsRotating] = useState(false);

  // states for when we are scaling vectors
  const [v1IsScaling, setV1IsScaling] = useState(true);
  const [v2IsScaling, setV2IsScaling] = useState(true);
  const [v3IsScaling, setV3IsScaling] = useState(true);

  // states for showing context menus
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [showV1ContextMenu, setShowV1ContextMenu] = useState(false);
  const [showV2ContextMenu, setShowV2ContextMenu] = useState(false);
  const [showV3ContextMenu, setShowV3ContextMenu] = useState(false);






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

  const fadeV1ContextMenu = useTransition(showV1ContextMenu, {
    from: { opacity: 0.0 },
    enter: { opacity: 0.95 },
    leave: { opacity: 0.0 },
    config: { duration: 500, easing: easings.easeInOutQuad }, // 1 second duration
  });
  const fadeV2ContextMenu = useTransition(showV2ContextMenu, {
    from: { opacity: 0.0 },
    enter: { opacity: 0.95 },
    leave: { opacity: 0.0 },
    config: { duration: 500, easing: easings.easeInOutQuad }, // 1 second duration
  });
  const fadeV3ContextMenu = useTransition(showV3ContextMenu, {
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
              className="z-30 absolute top-10"
              style={{
                ...style,
              }}
            >
              <Card className=" max-w-[380px] mx-10">
                <CardHeader>
                  <X className="h-4 w-4 self-end"
                    onClick={() => setShowEditBlock(false)}
                  />
                  <CardTitle>What does this example visualize?</CardTitle>
                  <CardDescription>
                    We are visualizing the span of a collection of vectors
                    given by the equation below.
                    You can click on base vectors to add/subtract them from
                    the collection. In the viewport, the combined span
                    of every vector in our collection will be visualized in
                    transparent blue.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <p></p> */}
                  {/* <p className="mb-2">Our current collection is:</p> */}
                  <div className="h-12 w-50 mb-2 flex justify-center">
                    <Card className="h-full w-40 px-5 flex justify-center drop-shadow">
                      <MathJax className="text-center self-center px-1" dynamic={true} hideUntilTypeset={"every"}>
                        {editBlockText}
                        {/* Edit Block Text */}
                      </MathJax>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <p className="mb-2 self-start">You can edit our collection below:</p>

                  <Menubar>
                    {/* v1 */}
                    <MenubarMenu>
                      <MenubarTrigger className="h-8">
                        <MathJax className="h-10 self-center" dynamic={true} hideUntilTypeset={"every"}>
                              {`$$\\small{\\text{Edit } \\mathbf{v}_1}$$`}
                        </MathJax>
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem onClick={() => setV1IsSelected(!v1IsSelected)}>
                          {v1IsSelected ? "Remove this vector from our collection" : "Add this vector to our collection"}
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onClick={() => setV1IsRotating(!v1IsRotating)}>
                          {v1IsRotating ? "Remove the rotation sphere" : "Add the rotation sphere"}
                        </MenubarItem>
                        <MenubarItem onClick={() => setV1IsScaling(!v1IsScaling)}>
                          {v1IsScaling ? "Remove the scaling point" : "Add the scaling point"}
                        </MenubarItem>
                        
                      </MenubarContent>
                    </MenubarMenu>

                    {/* v2 */}
                    <MenubarMenu>
                      <MenubarTrigger className="h-8">
                        <MathJax className="h-10 self-center" dynamic={true} hideUntilTypeset={"every"}>
                              {`$$\\small{\\text{Edit } \\mathbf{v}_2}$$`}
                        </MathJax>
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem onClick={() => setV2IsSelected(!v2IsSelected)}>
                          {v2IsSelected ? "Remove this vector from our collection" : "Add this vector to our collection"}
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onClick={() => setV2IsRotating(!v2IsRotating)}>
                          {v2IsRotating ? "Remove the rotation angles" : "Add the rotation angles"}
                        </MenubarItem>
                        <MenubarItem onClick={() => setV2IsScaling(!v2IsScaling)}>
                          {v2IsScaling ? "Remove the scaling point" : "Add the scaling point"}
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>

                    {/* v3 */}
                    <MenubarMenu>
                      <MenubarTrigger className="h-8">
                        <MathJax className="h-10 self-center" dynamic={true} hideUntilTypeset={"every"}>
                              {`$$\\small{\\text{Edit } \\mathbf{v}_3}$$`}
                        </MathJax>
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem onClick={() => setV3IsSelected(!v3IsSelected)}>
                          {v3IsSelected ? "Remove this vector from our collection" : "Add this vector to our collection"}
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onClick={() => setV3IsRotating(!v3IsRotating)}>
                          {v3IsRotating ? "Remove the rotation angles" : "Add the rotation angles"}
                        </MenubarItem>
                        <MenubarItem onClick={() => setV3IsScaling(!v3IsScaling)}>
                          {v3IsScaling ? "Remove the scaling point" : "Add the scaling point"}
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </CardFooter>
              </Card>
            </animated.div>
          ) : null
        )}

        {/* Info Block */}
        {fadeInfoBlock((style, item) =>
          item ? (
            <animated.div
              className="z-30 absolute max-w-[300px]"
              style={{
                ...style,
                left: infoBlockPosition.x, // Fixme: Change to be in the bounds of the window
                top: infoBlockPosition.y,
              }}
            >
              <Card className="p-2">
                  <MathJax className="text-center" dynamic={true} hideUntilTypeset={"every"}>
                    {infoBlockText}
                  </MathJax>
              </Card>
            </animated.div>
          ) : null
        )}

        {/* Context Menu V1 */}
        {fadeV1ContextMenu((style, item) =>
          item ? (
            <animated.div
              className="z-30 absolute max-w-[300px]"
              style={{
                ...style,
                left: contextMenuPosition.x, // Fixme: Change to be in the bounds of the window
                bottom: contextMenuPosition.y,
              }}
            >
              <Card className="p-1">
                  <MathJax className="text-center" dynamic={true} hideUntilTypeset={"every"}>
                    <p>$$v_1$$</p>
                  </MathJax>
                  <Separator/>
                  <Button className="w-full justify-start mt-1 mb-1" variant="ghost" onClick={() => setV1IsSelected(!v1IsSelected)}>
                    {v1IsSelected ? "Remove this vector from our collection" : "Add this vector to our collection"}
                  </Button>
                  <Separator/>
                  <Button className="w-full justify-start mt-1 mb-1" variant="ghost" onClick={() => setV1IsRotating(!v1IsRotating)}>
                    {v1IsRotating ? "Remove the rotation sphere" : "Add the rotation sphere"}
                  </Button>
                  <Button className="w-full justify-start" variant="ghost" onClick={() => setV1IsScaling(!v1IsScaling)}>
                    {v1IsScaling ? "Remove the scaling point" : "Add the scaling point"}
                  </Button>
              </Card>

            </animated.div>
          ) : null
        )}
        {/* Context Menu V2 */}
        {fadeV2ContextMenu((style, item) =>
          item ? (
            <animated.div
              className="z-30 absolute max-w-[300px]"
              style={{
                ...style,
                left: contextMenuPosition.x, // Fixme: Change to be in the bounds of the window
                bottom: contextMenuPosition.y,
              }}
            >
              <Card className="p-1">
                  <MathJax className="text-center" dynamic={true} hideUntilTypeset={"every"}>
                    <p>$$v_2$$</p>
                  </MathJax>
                  <Separator/>
                  <Button className="w-full justify-start mt-1 mb-1" variant="ghost" onClick={() => setV2IsSelected(!v2IsSelected)}>
                    {v2IsSelected ? "Remove this vector from our collection" : "Add this vector to our collection"}
                  </Button>
                  <Separator/>
                  <Button className="w-full justify-start mt-1 mb-1" variant="ghost" onClick={() => setV2IsRotating(!v2IsRotating)}>
                    {v2IsRotating ? "Remove the rotation sphere" : "Add the rotation sphere"}
                  </Button>
                  <Button className="w-full justify-start" variant="ghost" onClick={() => setV2IsScaling(!v2IsScaling)}>
                    {v2IsScaling ? "Remove the scaling point" : "Add the scaling point"}
                  </Button>
              </Card>

            </animated.div>
          ) : null
        )}
        {/* Context Menu V3 */}
        {fadeV3ContextMenu((style, item) =>
          item ? (
            <animated.div
              className="z-30 absolute max-w-[300px]"
              style={{
                ...style,
                left: contextMenuPosition.x, // Fixme: Change to be in the bounds of the window
                bottom: contextMenuPosition.y,
              }}
            >
              <Card className="p-1">
                  <MathJax className="text-center" dynamic={true} hideUntilTypeset={"every"}>
                    <p>$$v_3$$</p>
                  </MathJax>
                  <Separator/>
                  <Button className="w-full justify-start mt-1 mb-1" variant="ghost" onClick={() => setV3IsSelected(!v3IsSelected)}>
                    {v3IsSelected ? "Remove this vector from our collection" : "Add this vector to our collection"}
                  </Button>
                  <Separator/>
                  <Button className="w-full justify-start mt-1 mb-1" variant="ghost" onClick={() => setV3IsRotating(!v3IsRotating)}>
                    {v3IsRotating ? "Remove the rotation sphere" : "Add the rotation sphere"}
                  </Button>
                  <Button className="w-full justify-start" variant="ghost" onClick={() => setV3IsScaling(!v3IsScaling)}>
                    {v3IsScaling ? "Remove the scaling point" : "Add the scaling point"}
                  </Button>
              </Card>

            </animated.div>
          ) : null
        )}

        <Canvas
          className="select-none"
          camera={{
            fov: 90,
            position: [2.5, 2, 1.5],
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
          />
          <Stats />
        </Canvas>
      </div>
    </MathJaxContext>
  );
}

export default App;
