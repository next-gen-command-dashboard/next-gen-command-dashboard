import React, { useMemo } from 'react';

const SIZE = 0.01;

function Reticle(): JSX.Element {
  return (
    <line>
      <bufferGeometry>
        <vector3 args={[0, SIZE, 0]} />
        <vector3 args={[0, -SIZE, 0]} />
        <vector3 args={[0, 0, 0]} />
        <vector3 args={[SIZE, 0, 0]} />
        <vector3 args={[-SIZE, 0, 0]} />
      </bufferGeometry>
      <lineBasicMaterial color="black" />
    </line>
  );
}

export default Reticle;
