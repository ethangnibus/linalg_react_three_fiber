import React from 'react';
import { Line, Cone } from '@react-three/drei';
import { MeshBasicMaterial } from 'three';

const AxisLines: React.FC = () => {
    const cone_material = new MeshBasicMaterial({
        color: 'black',
        transparent: true,
        opacity: 0.8
    })

    return (
        <>
            <Cone // -x
                position={[-11.25, 0, 0]}
                args={[0.2, 0.5, 16]}
                material={cone_material}
                rotation={[0, 0, Math.PI / 2]}
            />
            <Cone // +x
                position={[11.25, 0, 0]}
                args={[0.2, 0.5, 16]}
                material={cone_material}
                rotation={[0, 0, -Math.PI / 2]}
            />

            <Cone // -y
                position={[0, -11.25, 0]}
                args={[0.2, 0.5, 16]}
                material={cone_material}
                rotation={[Math.PI, 0, 0]}
            />
            <Cone // +y
                position={[0, 11.25, 0]}
                args={[0.2, 0.5, 16]}
                material={cone_material}
                rotation={[0, 0, 0]}
            />

            <Cone // -z
                position={[0, 0, -11.25]}
                args={[0.2, 0.5, 16]}
                material={cone_material}
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <Cone // +z
                position={[0, 0, 11.25]}
                args={[0.2, 0.5, 16]}
                material={cone_material}
                rotation={[Math.PI / 2, 0, 0]}
            />

            {/* <Line start={[-10, 0, 0]} end={[10, 0, 0]} color="red" opacity={0.8}/> */}
            <Line points={[[-11, 0, 0], [11, 0, 0]]} lineWidth={1} color="black" opacity={0.8} transparent={true} />
            <Line points={[[0, -11, 0], [0, 11, 0]]} lineWidth={1} color="black" opacity={0.8} transparent={true} />
            <Line points={[[0, 0, -11], [0, 0, 11]]} lineWidth={1} color="black" opacity={0.8} transparent={true} />
        </>
    );
};

export default AxisLines;
