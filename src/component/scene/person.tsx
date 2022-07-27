import React, { useState, Suspense } from 'react';
import Model from './model';

interface PersonProps {
  name: string,
  animationFilePaths: { idle: string, running: string },
  currentAnimation: string,
  scale: Array<number>,
  position: Array<number>,
  rotation: Array<number>
}

function Person({
  name, currentAnimation, scale, position, rotation, animationFilePaths,
}: PersonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group>
      <mesh
        position={[position[0], position[1] + 0.9, position[2]]}
        onClick={() => { alert(`Clicked on ${name}`); }}
        onPointerOver={() => { setIsHovered(true); }}
        onPointerOut={() => { setIsHovered(false); }}
      >
        <boxGeometry args={[0.5 * scale[0], 1.8 * scale[1], 0.5 * scale[2]]} />
        <meshPhongMaterial
          color="#ff0000"
          opacity={isHovered ? 0.4 : 0.0}
          transparent
        />
      </mesh>
      <Suspense fallback={null}>
        <Model
          path={(animationFilePaths as any)[currentAnimation]}
          scale={scale}
          position={position}
          rotation={rotation}
        />
      </Suspense>
    </group>
  );
}

export default Person;
