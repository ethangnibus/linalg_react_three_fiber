import React, { useMemo } from 'react';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface SpanLineProps {
    spherePosition: THREE.Vector3;
    rotationAngles: THREE.Euler;
    cylinderHeight: number;
    color: string;
    isBaseVectorHovered: boolean;
    isBaseVectorSelected: boolean;
}

const SpanLine: React.FC<SpanLineProps> = ({ spherePosition, rotationAngles, cylinderHeight, color, isBaseVectorHovered, isBaseVectorSelected }) => {
    const span_line_material = useMemo(() => new THREE.MeshToonMaterial({
        color: color,
        transparent: true,
        opacity: isBaseVectorSelected ? 0.6 : (isBaseVectorHovered ? 0.4 : 0.0),
        blending: THREE.NormalBlending,
    }), [color, isBaseVectorHovered, isBaseVectorSelected]);

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
