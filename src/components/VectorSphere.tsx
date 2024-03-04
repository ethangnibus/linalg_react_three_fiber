import React, { useState, useEffect } from 'react';
import { Sphere } from '@react-three/drei';
import { MeshPhysicalMaterial, Vector3 } from 'three'; // Import Vector3 from three
import BaseVector from './BaseVector';

interface VectorSphereProps {
  onToggleOrbitControls: (enabled: boolean) => void;
  spherePosition: Vector3; // Change to Vector3 type
}

const VectorSphere: React.FC<VectorSphereProps> = ({ onToggleOrbitControls, spherePosition }) => {
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

    const handlePointerDown = () => {
        onToggleOrbitControls(false);
    };

    const handlePointerUp = () => {
        onToggleOrbitControls(true);
    };

    useEffect(() => {
        document.addEventListener('pointerup', handlePointerUp);

        return () => {
            document.removeEventListener('pointerup', handlePointerUp);
        };
    }, []);

    return (
        <>
           <Sphere
              position={spherePosition.toArray()} // Convert Vector3 to array
              args={[0.126, 32, 32]}
              material={sphere_material}
              onClick={() => setIsSelected(!isSelected)}
              onPointerDown={handlePointerDown}
           />

          {isSelected && (
              <>
                  <BaseVector direction={[17.0, 0.0, 0.0]} color="red" onToggleOrbitControls={onToggleOrbitControls} spherePosition={spherePosition} />
                  <BaseVector direction={[0.0, 200.0, 0.0]} color="green" onToggleOrbitControls={onToggleOrbitControls} spherePosition={spherePosition} />
                  <BaseVector direction={[0.0, 12.0, 1.0]} color="blue" onToggleOrbitControls={onToggleOrbitControls} spherePosition={spherePosition} />
              </>
          )}
        </>
    );
};

export default VectorSphere;
