import React, { useMemo, useRef } from 'react';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated, easings } from '@react-spring/three';

interface SpanPlaneProps {
    spherePosition: THREE.Vector3;
    vector_u: THREE.Vector3;
    vector_v: THREE.Vector3;
    planeWidth: number;
    color: THREE.Color;
}

const SpanPlane: React.FC<SpanPlaneProps> = ({
    spherePosition,
    vector_u,
    vector_v,
    planeWidth,
    color,
}) => {
    const scratchObject3D = new THREE.Object3D();
    const span_plane_material = useMemo(() => new THREE.MeshToonMaterial({
        color: color,
        transparent: true,
        opacity: 0.1,
        blending: THREE.NormalBlending,
        side: THREE.DoubleSide,
    }), [color]);

    const plane_front = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            vector_u.clone().cross(vector_v.clone()).normalize()
        )
    );
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



    const meshRef = useRef<THREE.InstancedMesh>(null);
    const numPoints = planeWidth*2;
    // update instance matrices only when needed
    React.useEffect(() => {
        const mesh = meshRef.current;

        // set the transform matrix for each instance
        for (let i = 0; i <= planeWidth; i += 1) {

            // update lines parallel with v
            const offset_u = spherePosition.clone().add(vector_u.clone().multiplyScalar(i - planeWidth/2))
            scratchObject3D.position.set(offset_u.x, offset_u.y, offset_u.z);
            scratchObject3D.rotation.set(
                parallel_with_vector_v.x,
                parallel_with_vector_v.y,
                parallel_with_vector_v.z
            );
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt(i, scratchObject3D.matrix);

            // update line parallel with u
            const offset_v = spherePosition.clone().add(vector_v.clone().multiplyScalar(i - planeWidth/2))
            scratchObject3D.position.set(offset_v.x, offset_v.y, offset_v.z);
            scratchObject3D.rotation.set(
                parallel_with_vector_u.x,
                parallel_with_vector_u.y,
                parallel_with_vector_u.z
            );
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt(i + planeWidth, scratchObject3D.matrix);
        }
        
        if (mesh) mesh.instanceMatrix.needsUpdate = true;
    }, [numPoints, spherePosition, vector_u, vector_v]);


    const { scale: spanPlaneScale } = useSpring({
        from: { scale: 0.0 }, // Initial scale is 0
        to: { scale: 1.0 }, // Final scale is 1
        config: { duration: 5000, easing: easings.easeInCubic }, // Animation duration in milliseconds
    });

    return (
        <>

            <animated.mesh
                position={spherePosition.toArray()}
                rotation={plane_front}
                scale={spanPlaneScale}
                renderOrder={3}
            >
                <planeGeometry args={[planeWidth * 10, planeWidth * 10]}/>
                <meshToonMaterial
                    color={color}
                    transparent={true}
                    opacity={0.1}
                    blending={THREE.NormalBlending}
                    side={THREE.DoubleSide}
                />
            </animated.mesh>

            <animated.mesh
                scale={spanPlaneScale}
            >
                <instancedMesh
                    ref={meshRef}
                    args={[undefined, undefined, numPoints]}
                    frustumCulled={true}
                    renderOrder={1}
                >
                    <cylinderGeometry
                        attach="geometry"
                        args={[0.01, 0.01, planeWidth, 8]}
                    />
                    <meshToonMaterial
                        attach="material"
                        color={color}
                        transparent={true}
                        opacity={0.8}
                        blending={THREE.NormalBlending}
                    />
                </instancedMesh>
            </animated.mesh>
        </>
    );
};

export default SpanPlane;
