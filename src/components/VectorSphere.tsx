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
    setVectorSpherePosition: (newPosition: THREE.Vector3) => void;
    setCameraTarget: (newPosition: THREE.Vector3) => void;
    setShowInfoBlock: (enabled: boolean) => void;
    setInfoBlockText: (newString: String) => void;
    setShowEditBlock: (enabled: boolean) => void;
    setEditBlockText: (newString: String) => void;
    showV1Span: boolean;
    setShowV1Span: (enabled: boolean) => void;
    showV2Span: boolean;
    setShowV2Span: (enabled: boolean) => void;
    showV3Span: boolean;
    setShowV3Span: (enabled: boolean) => void;
    showV1V2Span: boolean;
    setShowV1V2Span: (enabled: boolean) => void;
    showV1V3Span: boolean;
    setShowV1V3Span: (enabled: boolean) => void;
    showV2V3Span: boolean;
    setShowV2V3Span: (enabled: boolean) => void;
    showV1V2V3Span: boolean;
    setShowV1V2V3Span: (enabled: boolean) => void;
}

function vectorsAreCollinear(v1: THREE.Vector3, v2: THREE.Vector3) {
    const crossProduct = v1.clone().cross(v2);
    return crossProduct.length() === 0;
}

const VectorSphere: React.FC<VectorSphereProps> = ({
    onToggleOrbitControls,
    vectorSpherePosition,
    setVectorSpherePosition,
    setCameraTarget,
    setShowInfoBlock,
    setInfoBlockText,
    setShowEditBlock,
    setEditBlockText,
    showV1Span,
    setShowV1Span,
    showV2Span,
    setShowV2Span,
    showV3Span,
    setShowV3Span,
    showV1V2Span,
    setShowV1V2Span,
    showV1V3Span,
    setShowV1V3Span,
    showV2V3Span,
    setShowV2V3Span,
    showV1V2V3Span,
    setShowV1V2V3Span,
}) => {
    const [vectorSphereIsHovered, setVectorSphereIsHovered] = useState(false); // New state for hover

    
    const [vectorSphereIsSelected, setVectorSphereIsSelected] = useState(false);
    const [v1, _setV1] = useState<THREE.Vector3>(new THREE.Vector3(1.0, 0.0, 0.0));
    const [v2, _setV2] = useState<THREE.Vector3>(new THREE.Vector3(-1.0, 0.0, 0.0));
    const [v3, _setV3] = useState<THREE.Vector3>(new THREE.Vector3(1.05, -0.05, 1.0));
    
    // states for when vectors are selected
    const [v1IsSelected, setV1IsSelected] = useState(false);
    const [v2IsSelected, setV2IsSelected] = useState(false);
    const [v3IsSelected, setV3IsSelected] = useState(false);

    const [numScaledVectors, setNumScaledVectors] = useState(1);

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

        const v1v2Collinear = vectorsAreCollinear(v1, v2);
        const v1v3Collinear = vectorsAreCollinear(v1, v3);
        const v2v3Collinear = vectorsAreCollinear(v2, v3);

        // render span lines
        if (v1IsSelected && !v2IsSelected && !v3IsSelected) {
            setEditBlockText(`$$\\text{Span } \\{ \\mathbf{v}_1 \\}$$`)
            setShowV1Span(true);
        } else if (!v1IsSelected && v2IsSelected && !v3IsSelected) {
            setEditBlockText(`$$\\text{Span } \\{ \\mathbf{v}_2 \\}$$`)
            setShowV2Span(true);
        } else if (!v1IsSelected && !v2IsSelected && v3IsSelected) {
            setEditBlockText(`$$\\text{Span } \\{ \\mathbf{v}_3 \\}$$`)
            setShowV3Span(true);
        }

        // render span planes
        else if (v1IsSelected && v2IsSelected && !v3IsSelected) {
            setEditBlockText(`$$\\text{Span } \\{ \\mathbf{v}_1, \\mathbf{v}_2 \\}$$`)
            if (vectorsAreCollinear(v1, v2)) {
                setShowV1Span(true);
            } else {
                setShowV1V2Span(true);
            }
        } else if (v1IsSelected && !v2IsSelected && v3IsSelected) {
            setEditBlockText(`$$\\text{Span } \\{ \\mathbf{v}_1, \\mathbf{v}_3 \\}$$`)
            if (vectorsAreCollinear(v1, v3)) {
                setShowV1Span(true);
            } else {
                setShowV1V3Span(true);
            }
        } else if (!v1IsSelected && v2IsSelected && v3IsSelected) {
            setEditBlockText(`$$\\text{Span }  \\{ \\mathbf{v}_2, \\mathbf{v}_3 \\}$$`)
            if (vectorsAreCollinear(v2, v3)) {
                setShowV2Span(true);
            } else {
                setShowV2V3Span(true);
            }
        }

        else if (v1IsSelected && v2IsSelected && v3IsSelected) {
            setEditBlockText(`$$\\text{Span }  \\{ \\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3 \\}$$`)
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

        // no vectors are selected
        else {
            setEditBlockText(`$$\\text{Span } \\{ \\}$$`)

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
            onPointerEnter={() => {
                setVectorSphereIsHovered(true)

                setInfoBlockText(`
                    Here we're showing a vector given by
                    $$\\text{Sphere Position} = \\begin{bmatrix} ${vectorSpherePosition.x.toFixed(3)} \\\\ ${vectorSpherePosition.y.toFixed(3)} \\\\ ${vectorSpherePosition.z.toFixed(3)} \\end{bmatrix}$$
                    Click on this vector to show it's movement vectors
                `)
                setShowInfoBlock(true)
            }}
            onPointerLeave={() => {
                setVectorSphereIsHovered(false)
                setShowInfoBlock(false)
            }}
        >
            <sphereGeometry args={[0.126, 32, 32]}/>
            <meshToonMaterial color={new THREE.Color(0.005, 0.05, 0.35)}/>
        </animated.mesh>

            <>
                <BaseVector // v1 - yellow
                    vector={v1}
                    vectorNumber={1}
                    color={new THREE.Color(0.45, 0.23, 0.005)}
                    line_color={new THREE.Color(1.0, 0.6, 0.01)}
                    onToggleOrbitControls={handleToggleOrbitControls}
                    spherePosition={vectorSpherePosition}
                    updateSpherePosition={updateSpherePosition}
                    vectorSphereIsSelected={vectorSphereIsSelected}
                    baseVectorIsSelected={v1IsSelected}
                    setBaseVectorIsSelected={setV1IsSelected}
                    setShowInfoBlock={setShowInfoBlock}
                    setInfoBlockText={setInfoBlockText}
                    numScaledVectors={numScaledVectors}
                    setNumScaledVectors={setNumScaledVectors}
                    setShowEditBlock={setShowEditBlock}
                />
                <BaseVector // v2 teal
                    vector={v2}
                    vectorNumber={2}
                    color={new THREE.Color(0.005, 0.4, 0.3)}
                    line_color={new THREE.Color(0.005, 0.7, 0.7)}
                    onToggleOrbitControls={handleToggleOrbitControls}
                    spherePosition={vectorSpherePosition}
                    updateSpherePosition={updateSpherePosition}
                    vectorSphereIsSelected={vectorSphereIsSelected}
                    baseVectorIsSelected={v2IsSelected}
                    setBaseVectorIsSelected={setV2IsSelected}
                    setShowInfoBlock={setShowInfoBlock}
                    setInfoBlockText={setInfoBlockText}
                    numScaledVectors={numScaledVectors}
                    setNumScaledVectors={setNumScaledVectors}
                    setShowEditBlock={setShowEditBlock}
                />
                <BaseVector // v3 off red
                    vector={v3}
                    vectorNumber={3}
                    color={new THREE.Color(0.3, 0.028, 0.028)}
                    line_color={new THREE.Color(0.8, 0.08, 0.08)}
                    onToggleOrbitControls={handleToggleOrbitControls}
                    spherePosition={vectorSpherePosition}
                    updateSpherePosition={updateSpherePosition}
                    vectorSphereIsSelected={vectorSphereIsSelected}
                    baseVectorIsSelected={v3IsSelected}
                    setBaseVectorIsSelected={setV3IsSelected}
                    setShowInfoBlock={setShowInfoBlock}
                    setInfoBlockText={setInfoBlockText}
                    numScaledVectors={numScaledVectors}
                    setNumScaledVectors={setNumScaledVectors}
                    setShowEditBlock={setShowEditBlock}
                />
            </>

            {/* Render Span Lines */}
            <SpanLine
                spherePosition={vectorSpherePosition}
                vector={v1}
                cylinderHeight={1000}
                // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                color={new THREE.Color(0.0, 0.3, 0.3)}
                showSpanLine={showV1Span}
            />
            <SpanLine
                spherePosition={vectorSpherePosition}
                vector={v2}
                cylinderHeight={1000}
                // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                color={new THREE.Color(0.0, 0.3, 0.3)}
                showSpanLine={showV2Span}
            />
            <SpanLine
                spherePosition={vectorSpherePosition}
                vector={v3}
                cylinderHeight={1000}
                // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                color={new THREE.Color(0.0, 0.3, 0.3)}
                showSpanLine={showV3Span}
            />


            {/* Render Span Planes */}
            <SpanPlane
                spherePosition={vectorSpherePosition}
                vector_u={v1}
                vector_v={v2}
                planeWidth={1000}
                // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                color={new THREE.Color(0.0, 0.3, 0.3)}
                showSpanPlane={showV1V2Span}
                
            />
            <SpanPlane
                spherePosition={vectorSpherePosition}
                vector_u={v1}
                vector_v={v3}
                planeWidth={1000}
                // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                color={new THREE.Color(0.0, 0.3, 0.3)}
                showSpanPlane={showV1V3Span}
            />
            <SpanPlane
                spherePosition={vectorSpherePosition}
                vector_u={v2}
                vector_v={v3}
                planeWidth={1000}
                // color={new THREE.Color(0.35686275, 0.85882354, 0.85882354)}
                color={new THREE.Color(0.0, 0.3, 0.3)}
                showSpanPlane={showV2V3Span}
            />

            {/* Render Span Cube */}
            {(showV1V2V3Span) && (
                <SpanCube
                    spherePosition={vectorSpherePosition}
                    vector_a={v1}
                    vector_b={v2}
                    vector_c={v3}
                    planeWidth={50}
                    color={new THREE.Color(0.0, 0.3, 0.3)}
                />
            )}
        </>
    );
};

export default VectorSphere;
