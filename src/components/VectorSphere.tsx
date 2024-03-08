import React, { useState, useEffect } from 'react';
import { Sphere } from '@react-three/drei';
import { Vector3 } from 'three'; // Import Vector3 from three
import BaseVector from './BaseVector';
import * as THREE from 'three';
import SpanLine from './SpanLine';
import SpanPlane from './SpanPlane';
import SpanCube from './SpanCube';

interface VectorSphereProps {
    onToggleOrbitControls: (enabled: boolean) => void;
    vectorSpherePosition: Vector3;
    setVectorSpherePosition: (new_position: Vector3) => void;
    setCameraTarget: (new_position: Vector3) => void;
}

const VectorSphere: React.FC<VectorSphereProps> = ({ onToggleOrbitControls, vectorSpherePosition, setVectorSpherePosition, setCameraTarget }) => {
    
    const [vectorSphereIsSelected, setVectorSphereIsSelected] = useState(false);
    const [vectorSphereIsHovered, setVectorSphereIsHovered] = useState(false);
    const [v1, _setV1] = useState<Vector3>(new THREE.Vector3(1.0, 0.0, 0.0));
    const [v2, _setV2] = useState<Vector3>(new THREE.Vector3(0.0, 1.0, 0.5));
    const [v3, _setV3] = useState<Vector3>(new THREE.Vector3(0.1, 0.3, 3.0));
    
    // states for when vectors are selected
    const [v1IsSelected, setV1IsSelected] = useState(false);
    const [v2IsSelected, setV2IsSelected] = useState(false);
    const [v3IsSelected, setV3IsSelected] = useState(false);

    // states to show span components
    const [showV1Span, setShowV1Span] = useState(false);
    const [showV2Span, setShowV2Span] = useState(false);
    const [showV3Span, setShowV3Span] = useState(false);
    const [showV1V2Span, setShowV1V2Span] = useState(false);
    const [showV1V3Span, setShowV1V3Span] = useState(false);
    const [showV2V3Span, setShowV2V3Span] = useState(false);
    const [showV1V2V3Span, setShowV1V2V3Span] = useState(false);

    const handleToggleSelection = () => {
        setVectorSphereIsSelected(!vectorSphereIsSelected);
        if (vectorSphereIsSelected) {
            setCameraTarget(vectorSpherePosition);
        }
    };

    const handleToggleOrbitControls = (enabled: boolean) => {
        onToggleOrbitControls(enabled);
    };

    const updateSpherePosition = (newPosition: Vector3) => {
        setVectorSpherePosition(newPosition);
    };

    useEffect(() => {
        setShowV1Span(false);
        setShowV2Span(false);
        setShowV3Span(false);

        setShowV1V2Span(false);
        setShowV1V3Span(false);
        setShowV2V3Span(false);

        setShowV1V2V3Span(false);

        // render span lines
        if (v1IsSelected && !v2IsSelected && !v3IsSelected) {
            setShowV1Span(true);
        }
        if (!v1IsSelected && v2IsSelected && !v3IsSelected) {
            setShowV2Span(true);
        }
        if (!v1IsSelected && !v2IsSelected && v3IsSelected) {
            setShowV3Span(true);
        }

        // render span planes
        if (v1IsSelected && v2IsSelected && !v3IsSelected) {
            setShowV1V2Span(true);
        }
        if (v1IsSelected && !v2IsSelected && v3IsSelected) {
            setShowV1V3Span(true);
        }
        if (!v1IsSelected && v2IsSelected && v3IsSelected) {
            setShowV2V3Span(true);
        }

        if (v1IsSelected && v2IsSelected && v3IsSelected) {
            setShowV1V2V3Span(true);
        }
    }, [v1IsSelected, v2IsSelected, v3IsSelected]);

    return (
        <>
           <Sphere
              position={vectorSpherePosition.toArray()} // Convert Vector3 to array
              scale={vectorSphereIsHovered ? 1.2 : 1.0}
              args={[0.126, 32, 32]}
              material={new THREE.MeshToonMaterial({
                color: new THREE.Color(0.005, 0.05, 0.35)
              })}
              onClick={handleToggleSelection}
              onPointerUp={() => handleToggleOrbitControls(true)}
              onPointerEnter={() => setVectorSphereIsHovered(true)}
              onPointerLeave={() => setVectorSphereIsHovered(false)}
           />
          
            <>
                <BaseVector // v1 - yellow
                    vector={v1}
                    color={new THREE.Color(0.45, 0.23, 0.005)}
                    line_color={new THREE.Color(1.0, 0.6, 0.01)}
                    onToggleOrbitControls={handleToggleOrbitControls}
                    spherePosition={vectorSpherePosition}
                    updateSpherePosition={updateSpherePosition}
                    vectorSphereIsSelected={vectorSphereIsSelected}
                    baseVectorIsSelected={v1IsSelected}
                    setBaseVectorIsSelected={setV1IsSelected}
                />
                <BaseVector // v2 teal
                    vector={v2}
                    color={new THREE.Color(0.005, 0.4, 0.3)}
                    line_color={new THREE.Color(0.005, 0.7, 0.7)}
                    onToggleOrbitControls={handleToggleOrbitControls}
                    spherePosition={vectorSpherePosition}
                    updateSpherePosition={updateSpherePosition}
                    vectorSphereIsSelected={vectorSphereIsSelected}
                    baseVectorIsSelected={v2IsSelected}
                    setBaseVectorIsSelected={setV2IsSelected}
                />
                <BaseVector // v3 off red
                    vector={v3}
                    color={new THREE.Color(0.3, 0.028, 0.028)}
                    line_color={new THREE.Color(0.8, 0.08, 0.08)}
                    onToggleOrbitControls={handleToggleOrbitControls}
                    spherePosition={vectorSpherePosition}
                    updateSpherePosition={updateSpherePosition}
                    vectorSphereIsSelected={vectorSphereIsSelected}
                    baseVectorIsSelected={v3IsSelected}
                    setBaseVectorIsSelected={setV3IsSelected}
                />
            </>

            {/* Render Span Lines */}
            {(showV1Span) && (
                <SpanLine
                    spherePosition={vectorSpherePosition}
                    vector={v1}
                    cylinderHeight={1000}
                    // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                    color={new THREE.Color(0.0, 0.3, 0.3)}
                    baseVectorIsSelected={v1IsSelected}
                />
            )}
            {(showV2Span) && (
                <SpanLine
                    spherePosition={vectorSpherePosition}
                    vector={v2}
                    cylinderHeight={1000}
                    // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                    color={new THREE.Color(0.0, 0.3, 0.3)}
                    baseVectorIsSelected={v2IsSelected}
                />
            )}
            {(showV3Span) && (
                <SpanLine
                    spherePosition={vectorSpherePosition}
                    vector={v3}
                    cylinderHeight={1000}
                    // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                    color={new THREE.Color(0.0, 0.3, 0.3)}
                    baseVectorIsSelected={v2IsSelected}
                />
            )}


            {/* Render Span Planes */}
            {(showV1V2Span) && (
                <SpanPlane
                    spherePosition={vectorSpherePosition}
                    vector_u={v1}
                    vector_v={v2}
                    planeWidth={1000}
                    // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                    color={new THREE.Color(0.0, 0.3, 0.3)}
                />
            )}
            {(showV1V3Span) && (
                <SpanPlane
                    spherePosition={vectorSpherePosition}
                    vector_u={v1}
                    vector_v={v3}
                    planeWidth={1000}
                    // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                    color={new THREE.Color(0.0, 0.3, 0.3)}
                />
            )}
            {(showV2V3Span) && (
                <SpanPlane
                    spherePosition={vectorSpherePosition}
                    vector_u={v2}
                    vector_v={v3}
                    planeWidth={1000}
                    // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                    color={new THREE.Color(0.0, 0.3, 0.3)}
                />
            )}

            {/* Render Span Cube */}
            {(showV1V2V3Span) && (
                <SpanCube
                    spherePosition={vectorSpherePosition}
                    vector_a={v1}
                    vector_b={v2}
                    vector_c={v3}
                    planeWidth={64}
                    color={new THREE.Color(0.0, 0.3, 0.3)}
                />
            )}
        </>
    );
};

export default VectorSphere;
