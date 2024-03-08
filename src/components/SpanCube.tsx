import React, { useRef } from 'react';
import * as THREE from 'three';

interface SpanPlaneProps {
    spherePosition: THREE.Vector3;
    vector_a: THREE.Vector3;
    vector_b: THREE.Vector3;
    vector_c: THREE.Vector3;
    planeWidth: number;
    color: THREE.Color;
}



const SpanPlane: React.FC<SpanPlaneProps> = ({
    spherePosition,
    vector_a,
    vector_b,
    vector_c,
    planeWidth,
    color,
}) => {
    const scratchObject3D = new THREE.Object3D();

    const parallel_with_vector_a = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            vector_a.clone().normalize(), // unit direction of vector
        )
    );
    const parallel_with_vector_b = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            vector_b.clone().normalize(), // unit direction of vector
        )
    );
    const parallel_with_vector_c = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            vector_c.clone().normalize(), // unit direction of vector
        )
    );



    const meshRef = useRef<THREE.InstancedMesh>(null);
    const pointsOnPlane = planeWidth*planeWidth;
    const pointsOnCube = pointsOnPlane*3;
    
    // update instance matrices only when needed
    React.useEffect(() => {
        const mesh = meshRef.current;

        // width <=> a
        // height <=> b
        // depth <=> c

        for (let i = 0; i < planeWidth*planeWidth; i += 1) {
            const x = Math.floor(i/planeWidth);
            const y = i % planeWidth;

            // pointing to a
            scratchObject3D.rotation.copy(parallel_with_vector_a);
            const orthoganal_points_to_a = spherePosition.clone()
                .add(vector_b.clone().multiplyScalar(x - (planeWidth/2)))
                .add(vector_c.clone().multiplyScalar(y - (planeWidth/2)));
            scratchObject3D.position.copy(orthoganal_points_to_a);
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt(pointsOnPlane + i, scratchObject3D.matrix);

            // pointing to b
            scratchObject3D.rotation.copy(parallel_with_vector_b);
            const orthoganal_points_to_b = spherePosition.clone()
                .add(vector_a.clone().multiplyScalar(x - (planeWidth/2)))
                .add(vector_c.clone().multiplyScalar(y - (planeWidth/2)));
            scratchObject3D.position.copy(orthoganal_points_to_b);
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt(i, scratchObject3D.matrix);

            // pointing to c
            scratchObject3D.rotation.copy(parallel_with_vector_c);
            const orthoganal_points_to_c = spherePosition.clone()
                .add(vector_a.clone().multiplyScalar(x - (planeWidth/2)))
                .add(vector_b.clone().multiplyScalar(y - (planeWidth/2)));
            scratchObject3D.position.copy(orthoganal_points_to_c);
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt((pointsOnPlane*2) + i, scratchObject3D.matrix);

        }
        // for (let width = 0; width < planeWidth; width += 1) {
        //     for (let depth = 0; depth < planeWidth; depth += 1) {

        //         // vertical lines (b)
        //         scratchObject3D.rotation.copy(parallel_with_vector_b);
        //         const orthoganal_points_to_b = spherePosition.clone()
        //             .add(vector_a.clone().multiplyScalar(width - (planeWidth/2)))
        //             .add(vector_c.clone().multiplyScalar(depth - (planeWidth/2)));
        //         scratchObject3D.position.copy(orthoganal_points_to_b);
        //         scratchObject3D.updateMatrix();
        //         if (mesh) mesh.setMatrixAt(((width * planeWidth) + depth), scratchObject3D.matrix);

        //         // lines pointing right (a)
        //         // scratchObject3D.rotation.copy(parallel_with_vector_a);
        //         // const orthoganal_points_to_a = spherePosition.clone()
        //         //     .add(vector_b.clone().multiplyScalar(width - (planeWidth/2)))
        //         //     .add(vector_c.clone().multiplyScalar(depth - (planeWidth/2)));
        //         // scratchObject3D.position.copy(orthoganal_points_to_a);
        //         // scratchObject3D.updateMatrix();
        //         // if (mesh) mesh.setMatrixAt(((pointsOnPlane) + (width * planeWidth) + depth), scratchObject3D.matrix);

        //         // lines pointing back (c)
                
        //     }
        // }



        // // set the transform matrix for each instance
        // for (let width = 0; width <= planeWidth; width += 1) {
        //     for (let height = 0; height <= planeWidth; height += 1) {
        //         for (let depth = 0; depth <= planeWidth; depth += 1) {
        //             const offset_towards_a = spherePosition.clone().add(vector_a.clone().multiplyScalar(width - planeWidth/2));
        //             const offset_towards_b = spherePosition.clone().add(vector_b.clone().multiplyScalar(height - planeWidth/2));
        //             const offset_towards_c = spherePosition.clone().add(vector_c.clone().multiplyScalar(depth - planeWidth/2));

        //             // // planes orthoganal to a
        //             // scratchObject3D.position.copy(offset_towards_a);
        //             // scratchObject3D.rotation.copy(parallel_with_vector_b);
        //             // scratchObject3D.updateMatrix();
        //             // if (mesh) mesh.setMatrixAt((width*planeWidth*planeWidth + depth*planeWidth*planeWidth + height), scratchObject3D.matrix);

        //             // scratchObject3D.position.copy(offset_towards_a);
        //             // scratchObject3D.rotation.copy(parallel_with_vector_c);
        //             // scratchObject3D.updateMatrix();
        //             // if (mesh) mesh.setMatrixAt((width*planeWidth*planeWidth + depth*planeWidth*planeWidth + height), scratchObject3D.matrix);

        //             // // planes orthoganal to b
        //             // scratchObject3D.position.copy(offset_towards_b);
        //             // scratchObject3D.rotation.copy(parallel_with_vector_a);
        //             // scratchObject3D.updateMatrix();
        //             // if (mesh) mesh.setMatrixAt((width*planeWidth*planeWidth + depth*planeWidth*planeWidth + height), scratchObject3D.matrix);

        //             // scratchObject3D.position.copy(offset_towards_b);
        //             // scratchObject3D.rotation.copy(parallel_with_vector_c);
        //             // scratchObject3D.updateMatrix();
        //             // if (mesh) mesh.setMatrixAt((width*planeWidth*planeWidth + depth*planeWidth*planeWidth + height), scratchObject3D.matrix);

        //             // // planes orthoganal to c
        //             // scratchObject3D.position.copy(offset_towards_c);
        //             // scratchObject3D.rotation.copy(parallel_with_vector_a);
        //             // scratchObject3D.updateMatrix();
        //             // if (mesh) mesh.setMatrixAt((width*planeWidth*planeWidth + depth*planeWidth*planeWidth + height), scratchObject3D.matrix);

        //             scratchObject3D.position.copy(offset_towards_c);
        //             scratchObject3D.rotation.copy(parallel_with_vector_b);
        //             scratchObject3D.updateMatrix();
        //             if (mesh) mesh.setMatrixAt((width*planeWidth*planeWidth + depth*planeWidth*planeWidth + height), scratchObject3D.matrix);


        //         }
        //     }
        // }
        
        
        if (mesh) mesh.instanceMatrix.needsUpdate = true;
    }, [pointsOnCube, spherePosition, vector_a, vector_b, vector_c, parallel_with_vector_a, parallel_with_vector_b, parallel_with_vector_c]);

    return (
        <>
            <instancedMesh
                ref={meshRef}
                args={[undefined, undefined, pointsOnCube]}
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
                    opacity={0.5}
                    blending={THREE.NormalBlending}
                />
            </instancedMesh>
        </>
    );
};

export default SpanPlane;
