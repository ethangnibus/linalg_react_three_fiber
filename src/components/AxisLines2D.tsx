import React from 'react';
import { Line, Cone } from '@react-three/drei';
import { MeshBasicMaterial,
    // Color
} from 'three';

const AxisLines2D: React.FC = () => {
    const cone_material = new MeshBasicMaterial({
        color: 'black',
        transparent: true,
        opacity: 0.8
    })

    return (
        <>
            <Cone // +x
                position={[10 - 0.175, 0, 0]}
                args={[0.09, 0.35, 16]}
                material={cone_material}
                rotation={[0, 0, -Math.PI / 2]}
            />
            <Cone // +z
                position={[0, 0, 10 - 0.175]}
                args={[0.09, 0.35, 16]}
                material={cone_material}
                rotation={[Math.PI / 2, 0, 0]}
            />

            <Line points={[[-10, 0, 0], [10 - 0.35, 0, 0]]} lineWidth={2} color="black" opacity={0.8} transparent={true} />
            <Line points={[[0, 0, -10], [0, 0, 10 - 0.35]]} lineWidth={2} color="black" opacity={0.8} transparent={true} />

        </>
    );
};

export default AxisLines2D;
