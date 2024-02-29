import React from 'react';
import { Cone, Cylinder } from '@react-three/drei';
import { MeshBasicMaterial } from 'three';
import * as THREE from 'three';

interface BaseVectorsProps {
  direction: [number, number, number]; // Direction of the arrow
  color: string;
}

const BaseVector: React.FC<BaseVectorsProps> = ({ direction, color }) => {
    const base_vector_material = new MeshBasicMaterial({
        color: color
    });

    const up_vector = new THREE.Vector3(0, 1, 0);
    const norm_vector = new THREE.Vector3(direction[0], direction[1], direction[2]).normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(up_vector, norm_vector);
    const rotationAngles = new THREE.Euler().setFromQuaternion(quaternion);



  return (
    <>
      

      {/* <Line points={[[0, 0, 0], direction]} lineWidth={30.0} color="red" /> */}

        <Cylinder
            position={[norm_vector.x * 0.5, norm_vector.y * 0.5, norm_vector.z * 0.5]}
            rotation={rotationAngles}
            args={[
                0.01, // radiusTop
                0.01, // radiusBottom
                0.65, // height
                16, // radialSegments
                1, // heightSegments
            ]}
            material={base_vector_material}
        />
        <Cone // +z
                position={[norm_vector.x * 0.825, norm_vector.y * 0.825, norm_vector.z * 0.825]}
                args={[0.09, 0.35, 16]}
                material={base_vector_material}
                rotation={rotationAngles}
            />
        
        {/* <Cone // +z
                position={[0, 0, 10 - 0.175]}
                args={[0.09, 0.35, 16]}
                material={cone_material}
                rotation={[Math.PI / 2, 0, 0]}
            /> */}
      
    </>
  );
};

export default BaseVector;
