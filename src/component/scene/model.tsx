import React from 'react';
import {
  GLTFLoader,
} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import {
  RootState, useFrame, useLoader,
} from '@react-three/fiber';

interface ModelProps {
  path: string,
  scale: Array<number>,
  position: Array<number>,
  rotation: Array<number>,
}

function Model({
  path, scale, position, rotation,
}: ModelProps): JSX.Element {
  const model = useLoader(
    GLTFLoader,
    path,
  );

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
  });

  model.scene.traverse((child: any) => {
    if (child.isMesh) {
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
    <primitive
      object={model.scene}
      scale={scale}
      position={position}
    />
  );
}

export default Model;
