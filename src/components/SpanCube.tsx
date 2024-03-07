import React from 'react';
import SpanPlane from './SpanPlane';
import * as THREE from 'three';

interface SpanCubeProps {
    spherePosition: THREE.Vector3;
    vector_a: THREE.Vector3;
    vector_b: THREE.Vector3;
    vector_c: THREE.Vector3;
    planeWidth: number;
    color: THREE.Color;
}

const SpanCube: React.FC<SpanCubeProps> = ({
    spherePosition,
    vector_a,
    vector_b,
    vector_c,
    planeWidth,
    color,
}) => {

    return (
        <>
            <SpanPlane
                spherePosition={spherePosition}
                vector_u={vector_a}
                vector_v={vector_b}
                planeWidth={planeWidth}
                color={color}
            />
            <SpanPlane
                spherePosition={spherePosition}
                vector_u={vector_a}
                vector_v={vector_c}
                planeWidth={planeWidth}
                color={color}
            />
            <SpanPlane
                spherePosition={spherePosition}
                vector_u={vector_b}
                vector_v={vector_c}
                planeWidth={planeWidth}
                color={color}
            />
        </>
        
    );
};

export default SpanCube;
