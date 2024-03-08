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
    const numPoints = planeWidth*6;
    // update instance matrices only when needed
    React.useEffect(() => {
        const mesh = meshRef.current;

        // set the transform matrix for each instance
        for (let i = 0; i <= planeWidth; i += 1) {

            // parallel with a towards b
            const offset_a_b = spherePosition.clone().add(vector_b.clone().multiplyScalar(i - planeWidth/2))
            scratchObject3D.position.set(offset_a_b.x, offset_a_b.y, offset_a_b.z);
            scratchObject3D.rotation.set(
                parallel_with_vector_a.x,
                parallel_with_vector_a.y,
                parallel_with_vector_a.z
            );
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt(i, scratchObject3D.matrix);

            // parallel with a towards c
            const offset_a_c = spherePosition.clone().add(vector_c.clone().multiplyScalar(i - planeWidth/2))
            scratchObject3D.position.set(offset_a_c.x, offset_a_c.y, offset_a_c.z);
            scratchObject3D.rotation.set(
                parallel_with_vector_a.x,
                parallel_with_vector_a.y,
                parallel_with_vector_a.z
            );
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt(i + planeWidth, scratchObject3D.matrix);

            // parallel with b towards a
            const offset_b_a = spherePosition.clone().add(vector_a.clone().multiplyScalar(i - planeWidth/2))
            scratchObject3D.position.set(offset_b_a.x, offset_b_a.y, offset_b_a.z);
            scratchObject3D.rotation.set(
                parallel_with_vector_b.x,
                parallel_with_vector_b.y,
                parallel_with_vector_b.z
            );
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt(i + planeWidth*2, scratchObject3D.matrix);

            // parallel with b towards c
            const offset_b_c = spherePosition.clone().add(vector_c.clone().multiplyScalar(i - planeWidth/2))
            scratchObject3D.position.set(offset_b_c.x, offset_b_c.y, offset_b_c.z);
            scratchObject3D.rotation.set(
                parallel_with_vector_b.x,
                parallel_with_vector_b.y,
                parallel_with_vector_b.z
            );
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt(i + planeWidth*3, scratchObject3D.matrix);

            // parallel with c towards a
            const offset_c_a = spherePosition.clone().add(vector_a.clone().multiplyScalar(i - planeWidth/2))
            scratchObject3D.position.set(offset_c_a.x, offset_c_a.y, offset_c_a.z);
            scratchObject3D.rotation.set(
                parallel_with_vector_c.x,
                parallel_with_vector_c.y,
                parallel_with_vector_c.z
            );
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt(i + planeWidth*4, scratchObject3D.matrix);

            // parallel with c towards b
            const offset_c_b = spherePosition.clone().add(vector_b.clone().multiplyScalar(i - planeWidth/2))
            scratchObject3D.position.set(offset_c_b.x, offset_c_b.y, offset_c_b.z);
            scratchObject3D.rotation.set(
                parallel_with_vector_c.x,
                parallel_with_vector_c.y,
                parallel_with_vector_c.z
            );
            scratchObject3D.updateMatrix();
            if (mesh) mesh.setMatrixAt(i + planeWidth*5, scratchObject3D.matrix);

        }
        
        if (mesh) mesh.instanceMatrix.needsUpdate = true;
    }, [numPoints, spherePosition, vector_a, vector_b, vector_c]);

    return (
        <>
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
                    opacity={0.5}
                    blending={THREE.NormalBlending}
                />
            </instancedMesh>
        </>
    );
};

export default SpanPlane;
