import React, { useMemo } from 'react';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface SpanLineProps {
    spherePosition: THREE.Vector3;
    rotationAngles: THREE.Euler;
    cylinderHeight: number;
    color: string;
}

const SpanLine: React.FC<SpanLineProps> = ({ spherePosition, rotationAngles, cylinderHeight, color }) => {
    const span_line_material = useMemo(() => new THREE.MeshToonMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        blending: THREE.NormalBlending,
    }), [color]);

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
            renderOrder={1}
        />
    );
};

export default SpanLine;