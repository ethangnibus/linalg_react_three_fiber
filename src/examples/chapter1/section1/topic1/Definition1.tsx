import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { H3 } from "@/components/ui/typography";

import {
  OrbitControls,
  // Stats
} from "@react-three/drei";
import AxisLines2D from "@/components/AxisLines2D";
import GridLines from "@/components/GridLines";
import VectorSphere from "@/components/VectorSphere";
import * as THREE from 'three';
import { MathJax } from "better-react-mathjax";
import { useTransition, animated, easings } from "@react-spring/web";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { P } from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

// Before optimizing for mobile

function Definition1() {
  const [v1, setV1] = useState<THREE.Vector3>(new THREE.Vector3(0.5, 0.0, -1.0));
  const [v2, setV2] = useState<THREE.Vector3>(new THREE.Vector3(0.1, 1.0, 0.2));
  const [v3, setV3] = useState<THREE.Vector3>(new THREE.Vector3(0.1, -0.1, 1.0));
  const [vectorSphereIsSelected, setVectorSphereIsSelected] = useState(true);


  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);
  const [vectorSpherePosition, setVectorSpherePosition] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0)
  );
  const [cameraTarget, setCameraTarget] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0)
  );
  const [infoBlockPosition, setInfoBlockPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  // states for when vectors are selected
  const [v1IsSelected, setV1IsSelected] = useState(true);
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
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showV1ContextMenu, setShowV1ContextMenu] = useState(false);
  const [showV2ContextMenu, setShowV2ContextMenu] = useState(false);
  const [showV3ContextMenu, setShowV3ContextMenu] = useState(false);

  const [showInfoBlock, setShowInfoBlock] = useState(false); // New state for hover
  const [infoBlockText, setInfoBlockText] = useState<String>(`Info Block`);

  const [showEditPanel, setShowEditPanel] = useState(true);
  const [_editBlockText, setEditBlockText] = useState<String>(`
  $$\\text{Span } \\{ \\}$$
  `); // New state for hover

  const handleToggleOrbitControls = (enabled: boolean) => {
    setOrbitControlsEnabled(enabled);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setInfoBlockPosition({ x: e.clientX + 50, y: e.clientY + 50 });
  };

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

  // State to determine if examples are rendered side to side or vertical
  const [resizablePanelIsVertical, setResizablePanelIsVertical] = useState(
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
    <div className="">
    <div className="w-full flex justify-end">
      <div className="absolute flex mr-10">
        <div className="bg-gradient-to-r from-amber-500 to-amber-300 px-4 py-2 rounded-full flex">
          <H3 className="text-primary inline-block align-middle">Definition</H3>
        </div>
      </div>
    </div>

    <div className="pt-6">
    <Accordion type="single" collapsible className="px-2 border-2 bg-amber-100 dark:bg-secondary dark:text-primary border-secondary">
      <AccordionItem value="item-1">
        <AccordionTrigger className="">
          <H3 className="mx-8">Span of Vectors</H3>
        </AccordionTrigger>
        <AccordionContent className="">
          <div
            className="w-full aspect-[8/10] md:aspect-[5/2]"
            onMouseMove={handleMouseMove}
          >
            <Button
              variant="outline"
              size="icon"
              className=" ml-8 mt-2 mb-2 absolute z-10 border-2 bg-white text-black border-black"
              onClick={() => setShowEditPanel(!showEditPanel)}
            >
              {resizablePanelIsVertical ? (
                showEditPanel ? (
                  <ChevronRightIcon className="h-4 w-4" />
                ) : (
                  <ChevronLeftIcon className="h-4 w-4" />
                )
              ) : showEditPanel ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </Button>

            <ResizablePanelGroup
              className="z-0"
              direction={resizablePanelIsVertical ? "horizontal" : "vertical"}
              autoSaveId="persistence"
            >
              {showEditPanel && (
                <>
                  <ResizablePanel
                    collapsible={true}
                    id="left"
                    order={1}
                    collapsedSize={30}
                    minSize={30}
                  >
                    <ScrollArea className="h-full w-full px-4">
                      <div className="h-10"></div>

                      <MathJax dynamic={true} hideUntilTypeset={"every"} className="mt-4 ml-4 mr-4"> {`
                      Given a collection of vectors $ \\textbf{v}_1, ..., \\textbf{v}_k \\in \\mathbb{R}^n$,
                      their $\\textbf{span}$
                      
                      $$
                        \\text{Span } \\{ \\textbf{v}_1, ..., \\textbf{v}_k \\} \\subset \\mathbb{R}^n
                      $$
                      is the set of all their linear combinations. In other words,
                      $\\text{Span } \\{ \\textbf{v}_1, ..., \\textbf{v}_k \\}$
                      consists of all
                      $\\textbf{v} \\in \\mathbb{R}^n$ that can be expressed in the form

                      $$
                        \\textbf{v} = a_1 \\textbf{v}_1 \\text{ } + \\text{ } ... \\text{ } + \\text{ }  a_k \\textbf{v}_k
                      $$
                      for some weights $a_1, a_2, ..., a_k \\in \\mathbb{R}$.
                      Geometrically, the span of a collection of vectors is the set
                      of all vectors that can be reached by $traveling$
                      along scales of each of the individual vectors in turn.
                      `}</MathJax>
                      <Card className="mt-4 mb-4">
                        <CardContent className="">
                              <MathJax
                                className="pt-6 "
                                dynamic={true}
                                hideUntilTypeset={"every"}
                              >{`
                                The span of a single non-zero vector 
                                $\\textbf{v}_1$ is the line though the
                                origin containing $\\textbf{v}_1$.`}
                              </MathJax>
                        </CardContent>
                      </Card>
                    </ScrollArea>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                </>
              )}

              <ResizablePanel
                collapsible={true}
                id="right"
                order={2}
                collapsedSize={15}
                minSize={15}
              >
                <div className="w-full h-full border-t-2 border-b-2 border-r-2 bg-white">
                  <Canvas
                    resize={{ debounce: 0 }}
                    className="select-none"
                    camera={{
                      fov: 90,
                      position: [0, 2.5, 0],
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
                    <AxisLines2D />

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
                      v1IsRotating={false}
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
                      v2IsShown={false}
                      v3IsShown={false}
                    />
                    {/* <Stats/> */}
                  </Canvas>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>

            {/* =================== Context Menu Start ================== */}
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
                    <MathJax
                      className="text-center"
                      dynamic={true}
                      hideUntilTypeset={"every"}
                    >
                      <P>$$v_1$$</P>
                    </MathJax>
                    <Separator />
                    <Button
                      className="w-full justify-start mt-1 mb-1"
                      variant="ghost"
                      onClick={() => setV1IsSelected(!v1IsSelected)}
                    >
                      {v1IsSelected
                        ? "Remove this vector from our collection"
                        : "Add this vector to our collection"}
                    </Button>
                    <Separator />
                    <Button
                      className="w-full justify-start mt-1 mb-1"
                      variant="ghost"
                      onClick={() => setV1IsRotating(!v1IsRotating)}
                    >
                      {v1IsRotating
                        ? "Remove the rotation sphere"
                        : "Add the rotation sphere"}
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="ghost"
                      onClick={() => setV1IsScaling(!v1IsScaling)}
                    >
                      {v1IsScaling
                        ? "Remove the scaling point"
                        : "Add the scaling point"}
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
                    <MathJax
                      className="text-center"
                      dynamic={true}
                      hideUntilTypeset={"every"}
                    >
                      <P>$$v_2$$</P>
                    </MathJax>
                    <Separator />
                    <Button
                      className="w-full justify-start mt-1 mb-1"
                      variant="ghost"
                      onClick={() => setV2IsSelected(!v2IsSelected)}
                    >
                      {v2IsSelected
                        ? "Remove this vector from our collection"
                        : "Add this vector to our collection"}
                    </Button>
                    <Separator />
                    <Button
                      className="w-full justify-start mt-1 mb-1"
                      variant="ghost"
                      onClick={() => setV2IsRotating(!v2IsRotating)}
                    >
                      {v2IsRotating
                        ? "Remove the rotation sphere"
                        : "Add the rotation sphere"}
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="ghost"
                      onClick={() => setV2IsScaling(!v2IsScaling)}
                    >
                      {v2IsScaling
                        ? "Remove the scaling point"
                        : "Add the scaling point"}
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
                    <MathJax
                      className="text-center"
                      dynamic={true}
                      hideUntilTypeset={"every"}
                    >
                      <P>$$v_3$$</P>
                    </MathJax>
                    <Separator />
                    <Button
                      className="w-full justify-start mt-1 mb-1"
                      variant="ghost"
                      onClick={() => setV3IsSelected(!v3IsSelected)}
                    >
                      {v3IsSelected
                        ? "Remove this vector from our collection"
                        : "Add this vector to our collection"}
                    </Button>
                    <Separator />
                    <Button
                      className="w-full justify-start mt-1 mb-1"
                      variant="ghost"
                      onClick={() => setV3IsRotating(!v3IsRotating)}
                    >
                      {v3IsRotating
                        ? "Remove the rotation sphere"
                        : "Add the rotation sphere"}
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="ghost"
                      onClick={() => setV3IsScaling(!v3IsScaling)}
                    >
                      {v3IsScaling
                        ? "Remove the scaling point"
                        : "Add the scaling point"}
                    </Button>
                  </Card>
                </animated.div>
              ) : null
            )}
            {/* =================== Context Menu End ================== */}

            {/* =================== Info Block Start ================== */}
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
                    <MathJax
                      className="text-center"
                      dynamic={true}
                      hideUntilTypeset={"every"}
                    >
                      {infoBlockText}
                    </MathJax>
                  </Card>
                </animated.div>
              ) : null
            )}
            {/* =================== Info Block End ================== */}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
    </div>
  );
}

export default Definition1;
