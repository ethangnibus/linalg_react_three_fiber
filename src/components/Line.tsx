import React, { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

interface LineProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  opacity: number; // Opacity value between 0.0 and 1.0
}

const Line: React.FC<LineProps> = ({ start, end, color, opacity }) => {
  const ref = useRef<any>();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.material.opacity = opacity;
      ref.current.material.transparent = true;
      ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)));
    }
  }, [start, end, opacity]);

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent />
    </line>
  );
};

export default Line;