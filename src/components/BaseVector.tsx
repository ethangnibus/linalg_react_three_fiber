import React, { useState, useEffect } from 'react';
import { DragControls, Line } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

interface BaseVectorsProps {
    vector: THREE.Vector3; // Direction of the arrow
    setVector: (newVector: THREE.Vector3) => void;
    vectorNumber: number;
    color: THREE.Color;
    line_color: THREE.Color;
    onToggleOrbitControls: (enabled: boolean) => void;
    spherePosition: THREE.Vector3; // Change to Vector3 type
    updateSpherePosition: (newPosition: THREE.Vector3) => void; // Add prop for updating sphere position
    vectorSphereIsSelected: boolean;
    baseVectorIsSelected: boolean;
    setBaseVectorIsSelected: (enabled: boolean) => void;
    setShowInfoBlock: (enabled: boolean) => void;
    setInfoBlockText: (newString: String) => void;
    numScaledVectors: number;
    setNumScaledVectors: (number: number) => void;
    setShowEditBlock: (enabled: boolean) => void;
    isRotating: boolean;
    isScaling: boolean;
}

const BaseVector: React.FC<BaseVectorsProps> = ({
    vector,
    setVector,
    vectorNumber,
    color,
    line_color,
    onToggleOrbitControls,
    spherePosition,
    updateSpherePosition,
    vectorSphereIsSelected,
    baseVectorIsSelected,
    setBaseVectorIsSelected,
    setShowInfoBlock,
    setInfoBlockText,
    numScaledVectors,
    setNumScaledVectors,
    setShowEditBlock,
    isRotating,
    isScaling,
}) => {
    const direction = vector.clone().normalize();

    // base vector interactions
    const [baseVectorIsHovered, setBaseVectorIsHovered] = useState(false);
    const [baseVectorIsDragging, setBaseVectorIsDragging] = useState(false);
    const [baseVectorDragStartPosition, setBaseVectorDragStartPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [_dragEndPoint, setDragEndPoint] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [currentLine, setCurrentLine] = useState<JSX.Element | null>(null);
    const [lines, setLines] = useState<JSX.Element[]>([]);

    // scale ball interactions
    const [scalePointIsHovered, setScalePointIsHovered] = useState(false);
    const [scalePointIsDragging, setScalePointIsDragging] = useState(false);
    const [scalePointDragStartPosition, setScalePointDragStartPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [vectorBeforeScalePointDrag, setVectorBeforeScalePointDrag] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [bufferOrbitControlToggle, setBufferOrbitControlToggle] = useState(false);

    // Rotation Brackets: [X, Y] interactions
    const [rotationBracketYIsHovered, setRotationBracketYIsHovered] = useState(false);
    const [rotationBracketYIsDragging, setRotationBracketYIsDragging] = useState(false);
    const [rotationBracketYSpherePosition, setRotationBracketYSpherePosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

     
    

    const handlePointerUp = () => {
        if (baseVectorIsDragging) {
            setBaseVectorIsDragging(false);
            onToggleOrbitControls(true);
            if (currentLine) {
                setLines([...lines, currentLine]); // Save the current line to the lines array
                setNumScaledVectors(numScaledVectors + 1);
            }
            setCurrentLine(null); // Reset the current line
        } else if (scalePointIsDragging) {
            setScalePointIsDragging(false);
            onToggleOrbitControls(true);
        } else if (rotationBracketYIsDragging) {
            setRotationBracketYIsDragging(false);
            onToggleOrbitControls(true);
        } else if (bufferOrbitControlToggle) {
            onToggleOrbitControls(true);
            setBufferOrbitControlToggle(false);
        }
    };

    useEffect(() => {
        document.addEventListener('pointerup', handlePointerUp);

        return () => {
            document.removeEventListener('pointerup', handlePointerUp);
        };
    }, [baseVectorIsDragging, onToggleOrbitControls]);


    
    const handleBaseVectorDragStart = () => {
        setBaseVectorDragStartPosition(spherePosition.clone());
        setBaseVectorIsDragging(true);
    };

    const handleBaseVectorDrag = (localMatrix: THREE.Matrix4) => {
        if (!baseVectorIsDragging) return; // Do nothing if not dragging
        const dragDelta = new THREE.Vector3().setFromMatrixPosition(localMatrix);
        const newPosition = dragDelta.projectOnVector(direction).add(baseVectorDragStartPosition);
        updateSpherePosition(newPosition);
        setDragEndPoint(newPosition);
        // Update the endpoint of the current line
        const updatedLine = (
            <Line
                key={Math.random()}
                points={[baseVectorDragStartPosition, newPosition]}
                color={line_color}
                dashed={true}
                lineWidth={5}
                // opacity={0.4}
                // transparent={true}
                dashOffset={0.5}
                dashScale={20}
                onPointerOver={() => {
                    console.log(numScaledVectors + " Line number")
                    setInfoBlockText(`$$a_${numScaledVectors} v_${vectorNumber}$$`)
                    setShowInfoBlock(true)
                }}
                onPointerLeave={() => {
                    setShowInfoBlock(false)
                }}
            />
        );
        setCurrentLine(updatedLine);
    };



    const handleScalePointDragStart = () => {
        setScalePointDragStartPosition(spherePosition.clone().add(vector));
        setVectorBeforeScalePointDrag(vector.clone().normalize());
        setScalePointIsDragging(true);
    };

    const handleScalePointDrag = (localMatrix: THREE.Matrix4) => {
        if (!scalePointIsDragging) return; // Do nothing if not dragging
        let dragDelta = new THREE.Vector3().setFromMatrixPosition(localMatrix);
        const newPosition = dragDelta.clone().projectOnVector(direction)
            .add(scalePointDragStartPosition);
        
        // update arrow vector to be scale ball - sphere position
        if (newPosition.clone().sub(spherePosition).length() > 0.4) {
            setVector(newPosition.sub(spherePosition));
        } else {
            handlePointerUp();
            onToggleOrbitControls(false);
            setBufferOrbitControlToggle(true);

            setVector(vectorBeforeScalePointDrag.multiplyScalar(-1.0));
        }
        
        // updateSpherePosition(newPosition);
        // setDragEndPoint(newPosition);
        // Update the endpoint of the current line
        
    };



    

    const offsetFromSphere = direction.clone().multiplyScalar(0.3);
    const visualVectorLength = vector.clone().sub(offsetFromSphere);

    const visualVectorCenter = spherePosition.clone()
        .add(offsetFromSphere)
        .add(visualVectorLength.clone().multiplyScalar(0.5));
    
    const coneHeight = 0.35;
    const coneCenterRelativeToVisualVectorCenter =
        visualVectorLength.clone().multiplyScalar(0.5).sub(
            direction.clone().multiplyScalar(coneHeight / 2)
        );
    
    const cylinderHeight = visualVectorLength.clone().sub(
        direction.clone().multiplyScalar(coneHeight)
    ).length();
    const cylinderCenterRelativeToVisualVectorCenter =
        direction.clone().multiplyScalar(-coneHeight / 2);
    
    // Define a spring for the radius of the cylinder
    const { scale: cylinderScale } = useSpring({
        scale: baseVectorIsHovered ? 1.5 : 1.0, // Animate radius based on hover state
    });

    const { scale: coneScale } = useSpring({
        scale: baseVectorIsHovered ? 1.3 : 1.0, // Animate radius based on hover state
    });


    const { scale: scalePointScale } = useSpring({
        scale: scalePointIsHovered ? 1.0 : 0.8,
    });

    



    
    
    

    // const vectorX = vector.clone();
    // const axis = new THREE.Vector3().crossVectors(vector.clone(), new THREE.Vector3(0, 1, 0)).normalize();
    // const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, Math.PI/2);
    // const quaternion2 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
    // vectorX.applyQuaternion(quaternion2);

    // const rotationBracketXArrowPosition = spherePosition.clone().add(vectorX).toArray();
    const vectorX = direction.clone();
    // vectorX.applyEuler(rotationBracketXEuler);

    const quat2 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0));
    const euler2 = new THREE.Euler().setFromQuaternion(quat2);
    vectorX.applyEuler(euler2)
    vectorX.normalize()
    // vectorX.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * 0.5)
    
    
    
    
    
    return (
        <>
            {isRotating && vectorSphereIsSelected && (
                <>
                {/* Rotation Bracket X */}
                {/* Transparent handle for Rotation Bracket X */}
                {/* <animated.mesh
                    scale={vector.length()}
                    position={spherePosition.clone().toArray()}
                    rotation={rotationBracketXEuler}
                    onPointerEnter={() => {
                        setRotationBracketXIsHovered(true);
                    }}
                    onPointerLeave={() => {
                        setRotationBracketXIsHovered(false);
                    }}
                >
                    <ringGeometry args={[1.0, 1.1, 16, 2, 0.0, Math.PI*2]}/>
                    <meshToonMaterial color={"black"} side={THREE.DoubleSide} transparent opacity={0.1}/>
                </animated.mesh>

                {/* Color Torus for Rotation Bracket X */}
                {/* <animated.mesh
                    scale={vector.length()}
                    position={spherePosition.clone().toArray()}
                    rotation={new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction))}
                >
                    <torusGeometry args={[1.0, 0.01, 16, 64, Math.PI*2]}/>
                    <meshToonMaterial color={color} side={THREE.DoubleSide} transparent opacity={rotationBracketXIsHovered? 1.0 : 0.4}/>
                </animated.mesh> */}

                {/* Arrow Interactions for Rotation Bracket X */}
                {/* <animated.mesh
                    scale={vector.length()}
                    position={rotationBracketXArrowPosition}
                    // rotation={EulerX.clone()}
                >
                    <coneGeometry args={[0.09 / 2, 0.35 / 2, 16]}/>
                    <meshToonMaterial color={color} side={THREE.DoubleSide} transparent opacity={rotationBracketXIsHovered? 1.0 : 0.4}/>
                </animated.mesh> */}
                

                {rotationBracketYIsHovered && !rotationBracketYIsDragging && (
                    <>
                        <animated.mesh
                            position={rotationBracketYSpherePosition}
                        >
                            <sphereGeometry args={[0.09, 16, 16]}/>
                            <meshToonMaterial color={"gray"} transparent={true} opacity={0.5}/>
                        </animated.mesh>


                        <Line
                            points={[
                                spherePosition.toArray(),
                                rotationBracketYSpherePosition.clone()
                                    .sub(rotationBracketYSpherePosition.clone().sub(spherePosition).multiplyScalar(0.09 / 2)).toArray()
                                ]}
                            color="grey"
                            transparent={true}
                            opacity={0.5}
                            lineWidth={5}
                        />
                        
                    </>
                )}

                {/* Rotation Bracket Y */}
                
                    <animated.mesh
                        scale={vector.length()}
                        position={spherePosition.clone().toArray()}
                        onPointerMove={(e) => {
                            // Raycast to find intersection point
                            const intersection = e.intersections[0];
                            if (!intersection) return;
                            const intersection_array = intersection.point.toArray();
                            const rotatedVector = new THREE.Vector3(
                                intersection_array[0] - spherePosition.x,
                                intersection_array[1] - spherePosition.y,
                                intersection_array[2] - spherePosition.z,
                            ).normalize().multiplyScalar(vector.clone().length())

                            if (rotationBracketYIsDragging) {
                                setVector(rotatedVector); // Update sphere position to intersection point
                            } else {
                                setRotationBracketYSpherePosition(spherePosition.clone().add(rotatedVector)); // Update sphere position to intersection point
                            }
                        }}
                        onPointerEnter={e => {
                            e.stopPropagation();
                            setRotationBracketYIsHovered(true);
                            setInfoBlockText(`
                                Click this sphere to rotate $v_${vectorNumber}$. You can click and drag to rotate smoothly
                            `)
                            setShowInfoBlock(true)
                        }}
                        onPointerLeave={() => {
                            setRotationBracketYIsHovered(false);
                            setShowInfoBlock(false)
                        }}
                        onPointerDown={e => {
                            e.stopPropagation()
                            // if (e.target) {e.target.setPointerCapture(e.pointerId)}
                            setRotationBracketYIsDragging(true);
                            onToggleOrbitControls(false)

                            const intersection = e.intersections[0];
                            if (!intersection) return;
                            const intersection_array = intersection.point.toArray();
                            const rotatedVector = new THREE.Vector3(
                                intersection_array[0] - spherePosition.x,
                                intersection_array[1] - spherePosition.y,
                                intersection_array[2] - spherePosition.z,
                            ).normalize().multiplyScalar(vector.clone().length())
                            setVector(rotatedVector);
                        }}
                        onPointerUp={e => {
                            e.stopPropagation();
                            setRotationBracketYIsDragging(true);
                            // e.target.releasePointerCapture(e.pointerId);
                            onToggleOrbitControls(true)}
                        }
                        // onClick={(e) => {
                        //     // Raycast to find intersection point
                        //     const intersection = e.intersections[0];
                        //     if (!intersection) return;
                        //     const intersection_array = intersection.point.toArray();
                        //     const rotatedVector = new THREE.Vector3(
                        //         intersection_array[0],
                        //         intersection_array[1],
                        //         intersection_array[2],
                        //     ).normalize().multiplyScalar(vector.clone().length())
                        //     setVector(rotatedVector);
                        // }}
                    >
                        <sphereGeometry args={[1.0, 64, 32, 0, Math.PI*2]}/>
                        <meshToonMaterial color={color} side={THREE.DoubleSide} wireframe transparent opacity={0.1}/>
                    </animated.mesh>

                {/* Color Torus for Rotation Bracket Y */}
                </>
            )}


        {/* Scale Point */}
        {isScaling && vectorSphereIsSelected && (
            <DragControls
                autoTransform={false}
                onDragStart={handleScalePointDragStart}
                onDrag={(localMatrix, _deltaLocalMatrix, _worldMatrix, _deltaWorldMatrix) => {
                    handleScalePointDrag(localMatrix);
                }}
            >
                <animated.mesh
                    scale={scalePointScale}
                    position={spherePosition.clone().add(vector).toArray()}
                    onPointerEnter={e => {
                        if (rotationBracketYIsDragging) {return}
                        e.stopPropagation();
                        setScalePointIsHovered(true);
                        setInfoBlockText(`
                            Drag this point to scale $v_${vectorNumber}$
                        `);
                        setShowInfoBlock(true);
                    }}
                    onPointerLeave={() => {
                        setScalePointIsHovered(false);
                        setShowInfoBlock(false);
                    }}
                    onPointerDown={() => onToggleOrbitControls(false)}
                    onPointerUp={() => onToggleOrbitControls(true)}
                >
                    <sphereGeometry args={[0.09, 16, 16]}/>
                    <meshToonMaterial color={color}/>
                </animated.mesh>
            </DragControls>
        )}



        {vectorSphereIsSelected && (
            <group
                position={[
                    visualVectorCenter.x,
                    visualVectorCenter.y,
                    visualVectorCenter.z,
                ]}
                onPointerDown={() => onToggleOrbitControls(false)}
                onPointerUp={() => onToggleOrbitControls(true)}
                onPointerEnter={e => {
                    e.stopPropagation();
                    setBaseVectorIsHovered(true)
                    setInfoBlockText(`
                        This arrow represents the vector
                        $$v_${vectorNumber} = \\begin{bmatrix} ${vector.x.toFixed(3)} \\\\ ${vector.y.toFixed(3)} \\\\ ${vector.z.toFixed(3)} \\end{bmatrix}$$
                        Click to add/remove this vector from our collection. See the popup to view our current collection
                    `)
                    setShowInfoBlock(true)
                }}
                onPointerLeave={() => {
                    setBaseVectorIsHovered(false)
                    setShowInfoBlock(false)
                }}
                onClick={() => {
                    if (!baseVectorIsDragging) {
                        setBaseVectorIsSelected(!baseVectorIsSelected)
                        setShowEditBlock(true)
                        // setEditBlockText(`$$Edit \\\\ v_${vectorNumber}$$`)
                    }
                    
                }}
            >
                <DragControls
                    autoTransform={false}
                    onDragStart={handleBaseVectorDragStart}
                    onDrag={(localMatrix, _deltaLocalMatrix, _worldMatrix, _deltaWorldMatrix) => {
                        handleBaseVectorDrag(localMatrix);
                    }}
                >
                    <animated.mesh
                        scale-x={cylinderScale}
                        scale-y={1.0}
                        scale-z={cylinderScale}
                        position={[
                            cylinderCenterRelativeToVisualVectorCenter.x,
                            cylinderCenterRelativeToVisualVectorCenter.y,
                            cylinderCenterRelativeToVisualVectorCenter.z,
                        ]}
                        rotation={new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction))}
                        renderOrder={2}
                    >
                        <cylinderGeometry args={[0.02, 0.02, cylinderHeight, 16, 1]}/>
                        <meshToonMaterial color={color} transparent={true} opacity={baseVectorIsHovered ? (baseVectorIsSelected ? 1.0 : 0.8) : (baseVectorIsSelected ? 1.0 : 0.5)}/>
                    </animated.mesh>

                    <animated.mesh
                        scale-x={coneScale}
                        scale-y={1.0}
                        scale-z={coneScale}
                        position={[
                            coneCenterRelativeToVisualVectorCenter.x,
                            coneCenterRelativeToVisualVectorCenter.y,
                            coneCenterRelativeToVisualVectorCenter.z,
                        ]}
                        rotation={new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction))}
                        renderOrder={2}
                    >
                        <coneGeometry args={[0.09, 0.35, 16]}/>
                        <meshToonMaterial color={color} transparent={true} opacity={baseVectorIsHovered ? (baseVectorIsSelected ? 1.0 : 0.8) : (baseVectorIsSelected ? 1.0 : 0.5)}/>
                    </animated.mesh>

                </DragControls>
            </group>
        )}
            {lines}
            {currentLine}
        </>
    );
};

export default BaseVector;