import React, { useRef } from 'react';
import { Vector3 } from '@react-three/fiber';

interface BoxProps {
  position: Vector3;
  scale: [width?: number | undefined, height?: number | undefined,
    depth?: number | undefined, widthSegments?: number | undefined,
    heightSegments?: number | undefined, depthSegments?: number | undefined];
}

function Box(props: BoxProps): JSX.Element {
  const mesh = useRef();
  const { position, scale } = props;

  return (
    <mesh
      position={position}
      ref={mesh as any}
    >
      <boxGeometry args={scale} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default Box;
