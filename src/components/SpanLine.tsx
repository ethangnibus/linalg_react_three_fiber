import React from 'react';
import * as THREE from 'three';
import { useTransition, animated } from '@react-spring/three';

interface SpanLineProps {
    spherePosition: THREE.Vector3;
    vector: THREE.Vector3;
    cylinderHeight: number;
    color: THREE.Color;
    showSpanLine: boolean; // New prop for controlling visibility
}

const SpanLine: React.FC<SpanLineProps> = ({
    spherePosition,
    vector,
    cylinderHeight,
    color,
    showSpanLine,
}) => {
    const rotationAngles = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            vector.clone().normalize(), // unit direction of vector
        )
    );

    // Define transition for fading in and out
    const transitions = useTransition(showSpanLine, {
        from: { opacity: 0 },
        enter: { opacity: 0.5 },
        leave: { opacity: 0 },
        config: { duration: 1000 },
    });

    return (
        <>
            {transitions((props, item) =>
                item ? (
                    <animated.mesh
                        position={spherePosition.toArray()}
                        rotation={rotationAngles}
                        renderOrder={3}
                        {...props}
                    >
                        <cylinderGeometry args={[0.01, 0.01, cylinderHeight, 8]} />
                        <animated.meshToonMaterial
                            color={color}
                            transparent={true}
                            opacity={props.opacity}
                            blending={THREE.NormalBlending}
                            side={THREE.DoubleSide}
                        />
                    </animated.mesh>
                ) : null
            )}
        </>
    );
};

export default SpanLine;
