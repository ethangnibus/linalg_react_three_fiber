import React, { useState, useEffect, useMemo } from 'react';
import { Cone, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import SpanLine from './SpanLine';

interface BaseVectorsProps {
    direction: [number, number, number]; // Direction of the arrow
    color: string;
    onToggleOrbitControls: (enabled: boolean) => void;
    spherePosition: THREE.Vector3; // Change to Vector3 type
}

const BaseVector: React.FC<BaseVectorsProps> = ({ direction, color, onToggleOrbitControls, spherePosition }) => {
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
    const norm_vector = new THREE.Vector3(direction[0], direction[1], direction[2]).normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(up_vector, norm_vector);
    const rotationAngles = new THREE.Euler().setFromQuaternion(quaternion);

    // const lineStart = spherePosition.clone().add(new THREE.Vector3().fromArray(direction).multiplyScalar(1000));
    // const lineEnd = spherePosition.clone().sub(new THREE.Vector3().fromArray(direction).multiplyScalar(1000));

    // const cylinderHeight = lineStart.distanceTo(lineEnd);
    const cylinderHeight = 1000;


    return (
        <>
            {/* Arrow line cylinder */}
            <group>
                <Cylinder
                    position={[norm_vector.x * 0.475, norm_vector.y * 0.475, norm_vector.z * 0.475]}
                    rotation={rotationAngles}
                    args={[
                        0.02, // radiusTop
                        0.02, // radiusBottom
                        0.35, // height
                        16, // radialSegments
                        1, // heightSegments
                    ]}
                    material={base_vector_material}
                    onClick={() => setIsSelected(!isSelected)}
                    onPointerDown={() => handlePointerDown()}
                    onPointerEnter={() => setIsHovered(true)}
                    onPointerLeave={() => setIsHovered(false)}
                />
                {/* Cone representing the arrow's point */}
                <Cone
                    position={[norm_vector.x * 0.825, norm_vector.y * 0.825, norm_vector.z * 0.825]}
                    args={[0.09, 0.35, 16]}
                    material={base_vector_material}
                    rotation={rotationAngles}
                    onClick={() => setIsSelected(!isSelected)}
                    onPointerDown={() => handlePointerDown()}
                    onPointerEnter={() => setIsHovered(true)}
                    onPointerLeave={() => setIsHovered(false)}
                />
            </group>
            {/* Span cylinder - render only when hovered or selected */}
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
