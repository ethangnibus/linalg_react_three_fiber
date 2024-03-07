import React from 'react';
// import { Line } from '@react-three/drei';

const GridLines: React.FC = () => {
  // const gridLines = [];

  // // Create vertical grid lines along the x-axis (skipping when x = 0)
  // for (let i = -10; i <= 10; i++) {
  //   if (i !== 0) {
  //     gridLines.push(
  //         <Line
  //             key={`x${i}_xaxis`}
  //             points={[[i, 0, -10], [i, 0, 10]]}
  //             lineWidth={1}
  //             color="black"
  //             opacity={0.4}
  //             transparent={true}
  //             dashed={true}
  //             dashOffset={0.5}
  //             dashScale={20}
  //         />
  //     );
  //   }
  // }

  // // Create horizontal grid lines along the z-axis (skipping when z = 0)
  // for (let i = -10; i <= 10; i++) {
  //   if (i !== 0) {
  //       gridLines.push(
  //         <Line
  //           key={`x${i}_zaxis`}
  //           points={[[-10, 0, i], [10, 0, i]]}
  //           lineWidth={1}
  //           color="black"
  //           opacity={0.4}
  //           transparent={true}
  //           dashed={true}
  //           dashOffset={0.5}
  //           dashScale={20}
  //           />
  //       );
  //   }
  // }

  // return <>{gridLines}</>;
  return <>
    <gridHelper
      position={[0, 0, 0]}
      args={[
          20,
          20,
          "black",
          "grey"]}
      renderOrder={3}
    />
  </>
  
};

export default GridLines;