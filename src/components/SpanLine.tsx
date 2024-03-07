import React, { useMemo } from 'react';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface SpanLineProps {
    spherePosition: THREE.Vector3;
    vector: THREE.Vector3;
    cylinderHeight: number;
    color: THREE.Color;
    baseVectorIsSelected: boolean;
}

const SpanLine: React.FC<SpanLineProps> = ({
    spherePosition,
    vector,
    cylinderHeight,
    color,
    baseVectorIsSelected
}) => {
    const span_line_material = useMemo(() => new THREE.MeshToonMaterial({
        color: color,
        transparent: true,
        opacity: 0.6,
        blending: THREE.NormalBlending,
        side: THREE.DoubleSide,
    }), [color, baseVectorIsSelected]);

    const rotationAngles = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            vector.clone().normalize(), // unit direction of vector
        )
    );

    return (
        <Cylinder
            position={spherePosition.toArray()}
            rotation={rotationAngles}
            args={[
                0.01, // radiusTop
                0.01, // radiusBottom
                cylinderHeight,
                8, // radialSegments
            ]}
            material={span_line_material}
            renderOrder={0}
        />
    );
};

export default SpanLine;
