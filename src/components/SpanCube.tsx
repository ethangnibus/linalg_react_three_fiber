import React, { useMemo } from 'react';
import SpanPlane from './SpanPlane';
import * as THREE from 'three';

interface SpanCubeProps {
    spherePosition: THREE.Vector3;
    vec1: THREE.Vector3;
    vec2: THREE.Vector3;
    vec3: THREE.Vector3;
    planeWidth: number;
    color: THREE.Color;
}

const SpanCube: React.FC<SpanCubeProps> = ({
    spherePosition,
    vec1,
    vec2,
    vec3,
    planeWidth,
    color,
}) => {
    const span_plane_material = useMemo(() => new THREE.MeshToonMaterial({
        color: color,
        transparent: true,
        opacity: 0.2,
        blending: THREE.NormalBlending,
        side: THREE.DoubleSide,
    }), [color]);

    const plane_front = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            vec1.clone().cross(vec2.clone()).normalize()
        )
    );
    const grid = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            vec1.clone().cross(vec2.clone()).normalize()
        )
    );

    return (
        <>
            <SpanPlane
                spherePosition={spherePosition}
                vec1={vec1}
                vec2={vec2}
                planeWidth={planeWidth}
                color={color}
            />
            <SpanPlane
                spherePosition={spherePosition}
                vec1={vec1}
                vec2={vec3}
                planeWidth={planeWidth}
                color={color}
            />
            <SpanPlane
                spherePosition={spherePosition}
                vec1={vec2}
                vec2={vec3}
                planeWidth={planeWidth}
                color={color}
            />
        </>
        
    );
};

export default SpanCube;
