import React, { useState, useEffect } from 'react';
import { Cone, Cylinder, DragControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import SpanLine from './SpanLine';

interface BaseVectorsProps {
    direction: THREE.Vector3; // Direction of the arrow
    color: THREE.Color;
    line_color: THREE.Color;
    onToggleOrbitControls: (enabled: boolean) => void;
    spherePosition: THREE.Vector3; // Change to Vector3 type
    updateSpherePosition: (newPosition: THREE.Vector3) => void; // Add prop for updating sphere position
    vectorSphereIsSelected: boolean;
}

const BaseVector: React.FC<BaseVectorsProps> = ({ direction, color, line_color, onToggleOrbitControls, spherePosition, updateSpherePosition, vectorSphereIsSelected}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPosition, setDragStartPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [dragStartPoint, setDragStartPoint] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [_dragEndPoint, setDragEndPoint] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [currentLine, setCurrentLine] = useState<JSX.Element | null>(null);
    const [lines, setLines] = useState<JSX.Element[]>([]);

    const handleDragStart = () => {
        if (isHovered) {
            setDragStartPosition(spherePosition.clone());
            setDragStartPoint(spherePosition.clone());
            setIsDragging(true);
        }
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

    return (
        <>  
        {vectorSphereIsSelected && (
            <group
                scale={isHovered ? 1.2 : 1.0 }
                position={[
                    spherePosition.x + direction.x * (1 - 0.35),
                    spherePosition.y + direction.y * (1 - 0.35),
                    spherePosition.z + direction.z * (1 - 0.35),
                ]}
                onPointerDown={() => onToggleOrbitControls(false)}
                onPointerUp={() => onToggleOrbitControls(true)}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
                onClick={() => {
                    if (!isDragging) {
                        setIsSelected(!isSelected)
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
                    <Cylinder
                        position={[
                            // direction.x * 0.475,
                            // direction.y * 0.475,
                            // direction.z * 0.475,
                            direction.x * (-0.35/2),
                            direction.y * (-0.35/2),
                            direction.z * (-0.35/2),
                        ]}
                        rotation={new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction))}
                        args={[
                            0.02,
                            0.02,
                            0.35,
                            16,
                            1,
                        ]}
                        material={new THREE.MeshToonMaterial({
                            color: color,
                            transparent: true,
                            opacity: isHovered ? 0.8 : (isSelected ? 1.0 : 0.5),
                        })}
                        
                        
                    />
                    
                    <Cone
                        position={[
                            // direction.x * 0.825,
                            // direction.y * 0.825,
                            // direction.z * 0.825,
                            direction.x * (0.35/2),
                            direction.y * (0.35/2),
                            direction.z * (0.35/2),
                        ]}
                        args={[0.09, 0.35, 16]}
                        material={new THREE.MeshToonMaterial({
                            color: color,
                            transparent: true,
                            opacity: isHovered ? 0.8 : (isSelected ? 1.0 : 0.5),
                        })}
                        rotation={new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction))}
                        
                    />
                </DragControls>
            </group>
        )}
            {lines}
            {currentLine}
            {(vectorSphereIsSelected && isSelected) && (
                <SpanLine
                    spherePosition={spherePosition}
                    rotationAngles={new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction))}
                    cylinderHeight={1000}
                    // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                    color={new THREE.Color(0.0, 0.3, 0.3)}
                    isBaseVectorHovered={isHovered}
                    isBaseVectorSelected={isSelected}
                />
            )}
        </>
    );
};

export default BaseVector;