import React, { useRef } from 'react';
import {
  GLTFLoader,
} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import {
  RootState, useFrame, useLoader,
} from '@react-three/fiber';
import { MeshBasicMaterial } from 'three';

interface ModelProps {
  path: string,
  scale: Array<number>,
  position: Array<number>,
  rotation: Array<number>,
  material: MeshBasicMaterial | undefined,
  renderPriority: number
}

function Model({
  path, scale, position, rotation, material, renderPriority,
}: ModelProps): JSX.Element {
  const model = useLoader(
    GLTFLoader,
    path,
  );
  const objectRef: any = useRef();

  let mixer: THREE.AnimationMixer;
  if (model.animations.length) {
    mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach((clip: THREE.AnimationClip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useFrame((state: RootState, delta: number) => {
    mixer?.update(delta);
  }, renderPriority);

  model.scene.traverse((child: any) => {
    if (child.isMesh) {
      if (material) {
        // eslint-disable-next-line no-param-reassign
        child.material = material;
      }
      // eslint-disable-next-line no-param-reassign
      child.frustumCulled = false;
      // eslint-disable-next-line no-param-reassign
      child.castShadow = true;
      // eslint-disable-next-line no-param-reassign
      child.receiveShadow = true;
      // eslint-disable-next-line no-param-reassign
      child.material.side = THREE.FrontSide;
    }
  });

  useFrame(() => {
    // eslint-disable-next-line prefer-destructuring
    model.scene.rotation.x = rotation[0];
    // eslint-disable-next-line prefer-destructuring
    model.scene.rotation.y = rotation[1];
    // eslint-disable-next-line prefer-destructuring
    model.scene.rotation.z = rotation[2];
  });

  return (
    <mesh ref={objectRef}>
      <primitive
        object={model.scene}
        scale={scale}
        position={position}
      />
    </mesh>
  );
}

export default Model;
