import React, { useState, useEffect, useMemo } from 'react';
import { Cone, Cylinder, DragControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import SpanLine from './SpanLine';

interface BaseVectorsProps {
    direction: THREE.Vector3; // Direction of the arrow
    color: string;
    onToggleOrbitControls: (enabled: boolean) => void;
    spherePosition: THREE.Vector3; // Change to Vector3 type
    updateSpherePosition: (newPosition: THREE.Vector3) => void; // Add prop for updating sphere position
}

const BaseVector: React.FC<BaseVectorsProps> = ({ direction, color, onToggleOrbitControls, spherePosition, updateSpherePosition }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPosition, setDragStartPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [dragStartPoint, setDragStartPoint] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [dragEndPoint, setDragEndPoint] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [currentLine, setCurrentLine] = useState<JSX.Element | null>(null);
    const [lines, setLines] = useState<JSX.Element[]>([]);

    const handleDragStart = () => {
        if (isHovered) {
            setDragStartPosition(spherePosition.clone());
            setDragStartPoint(spherePosition.clone());
            setIsDragging(true);
            onToggleOrbitControls(false);
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
                color={color}
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
            <group>
                <DragControls
                    autoTransform={false}
                    onDragStart={handleDragStart}
                    onDrag={(localMatrix, _deltaLocalMatrix, _worldMatrix, _deltaWorldMatrix) => {
                        handleDrag(localMatrix);
                    }}
                >
                    <Cylinder
                        position={[
                            spherePosition.x + direction.x * 0.475,
                            spherePosition.y + direction.y * 0.475,
                            spherePosition.z + direction.z * 0.475
                        ]}
                        rotation={new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction))}
                        args={[
                            0.02,
                            0.02,
                            0.35,
                            16,
                            1,
                        ]}
                        material={useMemo(() => new THREE.MeshToonMaterial({
                            color: color,
                            transparent: true,
                            opacity: isHovered ? 0.6 : (isSelected ? 1.0 : 0.4),
                        }), [color, isHovered, isSelected])}
                        onClick={() => setIsSelected(!isSelected)}
                        onPointerDown={() => setIsHovered(true)}
                        onPointerLeave={() => setIsHovered(false)}
                    />
                    <Cone
                        position={[
                            spherePosition.x + direction.x * 0.825,
                            spherePosition.y + direction.y * 0.825,
                            spherePosition.z + direction.z * 0.825
                        ]}
                        args={[0.09, 0.35, 16]}
                        material={useMemo(() => new THREE.MeshToonMaterial({
                            color: color,
                            transparent: true,
                            opacity: isHovered ? 0.6 : (isSelected ? 1.0 : 0.4),
                        }), [color, isHovered, isSelected])}
                        rotation={new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction))}
                        onClick={() => setIsSelected(!isSelected)}
                        onPointerDown={() => setIsHovered(true)}
                        onPointerLeave={() => setIsHovered(false)}
                    />
                </DragControls>
            </group>
            {lines}
            {currentLine}
            {(isHovered || isSelected) && (
                <SpanLine
                    spherePosition={spherePosition}
                    rotationAngles={new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction))}
                    cylinderHeight={1000}
                    color={color}
                    isBaseVectorHovered={isHovered}
                    isBaseVectorSelected={isSelected}
                />
            )}
        </>
    );
};

export default BaseVector;
