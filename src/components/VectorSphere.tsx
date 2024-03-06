import React, { useState } from 'react';
import { Sphere } from '@react-three/drei';
import { Vector3 } from 'three'; // Import Vector3 from three
import BaseVector from './BaseVector';
import * as THREE from 'three';

interface VectorSphereProps {
    onToggleOrbitControls: (enabled: boolean) => void;
    initialPosition: Vector3; // Initial position of the sphere
}

const VectorSphere: React.FC<VectorSphereProps> = ({ onToggleOrbitControls, initialPosition }) => {
    const [spherePosition, setSpherePosition] = useState<Vector3>(initialPosition);
    const [vectorSphereIsSelected, setVectorSphereIsSelected] = useState(false);
    const [vectorSphereIsHovered, setVectorSphereIsHovered] = useState(false);


    // const sphere_material = new MeshPhysicalMaterial({
    //     color: isSelected ? 'yellow' : 'blue',
    //     roughness: 0.0,
    //     metalness: 0.0,
    //     ior: 1.9,
    //     reflectivity: 1.0,
    //     iridescence: 1.0,
    //     clearcoat: 1.0,
    //     clearcoatRoughness: 0.3,
    //     specularIntensity: 1.0,
    // });
    const sphere_material = new THREE.MeshToonMaterial({
        color: new THREE.Color(
            0.005,
            0.05,
            0.35,
            ),
    });
    const handleToggleSelection = () => {
        setVectorSphereIsSelected(!vectorSphereIsSelected);
    };

    const handleToggleOrbitControls = (enabled: boolean) => {
        onToggleOrbitControls(enabled);
    };

    const updateSpherePosition = (newPosition: Vector3) => {
        // Update sphere position
        // You can add any additional logic here if needed
        setSpherePosition(newPosition);
    };

    const x_unit = new THREE.Vector3(1.0, 0.0, 0.0).normalize();
    const y_unit = new THREE.Vector3(0.0, 2.0, 1.0).normalize();
    const z_unit = new THREE.Vector3(1.0, 3.0, 35.0).normalize();

    return (
        <>
           <Sphere
              position={spherePosition.toArray()} // Convert Vector3 to array
              scale={vectorSphereIsHovered ? 1.2 : 1.0}
              args={[0.126, 32, 32]}
              material={sphere_material}
              onClick={handleToggleSelection}
            //   onPointerDown={() => handleToggleOrbitControls(false)}
              onPointerUp={() => handleToggleOrbitControls(true)}
              onPointerEnter={() => setVectorSphereIsHovered(true)}
              onPointerLeave={() => setVectorSphereIsHovered(false)}
           />

          
            <>
                <BaseVector // v1 - yellow
                    direction={x_unit}
                    color={new THREE.Color(0.45, 0.23, 0.005)}
                    line_color={new THREE.Color(1.0, 0.6, 0.01)}
                    onToggleOrbitControls={handleToggleOrbitControls}
                    spherePosition={spherePosition}
                    updateSpherePosition={updateSpherePosition}
                    vectorSphereIsSelected={vectorSphereIsSelected}
                />
                <BaseVector // v2 teal
                    direction={y_unit}
                    color={new THREE.Color(0.005, 0.4, 0.3)}
                    line_color={new THREE.Color(0.005, 0.7, 0.7)}
                    onToggleOrbitControls={handleToggleOrbitControls}
                    spherePosition={spherePosition}
                    updateSpherePosition={updateSpherePosition}
                    vectorSphereIsSelected={vectorSphereIsSelected}
                />
                <BaseVector // v3 off red
                    direction={z_unit}
                    color={new THREE.Color(0.3, 0.028, 0.028)}
                    line_color={new THREE.Color(0.8, 0.08, 0.08)}
                    onToggleOrbitControls={handleToggleOrbitControls}
                    spherePosition={spherePosition}
                    updateSpherePosition={updateSpherePosition}
                    vectorSphereIsSelected={vectorSphereIsSelected}
                />
            </>
        </>
    );
};

export default VectorSphere;