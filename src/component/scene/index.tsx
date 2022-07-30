import React, {
  Suspense,
} from 'react';
import {
  Canvas, useThree,
} from '@react-three/fiber';
import {
  OrbitControls, PerspectiveCamera, Sky,
} from '@react-three/drei';
import { CubeTextureLoader } from 'three';
import Person from './person';
import Model from './model';
import Reticle from './Reticle';
import { ModalDataProps } from '../dashboard';

interface SceneProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setModalData: (modalData: ModalDataProps) => void;
}

function SkyBox(): null {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture: any = loader.load([
    'texture/skybox/right.jpg',
    'texture/skybox/left.jpg',
    'texture/skybox/top.jpg',
    'texture/skybox/bottom.jpg',
    'texture/skybox/front.jpg',
    'texture/skybox/back.jpg',
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}

const Scene = React.memo(({ setModalData }: SceneProps): JSX.Element => (
  <Canvas>
    <SkyBox />
    <PerspectiveCamera position={[0, 0, 0]} fov={100}>
      <group position={[0, 0, -1]}>
        <Reticle />
      </group>
    </PerspectiveCamera>
    <OrbitControls />
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <group>
      <Person
        name="Deepak"
        animationFilePaths={{
          idle: '/scene/model/person/data/Idle.glb',
          running: '/scene/model/person/data/Running.glb',
        }}
        currentAnimation="running"
        scale={[1.0, 1.0, 1.0]}
        position={[-1.6, -0.75, 2]}
        rotation={[0, 0, 0]}
        setModalData={setModalData}
      />
      <Person
        name="Jay"
        animationFilePaths={{
          idle: '/scene/model/person/data/Idle.glb',
          running: '/scene/model/person/data/Running.glb',
        }}
        currentAnimation="idle"
        scale={[1.0, 1.0, 1.0]}
        position={[0, -4.6, 0]}
        rotation={[0, 0, 0]}
        setModalData={setModalData}
      />
      <Suspense fallback={null}>
        <Model
          path="/scene/model/Barts_Hogarth.glb"
          scale={[0.8, 0.8, 0.8]}
          position={[0, 0, 5]}
          rotation={[0, 0, 0, 0]}
          material={undefined}
          renderPriority={-1}
        />
      </Suspense>
    </group>
  </Canvas>
));

export default Scene;
