import React, { useState, Suspense } from 'react';
import { Text } from '@react-three/drei';
import { MeshLambertMaterial } from 'three';
import * as THREE from 'three';
import { ModalHeader, ModalTitle } from 'react-bootstrap';
import Model from './model';
import { ModalDataProps } from '../dashboard';

interface PersonProps {
  name: string,
  animationFilePaths: { idle: string, running: string },
  currentAnimation: string,
  scale: Array<number>,
  position: Array<number>,
  rotation: Array<number>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  setModalData: (modalData: ModalDataProps) => void,
}

function Person({
  name, currentAnimation, scale, position, rotation, animationFilePaths, setModalData,
}: PersonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group>
      <group
        position={[position[0], position[1] + 2, position[2]]}
        quaternion={[0, 0, 0, 0]}
      >
        <Text
          scale={[1, 1, 1]}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </group>
      <mesh
        position={[position[0], position[1] + 0.9, position[2]]}
        onClick={() => {
          setModalData({
            header: <ModalTitle>{name}</ModalTitle>,
            body: <div><p>TODO: add video and status</p></div>,
            footer: null,
          });
        }}
        onPointerOver={() => {
          setIsHovered(true);
        }}
        onPointerOut={() => {
          setIsHovered(false);
        }}
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
          material={new MeshLambertMaterial({ color: new THREE.Color('#006fff') })}
          renderPriority={-2}
        />
      </Suspense>
    </group>
  );
}

export default Person;
