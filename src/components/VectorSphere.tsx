import React, { useState } from 'react';
import { Sphere } from '@react-three/drei';
import { MeshPhysicalMaterial, Vector3 } from 'three'; // Import Vector3 from three
import BaseVector from './BaseVector';
import * as THREE from 'three';

interface VectorSphereProps {
    onToggleOrbitControls: (enabled: boolean) => void;
    initialPosition: Vector3; // Initial position of the sphere
}

const VectorSphere: React.FC<VectorSphereProps> = ({ onToggleOrbitControls, initialPosition }) => {
    const [spherePosition, setSpherePosition] = useState<Vector3>(initialPosition);
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

    const handleToggleSelection = () => {
        setIsSelected(!isSelected);
    };

    const handleToggleOrbitControls = (enabled: boolean) => {
        onToggleOrbitControls(enabled);
    };

    const updateSpherePosition = (newPosition: Vector3) => {
        // Update sphere position
        // You can add any additional logic here if needed
        setSpherePosition(newPosition);
    };

    const x_unit = new THREE.Vector3(17.0, 1.0, 0.0).normalize();
    const y_unit = new THREE.Vector3(0.0, 2.0, 1.0).normalize();
    const z_unit = new THREE.Vector3(1.0, 3.0, 35.0).normalize();

    return (
        <>
           <Sphere
              position={spherePosition.toArray()} // Convert Vector3 to array
              args={[0.126, 32, 32]}
              material={sphere_material}
              onClick={handleToggleSelection}
              onPointerDown={() => handleToggleOrbitControls(false)}
              onPointerUp={() => handleToggleOrbitControls(true)}
           />

          {isSelected && (
              <>
                  <BaseVector direction={x_unit} color="red" onToggleOrbitControls={handleToggleOrbitControls} spherePosition={spherePosition} updateSpherePosition={updateSpherePosition} />
                  <BaseVector direction={y_unit} color="green" onToggleOrbitControls={handleToggleOrbitControls} spherePosition={spherePosition} updateSpherePosition={updateSpherePosition} />
                  <BaseVector direction={z_unit} color="blue" onToggleOrbitControls={handleToggleOrbitControls} spherePosition={spherePosition} updateSpherePosition={updateSpherePosition} />
              </>
          )}
        </>
    );
};

export default VectorSphere;