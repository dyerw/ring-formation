import React, { useState, useRef } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import frag from './shaders/frag.glsl';
import vert from './shaders/vert.glsl';
import { Color } from 'three';

interface AppProps {}

function Box(props: JSX.IntrinsicElements['mesh'] & { color: Color }) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  console.log(props.color);
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={[1, 32, 16]} />
      <shaderMaterial
        uniforms={{
          uColor: { value: props.color },
        }}
        vertexShader={vert}
        fragmentShader={frag}
      />
    </mesh>
  );
}

function App({}: AppProps) {
  const [color, setColor] = useState<Color>(
    new Color(100 / 255, 100 / 255, 100 / 255),
  );

  const setColorChannel = (v: string, c: 'r' | 'g' | 'b') => {
    const n = parseInt(v);
    if (isNaN(n)) {
      return;
    }
    const newColor = new Color().copy(color);
    newColor[c] = n / 255;
    setColor(newColor);
  };

  return (
    <div className="w-screen h-screen">
      <Canvas className="w-max h-max">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box color={color} position={[-1.5, 0, 0]} />
        <Box color={color} position={[1.5, 0, 0]} />
      </Canvas>
      <input
        type="range"
        max="255"
        value={color.r * 255}
        onChange={(e) => setColorChannel(e.target.value, 'r')}
        className="range"
      />
      <input
        type="range"
        max="255"
        onChange={(e) => setColorChannel(e.target.value, 'g')}
        value={color.g * 255}
        className="range"
      />
      <input
        type="range"
        max="255"
        onChange={(e) => setColorChannel(e.target.value, 'b')}
        value={color.b * 255}
        className="range"
      />
    </div>
  );
}

export default App;
