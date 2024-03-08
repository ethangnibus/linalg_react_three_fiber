import React, { useMemo, useRef } from 'react';
import { Plane, Cylinder, Instances, Instance, Merged } from '@react-three/drei';
import * as THREE from 'three';
// import { CylinderBufferGeometry } from 'three';
import { extend } from '@react-three/fiber';

// Extend CylinderBufferGeometry
// extend({ CylinderBufferGeometry });

interface SpanPlaneProps {
    spherePosition: THREE.Vector3;
    vector_u: THREE.Vector3;
    vector_v: THREE.Vector3;
    planeWidth: number;
    color: THREE.Color;
}

const scratchObject3D = new THREE.Object3D();

  
const SpanPlane: React.FC<SpanPlaneProps> = ({
    spherePosition,
    vector_u,
    vector_v,
    planeWidth,
    color,
}) => {
    console.log(spherePosition,
        vector_u,
        vector_v,
        planeWidth,
        color,
    );
    const span_plane_material = useMemo(() => new THREE.MeshToonMaterial({
        color: color,
        transparent: true,
        opacity: 0.2,
        blending: THREE.NormalBlending,
        side: THREE.DoubleSide,
    }), [color]);

    const span_grid_material = useMemo(() => new THREE.MeshToonMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        blending: THREE.NormalBlending,
    }), [color]);
    // const span_grid_mid = useMemo(() => new THREE.MeshToonMaterial({
    //     color: color,
    //     transparent: true,
    //     opacity: 0.6,
    //     blending: THREE.NormalBlending,
    // }), [color]);
    // const span_grid_far = useMemo(() => new THREE.MeshToonMaterial({
    //     color: color,
    //     transparent: true,
    //     opacity: 0.4,
    //     blending: THREE.NormalBlending,
    // }), [color]);
    // const span_grid_super_far = useMemo(() => new THREE.MeshToonMaterial({
    //     color: color,
    //     transparent: true,
    //     opacity: 0.2,
    //     blending: THREE.NormalBlending,
    // }), [color]);

    const plane_front = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            vector_u.clone().cross(vector_v.clone()).normalize()
        )
    );

    // const grid = new THREE.Euler().setFromQuaternion(
    //     new THREE.Quaternion().setFromUnitVectors(
    //         new THREE.Vector3(0, 1, 0),
    //         vector_u.clone().cross(vector_v.clone()).normalize()
    //     )
    // );

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


    const gridLines = [];

    // // Create lines parallel with vector_u
    // for (let i = -1000; i <= 1000; i++) {
    //     gridLines.push(
    //         <Cylinder
    //             position={
    //                 spherePosition.clone().add(vector_v.clone().multiplyScalar(i))
    //             }
    //             rotation={parallel_with_vector_u}
    //             args={[
    //                 0.01, // radiusTop
    //                 0.01, // radiusBottom
    //                 100,
    //                 8, // radialSegments
    //             ]}
    //             material={span_grid_material}
    //             renderOrder={0}
    //         />
    //     );
    // }

    // for (let i = -1000; i <= 1000; i++) {
    //     gridLines.push(
    //         <Cylinder
    //             key={"span_plane_u_parallel_" + i}
    //             position={
    //                 spherePosition.clone().add(vector_v.clone().multiplyScalar(i))
    //             }
    //             rotation={parallel_with_vector_u}
    //             args={[
    //                 0.01, // radiusTop
    //                 0.01, // radiusBottom
    //                 100,
    //                 8, // radialSegments
    //             ]}
    //             material={span_grid_material}
    //             renderOrder={0}
    //         />
    //     );
    //   }

    // // Create lines parallel with vector_v
    // for (let i = -100; i <= 100; i++) {
    //     let distance_material = span_grid_material;

    //     gridLines.push(
    //         <Cylinder
    //             position={
    //                 spherePosition.clone().add(vector_u.clone().multiplyScalar(i))
    //             }
    //             rotation={parallel_with_vector_v}
    //             args={[
    //                 0.01, // radiusTop
    //                 0.01, // radiusBottom
    //                 100,
    //                 8, // radialSegments
    //             ]}
    //             material={distance_material}
    //             renderOrder={0}
    //         />
    //     );
    // }
    
    
    const data = new Array(2000).fill(0).map((_d, id) => ({id}));
    

    const meshRef = useRef<THREE.InstancedMesh>(null);
    // const numPoints = data.length;
    const numPoints = 2000;

    // update instance matrices only when needed
    React.useEffect(() => {
        const mesh = meshRef.current;

        // set the transform matrix for each instance
        for (let i = 0; i <= numPoints; i += 2) {

            const offset_u = spherePosition.clone().add(vector_u.clone().multiplyScalar(i - numPoints / 2))
            scratchObject3D.position.set(offset_u.x, offset_u.y, offset_u.z);
            scratchObject3D.rotation.set(
                parallel_with_vector_v.x,
                parallel_with_vector_v.y,
                parallel_with_vector_v.z
            );
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt(i, scratchObject3D.matrix);


            const offset_v = spherePosition.clone().add(vector_v.clone().multiplyScalar(i - numPoints / 2))
            scratchObject3D.position.set(offset_v.x, offset_v.y, offset_v.z);
            scratchObject3D.rotation.set(
                parallel_with_vector_u.x,
                parallel_with_vector_u.y,
                parallel_with_vector_u.z
            );
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt(i + 1, scratchObject3D.matrix);
        }
        
        if (mesh) mesh.instanceMatrix.needsUpdate = true;
    }, [numPoints, spherePosition, vector_u, parallel_with_vector_v]);

    const cylinder_geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.15, 32);
    const cylinder_material = new THREE.MeshStandardMaterial({ color: "#fff"});
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

            <instancedMesh
                ref={meshRef}
                args={[undefined, undefined, numPoints]}
                frustumCulled={true}
            >
                <cylinderGeometry attach="geometry" args={[0.01, 0.01, 100, 8]} />
                <meshToonMaterial attach="material" color={color} transparent={true} opacity={0.8} blending={THREE.NormalBlending} />
            </instancedMesh>
            {/* {gridLines} */}
        </>
    );
};

export default SpanPlane;
