import React from 'react';
import Line from './Line';

const AxisLines: React.FC = () => {
  return (
    <>
      <Line start={[-10, 0, 0]} end={[10, 0, 0]} color="red" opacity={0.8}/>
      <Line start={[0, -10, 0]} end={[0, 10, 0]} color="green" opacity={0.8}/>
      <Line start={[0, 0, -10]} end={[0, 0, 10]} color="blue" opacity={0.8}/>
    </>
  );
};

export default AxisLines;
