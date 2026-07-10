import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Full-viewport plane running a custom GLSL shader: layered simplex
// noise drifts slowly and warps toward the cursor, tinted with the
// site's accent color. Sits far behind the knot as atmospheric depth.
const NOISE_GLSL = /* glsl */ `
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
`;

const ShaderBackdrop = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uInk: { value: new THREE.Color("#0B0B0E") },
      uAccent: { value: new THREE.Color("#D9FF3D") },
    }),
    [],
  );

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value = state.clock.getElapsedTime();
    // Ease the mouse uniform so the glow trails the cursor
    const mouse = material.uniforms.uMouse.value as THREE.Vector2;
    mouse.x = THREE.MathUtils.lerp(mouse.x, state.pointer.x, 0.03);
    mouse.y = THREE.MathUtils.lerp(mouse.y, state.pointer.y, 0.03);
  });

  return (
    <mesh position={[0, 0, -3]} scale={[viewport.width * 2.2, viewport.height * 2.2, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={/* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec3 uInk;
          uniform vec3 uAccent;
          varying vec2 vUv;

          ${NOISE_GLSL}

          void main() {
            vec2 uv = vUv - 0.5;

            // Two octaves of drifting noise, second warped by the first
            float n1 = snoise(uv * 2.4 + uTime * 0.05);
            float n2 = snoise(uv * 4.5 - uTime * 0.04 + n1 * 0.6);
            float field = n1 * 0.65 + n2 * 0.35;

            // Soft glow that follows the (eased) cursor
            float mouseGlow = 1.0 - smoothstep(0.0, 0.55, distance(uv, uMouse * 0.5));

            // Accent tint only where noise ridges + cursor glow overlap
            float tint = smoothstep(0.35, 0.9, field) * 0.05
                       + mouseGlow * smoothstep(0.1, 0.8, field) * 0.09;

            vec3 color = mix(uInk, uAccent, tint);

            // Vignette keeps the edges of the hero dark
            float vignette = 1.0 - smoothstep(0.25, 0.75, length(uv));
            float alpha = (0.55 + mouseGlow * 0.25) * vignette;

            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
};

// Wireframe knot that slowly turns and leans toward the cursor
const WireKnot = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.getElapsedTime();
    mesh.rotation.x = t * 0.12;
    mesh.rotation.y = t * 0.18;
    // Mouse parallax - the whole knot leans toward the pointer
    mesh.position.x = THREE.MathUtils.lerp(
      mesh.position.x,
      state.pointer.x * 0.6,
      0.04,
    );
    mesh.position.y = THREE.MathUtils.lerp(
      mesh.position.y,
      state.pointer.y * 0.4,
      0.04,
    );
  });

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={1.55}>
        <torusKnotGeometry args={[1, 0.28, 220, 24, 2, 3]} />
        <meshBasicMaterial
          color="#D9FF3D"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>
    </Float>
  );
};

// Sparse dust field drifting behind the knot
const DustField = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 600; i++) {
      temp.push(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 14,
      );
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    points.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#EDEDE6" transparent opacity={0.45} />
    </points>
  );
};

const Hero3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ShaderBackdrop />
        <WireKnot />
        <DustField />
      </Canvas>
    </div>
  );
};

export default Hero3D;
