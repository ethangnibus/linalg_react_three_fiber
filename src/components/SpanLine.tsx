import React, { useMemo } from 'react';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three'

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
        opacity: 0.5,
        blending: THREE.NormalBlending,
        side: THREE.DoubleSide,
    }), [color, baseVectorIsSelected]);

    const rotationAngles = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            vector.clone().normalize(), // unit direction of vector
        )
    );


    const { scale: spanScale } = useSpring({
        from: { scale: 0.0 }, // Initial scale is 0
        to: { scale: 1.0 }, // Final scale is 1
        config: { duration: 50000 }, // Animation duration in milliseconds
      });

    return (
        <animated.mesh
        position={spherePosition.toArray()}
        rotation={rotationAngles}
        scale-x={1.0}
        scale-y={spanScale}
        scale-z={1.0}
        renderOrder={0}
    >
        <cylinderGeometry args={[0.01, 0.01, cylinderHeight, 8]}/>
        <meshToonMaterial
            color={color}
            transparent={true}
            opacity={0.5}
            blending={THREE.NormalBlending}
            side={THREE.DoubleSide}
        />
        
    </animated.mesh>
        // <Cylinder
        //     position={spherePosition.toArray()}
        //     rotation={rotationAngles}
        //     args={[
        //         0.01, // radiusTop
        //         0.01, // radiusBottom
        //         cylinderHeight,
        //         8, // radialSegments
        //     ]}
        //     material={span_line_material}
        //     renderOrder={0}
        // />
    );
};

export default SpanLine;
