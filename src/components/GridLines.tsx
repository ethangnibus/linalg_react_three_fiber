import React from 'react';
import Line from './Line';

const GridLines: React.FC = () => {
  const gridLines = [];

  // Create vertical grid lines along the x-axis (skipping when x = 0)
  for (let i = -10; i <= 10; i++) {
    if (i !== 0) {
      gridLines.push(<Line key={`x${i}`} start={[i, 0, -10]} end={[i, 0, 10]} color="black" opacity={0.4}/>);
    }
  }

  // Create horizontal grid lines along the z-axis (skipping when z = 0)
  for (let i = -10; i <= 10; i++) {
    if (i !== 0) {
      gridLines.push(<Line key={`z${i}`} start={[-10, 0, i]} end={[10, 0, i]} color="black" opacity={0.4}/>);
    }
  }

  return <>{gridLines}</>;
};

export default GridLines;