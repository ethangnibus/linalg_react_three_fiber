import React from 'react';
import * as THREE from 'three';
import { useSpring, animated, easings } from '@react-spring/three';

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
}) => {

    const rotationAngles = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            vector.clone().normalize(), // unit direction of vector
        )
    );


    // const { scale: spanScale } = useSpring({
    //     from: { scale: 0.0 }, // Initial scale is 0
    //     to: { scale: 1.0 }, // Final scale is 1
    //     config: { duration: 1000, easing: easings.easeInExpo }, // Animation duration in milliseconds
    // });
    const { opacity: animatedLineOpacity } = useSpring({
        from: { opacity: 0.0 },
        to: { opacity: 0.5 },
        config: {
            duration: 1000,
            easing: easings.easeOutCubic
        },
    });

    return (
        <mesh
            position={spherePosition.toArray()}
            rotation={rotationAngles}
            // scale-x={1.0}
            // scale-y={spanScale}
            // scale-z={1.0}
            renderOrder={3}
        >
            <cylinderGeometry args={[0.01, 0.01, cylinderHeight, 8]}/>
            <animated.meshToonMaterial
                color={color}
                transparent={true}
                opacity={animatedLineOpacity}
                blending={THREE.NormalBlending}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

export default SpanLine;
