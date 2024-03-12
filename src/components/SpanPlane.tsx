import React, { useMemo, useRef } from 'react';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
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
    



    const meshRef = useRef<THREE.InstancedMesh>(null);
    const numPoints = planeWidth*2;
    // update instance matrices only when needed
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
    }, [numPoints, spherePosition, vector_u, vector_v]);
    

    const { opacity: animatedPlaneOpacity } = useSpring({
        from: { opacity: 0.0 },
        to: { opacity: 0.1 },
        config: { duration: 2000, easing: easings.easeOutQuart },
    });
    const { opacity: animatedLinesOpacity } = useSpring({
        from: { opacity: 0.0 },
        to: { opacity: 0.8 },
        config: {
            duration: 1000,
            // easing: easings.easeOutQuart
        },    });


    return (
        <>

            <mesh
                position={spherePosition.toArray()}
                rotation={plane_front}
                renderOrder={3}
            >
                <planeGeometry args={[planeWidth * 10, planeWidth * 10]}/>
                <animated.meshToonMaterial
                    color={color}
                    transparent={true}
                    opacity={animatedPlaneOpacity} 
                    blending={THREE.NormalBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>

            
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
                <animated.meshToonMaterial
                        attach="material"
                        color={color}
                        transparent={true}
                        opacity={animatedLinesOpacity}
                        blending={THREE.NormalBlending}
                />

                
            </instancedMesh>
            
        </>
    );
};

export default SpanPlane;
