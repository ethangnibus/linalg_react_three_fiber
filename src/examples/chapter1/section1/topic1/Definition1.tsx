import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  // Stats
} from "@react-three/drei";
import AxisLines from "@/components/AxisLines";
import GridLines from "@/components/GridLines";
import VectorSphere from "@/components/VectorSphere";
import { Vector3 } from "three"; // Import Vector3 from three
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
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
  const [editBlockText, setEditBlockText] = useState<String>(`
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
    <Accordion type="single" collapsible className="px-2 border-2 bg-secondary">
      <AccordionItem value="item-1">
        <AccordionTrigger className="">
          Definiton: Span of Vectors
        </AccordionTrigger>
        <AccordionContent className="">
          <div
            className="w-full aspect-[8/10] md:aspect-[5/2]"
            onMouseMove={handleMouseMove}
          >
            <Button
              variant="outline"
              size="icon"
              className=" m-2 mb-2 absolute z-10 border-2 bg-white hover:bg-yellow-400 dark:hover:bg-yellow-500 text-black border-black"
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

                      <P>
                        This experiment aims to explore and visualize the
                        concept of the span of vectors in three-dimensional
                        space. The span of vectors represents all possible
                        linear combinations of those vectors, effectively
                        forming a subspace in the three-dimensional coordinate
                        system. Through interactive graphics and animations,
                        this experiment will illustrate how the span of three
                        given vectors is represented geometrically. By
                        manipulating the vectors and observing their
                        combinations, participants will gain insights into the
                        fundamental concepts of linear algebra, such as linear
                        independence, basis, and subspaces. This visual
                        exploration promises to provide an intuitive
                        understanding of abstract mathematical concepts and
                        their real-world applications, offering a dynamic
                        learning experience for students and enthusiasts alike.
                      </P>
                      <Card className="mt-4 mb-4">
                        <CardHeader>
                          <CardTitle>
                            What does this example visualize?
                          </CardTitle>
                          <CardDescription>
                            We are visualizing the span of a collection of
                            vectors given by the equation below. You can click
                            on base vectors to add/subtract them from the
                            collection. In the viewport, the combined span of
                            every vector in our collection will be visualized in
                            transparent blue.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-12 w-50 mb-2 flex justify-center">
                            <Card className="h-full w-40 px-5 flex justify-center drop-shadow">
                              <MathJax
                                className="text-center self-center px-1"
                                dynamic={true}
                                hideUntilTypeset={"every"}
                              >
                                {editBlockText}
                                {/* Edit Block Text */}
                              </MathJax>
                            </Card>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                          <P className="mb-2 self-start">
                            You can edit our collection below:
                          </P>

                          <Menubar>
                            {/* v1 */}
                            <MenubarMenu>
                              <MenubarTrigger className="h-8">
                                <MathJax
                                  className="h-10 self-center"
                                  dynamic={true}
                                  hideUntilTypeset={"every"}
                                >
                                  {`$$\\small{\\text{Edit } \\mathbf{v}_1}$$`}
                                </MathJax>
                              </MenubarTrigger>
                              <MenubarContent>
                                <MenubarItem
                                  onClick={() => setV1IsSelected(!v1IsSelected)}
                                >
                                  {v1IsSelected
                                    ? "Remove this vector from our collection"
                                    : "Add this vector to our collection"}
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem
                                  onClick={() => setV1IsRotating(!v1IsRotating)}
                                >
                                  {v1IsRotating
                                    ? "Remove the rotation sphere"
                                    : "Add the rotation sphere"}
                                </MenubarItem>
                                <MenubarItem
                                  onClick={() => setV1IsScaling(!v1IsScaling)}
                                >
                                  {v1IsScaling
                                    ? "Remove the scaling point"
                                    : "Add the scaling point"}
                                </MenubarItem>
                              </MenubarContent>
                            </MenubarMenu>

                            {/* v2 */}
                            <MenubarMenu>
                              <MenubarTrigger className="h-8">
                                <MathJax
                                  className="h-10 self-center"
                                  dynamic={true}
                                  hideUntilTypeset={"every"}
                                >
                                  {`$$\\small{\\text{Edit } \\mathbf{v}_2}$$`}
                                </MathJax>
                              </MenubarTrigger>
                              <MenubarContent>
                                <MenubarItem
                                  onClick={() => setV2IsSelected(!v2IsSelected)}
                                >
                                  {v2IsSelected
                                    ? "Remove this vector from our collection"
                                    : "Add this vector to our collection"}
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem
                                  onClick={() => setV2IsRotating(!v2IsRotating)}
                                >
                                  {v2IsRotating
                                    ? "Remove the rotation angles"
                                    : "Add the rotation angles"}
                                </MenubarItem>
                                <MenubarItem
                                  onClick={() => setV2IsScaling(!v2IsScaling)}
                                >
                                  {v2IsScaling
                                    ? "Remove the scaling point"
                                    : "Add the scaling point"}
                                </MenubarItem>
                              </MenubarContent>
                            </MenubarMenu>

                            {/* v3 */}
                            <MenubarMenu>
                              <MenubarTrigger className="h-8">
                                <MathJax
                                  className="h-10 self-center"
                                  dynamic={true}
                                  hideUntilTypeset={"every"}
                                >
                                  {`$$\\small{\\text{Edit } \\mathbf{v}_3}$$`}
                                </MathJax>
                              </MenubarTrigger>
                              <MenubarContent>
                                <MenubarItem
                                  onClick={() => setV3IsSelected(!v3IsSelected)}
                                >
                                  {v3IsSelected
                                    ? "Remove this vector from our collection"
                                    : "Add this vector to our collection"}
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem
                                  onClick={() => setV3IsRotating(!v3IsRotating)}
                                >
                                  {v3IsRotating
                                    ? "Remove the rotation angles"
                                    : "Add the rotation angles"}
                                </MenubarItem>
                                <MenubarItem
                                  onClick={() => setV3IsScaling(!v3IsScaling)}
                                >
                                  {v3IsScaling
                                    ? "Remove the scaling point"
                                    : "Add the scaling point"}
                                </MenubarItem>
                              </MenubarContent>
                            </MenubarMenu>
                          </Menubar>
                        </CardFooter>
                      </Card>
                      <P>
                        This experiment aims to explore and visualize the
                        concept of the span of vectors in three-dimensional
                        space. The span of vectors represents all possible
                        linear combinations of those vectors, effectively
                        forming a subspace in the three-dimensional coordinate
                        system. Through interactive graphics and animations,
                        this experiment will illustrate how the span of three
                        given vectors is represented geometrically. By
                        manipulating the vectors and observing their
                        combinations, participants will gain insights into the
                        fundamental concepts of linear algebra, such as linear
                        independence, basis, and subspaces. This visual
                        exploration promises to provide an intuitive
                        understanding of abstract mathematical concepts and
                        their real-world applications, offering a dynamic
                        learning experience for students and enthusiasts alike.
                      </P>
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
                <div className="w-full h-full">
                  <Canvas
                    resize={{ debounce: 0 }}
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
  );
}

export default Definition1;
