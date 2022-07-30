import React, {
  useState, Suspense, useRef, useEffect,
} from 'react';
import { Text } from '@react-three/drei';
import { MeshLambertMaterial } from 'three';
import * as THREE from 'three';
import * as d3 from 'd3';
import {
  Col,
  Container, Image, ModalTitle, Row,
} from 'react-bootstrap';
import { useFrame, useThree } from '@react-three/fiber';
import ReactSpeedometer from 'react-d3-speedometer';
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
  cameraFeedSrc: string | undefined,
  status: string,
}

function Person({
  name, currentAnimation, scale, position, rotation, animationFilePaths, setModalData, cameraFeedSrc, status,
}: PersonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef<any>();
  const { camera } = useThree();

  const statusColors: any = {
    good: 'green',
    bad: 'red',
  };

  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  });

  return (
    <group>
      <group
        position={[position[0], position[1] + 2.3, position[2]]}
        quaternion={[0, 0, 0, 0]}
        ref={textRef}
      >
        <mesh position={[0, 0, -0.11]}>
          <planeBufferGeometry attach="geometry" args={[1.33, 0.38]} />
          <meshPhongMaterial attach="material" color="black" />
        </mesh>
        <mesh position={[0, 0, -0.1]}>
          <planeBufferGeometry attach="geometry" args={[1.3, 0.35]} />
          <meshPhongMaterial attach="material" color="white" />
        </mesh>
        <mesh position={[0.5, 0, 0]}>
          <sphereBufferGeometry attach="geometry" args={[0.1, 16, 16]} />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*
          // @ts-ignore */}
          <meshPhongMaterial attach="material" color={`${statusColors[status]}`} />
        </mesh>
        <Text
          scale={[1, 1, 1]}
          color="black"
          anchorX="center"
          anchorY="middle"
          fontSize={0.2}
        >
          {name}
        </Text>
      </group>
      <mesh
        position={[position[0], position[1] + 0.9, position[2]]}
        onClick={() => {
          setModalData({
            header: (
              <ModalTitle style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {name}
                <div style={{
                  marginLeft: '10px', borderRadius: '100%', width: '20px', height: '20px', backgroundColor: `${statusColors[status]}`,
                }}
                />
              </ModalTitle>
            ),
            body: (
              <div style={{ overflow: 'scroll' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={{
                    borderRadius: '10px', fontWeight: 'bold', marginTop: '10px', padding: '8px', position: 'absolute', color: 'white', backgroundColor: 'red',
                  }}
                  >
                    LIVE
                  </p>
                  <Image fluid srcSet={cameraFeedSrc} />
                </div>
                <Container fluid="xl" style={{ marginTop: '20px' }}>
                  <Row className="justify-content-md-center">
                    <Col className="justify-content-md-center">
                      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Direction</p>
                      <p style={{
                        textAlign: 'center', fontWeight: 'bold', fontSize: '30px',
                      }}
                      >
                        281° W
                      </p>
                    </Col>
                    <Col className="justify-content-md-center">
                      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Carbon Monoxide Level (PPM)</p>
                      <div style={{ maxHeight: '180px', overflow: 'hidden' }}>
                        <ReactSpeedometer
                          width={300}
                          height={300}
                          value={Math.round(Math.random() * 1400)}
                          maxValue={1600}
                          customSegmentStops={[0, 35, 200, 800, 1600]}
                          segmentColors={['rgba(24,255,0,0.71)', 'rgba(255,233,32,0.97)', '#ff9311', '#ff0202']}
                          needleColor="black"
                          customSegmentLabels={[
                            {
                              text: 'Okay',
                              position: 'OUTSIDE' as any,
                              color: 'black',
                            },
                            {
                              text: '',
                              position: 'OUTSIDE' as any,
                              color: 'black',
                            },
                            {
                              text: 'Bad',
                              position: 'OUTSIDE' as any,
                              color: 'black',
                            },
                            {
                              text: 'Very Bad',
                              position: 'OUTSIDE' as any,
                              color: 'black',
                            },
                          ]}
                        />
                      </div>
                    </Col>
                    <Col className="justify-content-md-center">
                      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Altitude</p>
                      <p style={{
                        textAlign: 'center', fontWeight: 'bold', fontSize: '30px',
                      }}
                      >
                        37.81 m
                      </p>
                      <div className="altitude-graph-container" />
                    </Col>
                  </Row>
                </Container>
              </div>
            ),
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
