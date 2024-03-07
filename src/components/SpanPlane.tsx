import React, { useMemo } from 'react';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

interface SpanPlaneProps {
    spherePosition: THREE.Vector3;
    vec1: THREE.Vector3;
    vec2: THREE.Vector3;
    planeWidth: number;
    color: THREE.Color;
}

const SpanPlane: React.FC<SpanPlaneProps> = ({
    spherePosition,
    vec1,
    vec2,
    planeWidth,
    color,
}) => {
    const span_plane_material = useMemo(() => new THREE.MeshToonMaterial({
        color: color,
        transparent: true,
        opacity: 0.2,
        blending: THREE.NormalBlending,
    }), [color]);

    const plane_front = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            vec1.clone().cross(vec2.clone()).normalize()
        )
    );
    const plane_back = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            vec1.clone().cross(vec2.clone()).negate().normalize()
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
        <Plane
            position={spherePosition.toArray()}
            rotation={plane_front}
            args={[
                planeWidth,
                planeWidth,
            ]}
            material={span_plane_material}
            renderOrder={1}
        />
        <Plane
            position={spherePosition.toArray()}
            rotation={plane_back}
            args={[
                planeWidth,
                planeWidth,
            ]}
            material={span_plane_material}
            renderOrder={1}
        />
        <gridHelper
            position={spherePosition.toArray()}
            rotation={grid}
            args={[
                1000,
                1000,
                color,
                color]}
            renderOrder={2}
        />
        </>
        
    );
};

export default SpanPlane;
