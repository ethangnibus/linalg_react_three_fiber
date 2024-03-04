import React, { useState, useEffect, useMemo } from 'react';
import { Cone, Cylinder } from '@react-three/drei';
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

    const handlePointerDown = () => {
        if (isHovered) {
            onToggleOrbitControls(false);
            setIsDragging(true);
        }
    };

    const handlePointerUp = () => {
        if (isDragging) {
            setIsDragging(false);
            onToggleOrbitControls(true);
        }
    };

    const handleClick = () => {
        
        // Calculate new position by adding direction to current sphere position
        const newPosition = spherePosition.clone().add(direction);
        alert("onclick " + newPosition.x + " " + newPosition.y + " " + newPosition.z);
        // Call the function to update the sphere position
        updateSpherePosition(newPosition);
        // Toggle selection state
        setIsSelected(!isSelected);
    };

    useEffect(() => {
        document.addEventListener('pointerup', handlePointerUp);

        return () => {
            document.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isHovered, isDragging, onToggleOrbitControls]);

    const base_vector_material = useMemo(() => new THREE.MeshToonMaterial({
        color: color,
        transparent: true,
        opacity: isHovered ? 0.6 : (isSelected ? 1.0 : 0.4),
    }), [color, isHovered, isSelected]);

    const up_vector = new THREE.Vector3(0, 1, 0);
    const norm_vector = direction;
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(up_vector, norm_vector);
    const rotationAngles = new THREE.Euler().setFromQuaternion(quaternion);

    const cylinderHeight = 1000;

    return (
        <>
            <group>
                <Cylinder
                    position={[
                      spherePosition.x + norm_vector.x * 0.475,
                      spherePosition.y + norm_vector.y * 0.475,
                      spherePosition.z + norm_vector.z * 0.475
                    ]}
                    rotation={rotationAngles}
                    args={[
                        0.02,
                        0.02,
                        0.35,
                        16,
                        1,
                    ]}
                    material={base_vector_material}
                    onClick={handleClick} // Change onClick to handleClick
                    onPointerDown={handlePointerDown}
                    onPointerEnter={() => setIsHovered(true)}
                    onPointerLeave={() => setIsHovered(false)}
                />
                <Cone
                    position={[
                      spherePosition.x + norm_vector.x * 0.825,
                      spherePosition.y + norm_vector.y * 0.825,
                      spherePosition.z + norm_vector.z * 0.825
                    ]}
                    args={[0.09, 0.35, 16]}
                    material={base_vector_material}
                    rotation={rotationAngles}
                    onClick={handleClick} // Change onClick to handleClick
                    onPointerDown={handlePointerDown}
                    onPointerEnter={() => setIsHovered(true)}
                    onPointerLeave={() => setIsHovered(false)}
                />
            </group>
            {(isHovered || isSelected) && (
                <SpanLine
                    spherePosition={spherePosition}
                    rotationAngles={rotationAngles}
                    cylinderHeight={cylinderHeight}
                    color={color}
                    isBaseVectorHovered={isHovered}
                    isBaseVectorSelected={isSelected}
                />
            )}
        </>
    );
};

export default BaseVector;
