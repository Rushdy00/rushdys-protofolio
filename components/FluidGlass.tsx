/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useRef, useState, useEffect, memo, ReactNode, useCallback, useMemo } from "react";
import {
  Canvas,
  createPortal,
  useFrame,
  useThree,
  ThreeElements,
} from "@react-three/fiber";
import {
  useFBO,
  useGLTF,
  useScroll,
  Image,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import { easing } from "maath";

type Mode = "lens" | "bar" | "cube";

interface NavItem {
  label: string;
  link: string;
}

type ModeProps = Record<string, unknown>;

interface FluidGlassProps {
  mode?: Mode;
  lensProps?: ModeProps;
  barProps?: ModeProps;
  cubeProps?: ModeProps;
}

export default function FluidGlass({
  mode = "lens",
  lensProps = {},
  barProps = {},
  cubeProps = {},
}: FluidGlassProps) {
  const Wrapper = mode === "bar" ? Bar : mode === "cube" ? Cube : Lens;
  const rawOverrides =
    mode === "bar" ? barProps : mode === "cube" ? cubeProps : lensProps;

  const {
    navItems = [
      { label: "Home", link: "" },
      { label: "About", link: "" },
      { label: "Contact", link: "" },
    ],
    ...modeProps
  } = rawOverrides;

  return (
    <Canvas 
      camera={{ position: [0, 0, 20], fov: 15 }} 
      gl={{ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true
      }}
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={["#000000"]} />
      <ScrollControls damping={0.3} pages={2} distance={0.4}>
        {mode === "bar" && <NavItems items={navItems as NavItem[]} />}
        <Wrapper modeProps={modeProps}>
          <Scroll>
            <Typography />
            <Images />
          </Scroll>
          <Scroll html />
          <Preload />
        </Wrapper>
      </ScrollControls>
    </Canvas>
  );
}

type MeshProps = ThreeElements["mesh"];

interface ModeWrapperProps extends MeshProps {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
}

interface ZoomMaterial extends THREE.Material {
  zoom: number;
}

interface ZoomMesh extends THREE.Mesh<THREE.BufferGeometry, ZoomMaterial> {}

type ZoomGroup = THREE.Group & { children: ZoomMesh[] };

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());
  const geoWidthRef = useRef<number>(1);

  useEffect(() => {
    const geo = (nodes[geometryKey] as THREE.Mesh)?.geometry;
    if (geo) {
      geo.computeBoundingBox();
      geoWidthRef.current = geo.boundingBox!.max.x - geo.boundingBox!.min.x || 1;
    } else {
      // Fallback to first available geometry
      const firstMesh = Object.values(nodes).find(node => (node as THREE.Mesh).geometry) as THREE.Mesh;
      if (firstMesh) {
        const fallbackGeo = firstMesh.geometry;
        fallbackGeo.computeBoundingBox();
        geoWidthRef.current = fallbackGeo.boundingBox!.max.x - fallbackGeo.boundingBox!.min.x || 1;
      }
    }
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    
    // Cache viewport calculation
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
        ? (pointer.y * v.height) / 2
        : 0;
    
    // Use lighter easing for better performance
    easing.damp3(ref.current.position, [destX, destY, 15], 0.25, delta);

    // Only calculate scale if not provided and cache the result
    if ((modeProps as { scale?: number }).scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      const newScale = Math.min(0.15, desired);
      if (Math.abs(ref.current.scale.x - newScale) > 0.001) {
        ref.current.scale.setScalar(newScale);
      }
    }

    // Optimize FBO rendering
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps as {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: unknown;
  };

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={(nodes[geometryKey] as THREE.Mesh)?.geometry || (Object.values(nodes).find(node => (node as THREE.Mesh).geometry) as THREE.Mesh)?.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.02}
          {...(typeof extraMat === "object" && extraMat !== null
            ? extraMat
            : {})}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
  return (
    <ModeWrapper
      glb="/assets/3d/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
      {...p}
    />
  );
}

function Cube({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
  return (
    <ModeWrapper
      glb="/assets/3d/cube.glb"
      geometryKey="Cube"
      followPointer
      modeProps={modeProps}
      {...p}
    />
  );
}

function Bar({ modeProps = {}, ...p }: { modeProps?: ModeProps } & MeshProps) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: "#ffffff",
    attenuationColor: "#ffffff",
    attenuationDistance: 0.25,
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Object_2"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

function NavItems({ items }: { items: NavItem[] }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const DEVICE = useMemo(() => ({
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 },
  }), []);

  const getDevice = useCallback(() => {
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max
      ? "mobile"
      : w <= DEVICE.tablet.max
        ? "tablet"
        : "desktop";
  }, [DEVICE]);

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [getDevice]);

  const { spacing, fontSize } = useMemo(() => DEVICE[device], [DEVICE, device]);

  // Cache viewport calculation
  const lastViewport = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
  
  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    
    // Only update if viewport significantly changed
    if (Math.abs(v.height - lastViewport.current.height) > 0.01) {
      group.current.position.set(0, -v.height / 2 + 0.2, 15.1);
      lastViewport.current = { width: v.width, height: v.height };
    }

    group.current.children.forEach((child, i) => {
      const targetX = (i - (items.length - 1) / 2) * spacing;
      if (Math.abs(child.position.x - targetX) > 0.001) {
        child.position.x = targetX;
      }
    });
  });

  const handleNavigate = useCallback((link: string) => {
    if (!link) return;
    link.startsWith("#")
      ? (window.location.hash = link)
      : (window.location.href = link);
  }, []);

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Gathenia.otf"
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          renderOrder={10}
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "auto")}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function Images() {
  const group = useRef<ZoomGroup>(null!);
  const data = useScroll();
  const { height } = useThree((s) => s.viewport);
  
  // Cache previous zoom values to avoid unnecessary updates
  const lastZoomValues = useRef<number[]>([1, 1, 1, 1, 1]);

  useFrame(() => {
    if (!group.current?.children || !data) return;
    
    // Calculate zoom values once
    const zoom1 = 1 + data.range(0, 1 / 3) / 3;
    const zoom2 = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    
    const newZoomValues = [zoom1, zoom1, zoom2, zoom2, zoom2];
    
    // Only update if zoom values changed significantly
    newZoomValues.forEach((zoom, i) => {
      const child = group.current.children[i] as ZoomMesh;
      if (child?.material && Math.abs(zoom - lastZoomValues.current[i]) > 0.001) {
        child.material.zoom = zoom;
        lastZoomValues.current[i] = zoom;
      }
    });
  });

  return (
    <group ref={group}>
      <Image
        position={[-2, 0, 0]}
        scale={[3, height / 1.1]}
        url="https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=300&auto=format&fit=crop&q=75"
      />
      <Image
        position={[2, 0, 3]}
        scale={3}
        url="https://images.unsplash.com/photo-1595001354022-29103be3b73a?w=400&h=300&auto=format&fit=crop&q=75"
      />
      <Image
        position={[-2.05, -height, 6]}
        scale={[1, 3]}
        url="https://images.unsplash.com/photo-1513682121497-80211f36a7d3?w=300&h=450&auto=format&fit=crop&q=75"
      />
      <Image
        position={[-0.6, -height, 9]}
        scale={[1, 2]}
        url="https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=300&h=400&auto=format&fit=crop&q=75"
      />
      <Image
        position={[0.75, -height, 10.5]}
        scale={1.5}
        url="https://images.unsplash.com/photo-1505069190533-da1c9af13346?w=300&h=300&auto=format&fit=crop&q=75"
      />
    </group>
  )
}

function Typography() {
  const DEVICE = useMemo(() => ({
    mobile: { fontSize: 0.2 },
    tablet: { fontSize: 0.4 },
    desktop: { fontSize: 0.7 },
  }), []);
  
  const getDevice = useCallback(() => {
    const w = window.innerWidth;
    return w <= 639 ? "mobile" : w <= 1023 ? "tablet" : "desktop";
  }, []);

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [getDevice]);

  const { fontSize } = useMemo(() => DEVICE[device], [DEVICE, device]);

  return (
    <Text
      position={[0, 0, 12]}
      font="/fonts/Gathenia.otf"
      fontSize={fontSize}
      letterSpacing={-0.05}
      outlineWidth={0}
      outlineBlur="20%"
      outlineColor="#000"
      outlineOpacity={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      React Bits
    </Text>
  );
} 