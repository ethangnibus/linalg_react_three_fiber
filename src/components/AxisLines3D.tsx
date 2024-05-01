import React from 'react';
import { Line, Cone } from '@react-three/drei';
import { MeshBasicMaterial,
    // Color
} from 'three';
import AxisLines2D from './AxisLines2D';

const AxisLines3D: React.FC = () => {
    const cone_material = new MeshBasicMaterial({
        color: 'black',
        transparent: true,
        opacity: 0.8
    })

    return (
        <>
            <AxisLines2D />
            <Cone // +y
                position={[0, 10 - 0.175, 0]}
                args={[0.09, 0.35, 16]}
                material={cone_material}
                rotation={[0, 0, 0]}
            />
            <Line points={[[0, -10, 0], [0, 10 - 0.35, 0]]} lineWidth={2} color="black" opacity={0.8} transparent={true} />

        </>
    );
};

export default AxisLines3D;
