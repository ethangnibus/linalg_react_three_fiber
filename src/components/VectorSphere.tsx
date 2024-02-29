import React, { useState } from 'react';
import { Sphere } from '@react-three/drei';
import { MeshPhysicalMaterial } from 'three';
import BaseVector from './BaseVector';


const VectorSphere: React.FC = () => {
    const [isSelected, setIsSelected] = useState(false);

    const sphere_material = new MeshPhysicalMaterial({
        color: isSelected ? 'yellow' : 'blue',
        roughness: 0.0,
        metalness: 0.0,
        ior: 1.9,
        reflectivity: 1.0,
        iridescence: 1.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.3,
        specularIntensity: 1.0,
    });
    


    return (
        <>
           <Sphere
              position={[0, 0, 0]}
              args={[0.126, 32, 32]}
              material={sphere_material}
              onClick={() => setIsSelected(!isSelected)}
           />

          {isSelected && (
              <>
                  <BaseVector direction={[17.0, 0.0, 0.0]} color="red"/>
                  <BaseVector direction={[0.0, 200.0, 0.0]} color="green"/>
                  <BaseVector direction={[0.0, 12.0, 1.0]} color="blue"/>
              </>
          )}
        </>
    );
};

export default VectorSphere;
