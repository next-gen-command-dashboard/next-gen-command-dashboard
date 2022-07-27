import React, {
  Suspense,
} from 'react';
import {
  Canvas,
} from '@react-three/fiber';
import CameraController from './camera';
import Box from './box';
import Person from './person';

function Scene(): JSX.Element {
  return (
    <Canvas>
      <CameraController />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <primitive object={new THREE.AxesHelper(10)} /> */}
      <Box position={[0, -0.3, 0]} scale={[10, 0.5, 10]} />
      <group>
        <Person
          name="Deepak"
          animationFilePaths={{
            idle: '/scene/model/person/data/Idle.glb',
            running: '/scene/model/person/data/Running.glb',
          }}
          currentAnimation="running"
          scale={[1.0, 1.0, 1.0]}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        />
        <Person
          name="Jay"
          animationFilePaths={{
            idle: '/scene/model/person/data/Idle.glb',
            running: '/scene/model/person/data/Running.glb',
          }}
          currentAnimation="idle"
          scale={[1.0, 1.0, 1.0]}
          position={[2, 0, 2]}
          rotation={[0, 0, 0]}
        />
      </group>
    </Canvas>
  );
}

export default Scene;
