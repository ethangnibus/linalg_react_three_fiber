import React, { useRef } from 'react';
import * as THREE from 'three';
import { useTransition, animated } from '@react-spring/three';

interface SpanPlaneProps {
    spherePosition: THREE.Vector3;
    vector_u: THREE.Vector3;
    vector_v: THREE.Vector3;
    planeWidth: number;
    color: THREE.Color;
    showSpanPlane: boolean; // New prop for controlling visibility
}

const SpanPlane: React.FC<SpanPlaneProps> = ({
    spherePosition,
    vector_u,
    vector_v,
    planeWidth,
    color,
    showSpanPlane,
}) => {
    const scratchObject3D = new THREE.Object3D();

    const plane_front = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            vector_u.clone().cross(vector_v.clone()).normalize()
        )
    );

    const meshRef = useRef<THREE.InstancedMesh>(null);
    const numPoints = planeWidth * 2;

    // Define transition for fading in and out
    const planeTransition = useTransition(showSpanPlane, {
        from: { opacity: 0 },
        enter: { opacity: 0.1 },
        leave: { opacity: 0 },
        config: { duration: 1000 },
    });

    const linesTransition = useTransition(showSpanPlane, {
        from: { opacity: 0 },
        enter: { opacity: 0.8 },
        leave: { opacity: 0 },
        config: { duration: 1000 },
    });

    // Update instance matrices only when needed
    React.useEffect(() => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const parallel_with_vector_u = new THREE.Euler().setFromQuaternion(
            new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                vector_u.clone().normalize(), // unit direction of vector
            )
        );

        const parallel_with_vector_v = new THREE.Euler().setFromQuaternion(
            new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                vector_v.clone().normalize(), // unit direction of vector
            )
        );

        for (let i = 0; i <= planeWidth; i += 1) {
            const offset_u = spherePosition.clone().add(vector_u.clone().multiplyScalar(i - planeWidth / 2));
            const offset_v = spherePosition.clone().add(vector_v.clone().multiplyScalar(i - planeWidth / 2));

            scratchObject3D.position.copy(offset_u);
            scratchObject3D.rotation.copy(parallel_with_vector_v);
            scratchObject3D.updateMatrix();
            mesh.setMatrixAt(i, scratchObject3D.matrix);

            scratchObject3D.position.copy(offset_v);
            scratchObject3D.rotation.copy(parallel_with_vector_u);
            scratchObject3D.updateMatrix();
            mesh.setMatrixAt(i + planeWidth, scratchObject3D.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
    }, [numPoints, spherePosition, vector_u, vector_v, showSpanPlane]);

    return (
        <>
            {planeTransition((props, item) =>
                item ? (
                    <animated.mesh
                        position={spherePosition.toArray()}
                        rotation={plane_front}
                        renderOrder={5}
                        {...props}
                    >
                        <planeGeometry args={[planeWidth * 10, planeWidth * 10]} />
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

            {linesTransition((props, item) =>
                item ? (
                    <animated.instancedMesh
                        ref={meshRef}
                        args={[undefined, undefined, numPoints]}
                        frustumCulled={true}
                        renderOrder={4}
                        {...props}
                    >
                        <cylinderGeometry attach="geometry" args={[0.011, 0.011, planeWidth, 6]} />
                        <animated.meshToonMaterial
                            attach="material"
                            color={color}
                            transparent={true}
                            opacity={props.opacity}
                            blending={THREE.NormalBlending}
                        />
                    </animated.instancedMesh>
                ) : null
            )}
        </>
    );
};

export default SpanPlane;
