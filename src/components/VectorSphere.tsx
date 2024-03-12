import React, { useState, useEffect } from 'react';
import BaseVector from './BaseVector';
import * as THREE from 'three';
import SpanLine from './SpanLine';
import SpanPlane from './SpanPlane';
import SpanCube from './SpanCube';
import { useSpring, animated } from '@react-spring/three';


interface VectorSphereProps {
    onToggleOrbitControls: (enabled: boolean) => void;
    vectorSpherePosition: THREE.Vector3;
    setVectorSpherePosition: (new_position: THREE.Vector3) => void;
    setCameraTarget: (new_position: THREE.Vector3) => void;
}

function vectorsAreCollinear(v1: THREE.Vector3, v2: THREE.Vector3) {
    const crossProduct = v1.clone().cross(v2);
    return crossProduct.length() === 0;
}

const VectorSphere: React.FC<VectorSphereProps> = ({ onToggleOrbitControls, vectorSpherePosition, setVectorSpherePosition, setCameraTarget }) => {
    
    const [vectorSphereIsSelected, setVectorSphereIsSelected] = useState(false);
    const [vectorSphereIsHovered, setVectorSphereIsHovered] = useState(false);
    const [v1, _setV1] = useState<THREE.Vector3>(new THREE.Vector3(1.0, 0.1, 0.05));
    const [v2, _setV2] = useState<THREE.Vector3>(new THREE.Vector3(0.1, 1.0, 0.1));
    const [v3, _setV3] = useState<THREE.Vector3>(new THREE.Vector3(0.05, -0.05, 1.0));
    
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

    const updateSpherePosition = (newPosition: THREE.Vector3) => {
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
            if (vectorsAreCollinear(v1, v2)) {
                setShowV1Span(true);
            } else {
                setShowV1V2Span(true);
            }
        }
        if (v1IsSelected && !v2IsSelected && v3IsSelected) {
            if (vectorsAreCollinear(v1, v3)) {
                setShowV1Span(true);
            } else {
                setShowV1V3Span(true);
            }
        }
        if (!v1IsSelected && v2IsSelected && v3IsSelected) {
            if (vectorsAreCollinear(v2, v3)) {
                setShowV2Span(true);
            } else {
                setShowV2V3Span(true);
            }
        }

        const v1v2Collinear = vectorsAreCollinear(v1, v2);
        const v1v3Collinear = vectorsAreCollinear(v1, v3);
        const v2v3Collinear = vectorsAreCollinear(v2, v3);

        if (v1IsSelected && v2IsSelected && v3IsSelected) {
            if (!v1v2Collinear && !v1v3Collinear && !v2v3Collinear) {
                setShowV1V2V3Span(true); // All vectors linearly independent
            } else if (v1v2Collinear && !v1v3Collinear && !v2v3Collinear) {
                // V1 and V2 are collinear
                v1.length <= v2.length ? setShowV2V3Span(true) : setShowV1V3Span(true);
            } else if (!v1v2Collinear && v1v3Collinear && !v2v3Collinear) {
                // V1 and V3 are collinear
                v1.length <= v3.length ? setShowV1V2Span(true) : setShowV2V3Span(true);
            } else if (!v1v2Collinear && !v1v3Collinear && v2v3Collinear) {
                // V2 and V3 are collinear
                v2.length <= v3.length ? setShowV1V2Span(true) : setShowV1V3Span(true);
            } else {
                setShowV1Span(true); // All are collinear
            }
        }
    }, [v1IsSelected, v2IsSelected, v3IsSelected]);

    const { scale: vectorSphereScale } = useSpring({ scale: vectorSphereIsHovered ? 1.3 : 1.0 })

    return (
        <>
        <animated.mesh
            position={vectorSpherePosition.toArray()}
            scale={vectorSphereScale}
            onClick={handleToggleSelection}
            onPointerUp={() => handleToggleOrbitControls(true)}
            onPointerEnter={() => setVectorSphereIsHovered(true)}
            onPointerLeave={() => setVectorSphereIsHovered(false)}
        >
            <sphereGeometry args={[0.126, 32, 32]}/>
            <meshToonMaterial color={new THREE.Color(0.005, 0.05, 0.35)}/>
        </animated.mesh>

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
                    planeWidth={32}
                    color={new THREE.Color(0.0, 0.3, 0.3)}
                />
            )}
        </>
    );
};

export default VectorSphere;
