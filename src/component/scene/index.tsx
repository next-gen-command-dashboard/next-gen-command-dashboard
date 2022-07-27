import React, { useRef, useState } from 'react';
import { Canvas, ReactThreeFiber, useFrame } from '@react-three/fiber';

interface BoxProps {
  position: Array<number>;
}

function Box(props: BoxProps): JSX.Element {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const { position } = props;

  useFrame(() => {
    if (mesh.current) {
      const objectMesh: ReactThreeFiber.MeshProps = mesh.current;
      objectMesh.rotation.x += 0.01;
    }
  });

  return (
    <mesh
      position={position}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 2, 3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function Scene(): JSX.Element {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
}

export default Scene;
