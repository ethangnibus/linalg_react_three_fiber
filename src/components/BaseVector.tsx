import React, { useState, useEffect } from 'react';
import { Cone, Cylinder, DragControls, Line } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three';

interface BaseVectorsProps {
    vector: THREE.Vector3; // Direction of the arrow
    color: THREE.Color;
    line_color: THREE.Color;
    onToggleOrbitControls: (enabled: boolean) => void;
    spherePosition: THREE.Vector3; // Change to Vector3 type
    updateSpherePosition: (newPosition: THREE.Vector3) => void; // Add prop for updating sphere position
    vectorSphereIsSelected: boolean;
    baseVectorIsSelected: boolean;
    setBaseVectorIsSelected: (enabled: boolean) => void;
}

const BaseVector: React.FC<BaseVectorsProps> = ({
    vector,
    color,
    line_color,
    onToggleOrbitControls,
    spherePosition,
    updateSpherePosition,
    vectorSphereIsSelected,
    baseVectorIsSelected,
    setBaseVectorIsSelected,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPosition, setDragStartPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [dragStartPoint, setDragStartPoint] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [_dragEndPoint, setDragEndPoint] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [currentLine, setCurrentLine] = useState<JSX.Element | null>(null);
    const [lines, setLines] = useState<JSX.Element[]>([]);

    const direction = vector.clone().normalize();

    const handleDragStart = () => {
        setDragStartPosition(spherePosition.clone());
        setDragStartPoint(spherePosition.clone());
        setIsDragging(true);
    };

    const handlePointerUp = () => {
        if (isDragging) {
            setIsDragging(false);
            onToggleOrbitControls(true);
            if (currentLine) {
                setLines([...lines, currentLine]); // Save the current line to the lines array
            }
            setCurrentLine(null); // Reset the current line
        }
    };

    useEffect(() => {
        document.addEventListener('pointerup', handlePointerUp);

        return () => {
            document.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isDragging, onToggleOrbitControls]);

    const handleDrag = (localMatrix: THREE.Matrix4) => {
        if (!isDragging) return; // Do nothing if not dragging
        const dragDelta = new THREE.Vector3().setFromMatrixPosition(localMatrix);
        const newPosition = dragDelta.projectOnVector(direction).add(dragStartPosition);
        updateSpherePosition(newPosition);
        setDragEndPoint(newPosition);
        // Update the endpoint of the current line
        const updatedLine = (
            <Line
                key={Math.random()}
                points={[dragStartPoint, newPosition]}
                color={line_color}
                dashed={true}
                lineWidth={5}
                // opacity={0.4}
                // transparent={true}
                dashOffset={0.5}
                dashScale={20}
            />
        );
        setCurrentLine(updatedLine);
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
        scale: isHovered ? 1.5 : 1.0, // Animate radius based on hover state
    });

    const { scale: coneScale } = useSpring({
        scale: isHovered ? 1.3 : 1.0, // Animate radius based on hover state
    });

    return (
        <>  
        {vectorSphereIsSelected && (
            <group
                position={[
                    visualVectorCenter.x,
                    visualVectorCenter.y,
                    visualVectorCenter.z,
                ]}
                onPointerDown={() => onToggleOrbitControls(false)}
                onPointerUp={() => onToggleOrbitControls(true)}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
                onClick={() => {
                    if (!isDragging) {
                        setBaseVectorIsSelected(!baseVectorIsSelected)
                    }
                    
                }}
            >
                <DragControls
                    autoTransform={false}
                    onDragStart={handleDragStart}
                    onDrag={(localMatrix, _deltaLocalMatrix, _worldMatrix, _deltaWorldMatrix) => {
                        handleDrag(localMatrix);
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
                        <meshToonMaterial color={color} transparent={true} opacity={isHovered ? 0.8 : (baseVectorIsSelected ? 1.0 : 0.5)}/>
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
                        <meshToonMaterial color={color} transparent={true} opacity={isHovered ? 0.8 : (baseVectorIsSelected ? 1.0 : 0.5)}/>
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