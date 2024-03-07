import React from 'react';
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
