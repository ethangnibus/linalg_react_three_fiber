import React, { useMemo } from 'react';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface SpanLineProps {
    spherePosition: THREE.Vector3;
    rotationAngles: THREE.Euler;
    cylinderHeight: number;
    color: THREE.Color;
    baseVectorIsHovered: boolean;
    baseVectorIsSelected: boolean;
}

const SpanLine: React.FC<SpanLineProps> = ({ spherePosition, rotationAngles, cylinderHeight, color, baseVectorIsHovered, baseVectorIsSelected }) => {
    const span_line_material = useMemo(() => new THREE.MeshToonMaterial({
        color: color,
        transparent: true,
        opacity: baseVectorIsSelected ? 0.6 : (baseVectorIsHovered ? 0.4 : 0.0),
        blending: THREE.NormalBlending,
    }), [color, baseVectorIsHovered, baseVectorIsSelected]);

    return (
        <Cylinder
            position={spherePosition.toArray()}
            rotation={rotationAngles}
            args={[
                0.01, // radiusTop
                0.01, // radiusBottom
                cylinderHeight,
                16, // radialSegments
            ]}
            material={span_line_material}
            renderOrder={0}
        />
    );
};

export default SpanLine;
