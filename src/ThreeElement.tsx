import * as Three from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useControls } from "leva";

// rotation -> -일때 시계방향
// rotation -> +일때 반 시계방향
export default function ThreeElement() {
  // Canvas가 있는 컴포넌트에서는 사용불가
  // 윈도우 사이즈

  // console.log(gl, scene, camera)
  const boxRef = useRef<Three.Mesh>(null);
  const boxCopyRef = useRef<Three.Mesh>(null);

  // const {scene} = useThree()
  // Three.js 방법 -> r3f에서는 안씀
  // const geometry = new Three.BoxGeometry(1,1,1,);
  // const material = new Three.MeshBasicMaterial({color: 0x00ff00})
  // const mesh = new Three.Mesh(geometry, material)
  // scene.add(mesh)

  const { camera } = useThree();
  // useFrame((state, delta, xFrame) => {
  //   if (boxRef.current) {
  //     // boxRef.current.rotation.x += delta;
  //     // boxRef.current.position.x += delta;
  //     // boxRef.current.scale.z += delta;
  //     //   camera.position.x += delta;
  //   }
  // });

  const { rotation } = useControls({
    rotation: { value: 0, min: -360, max: 360, step: 1 },
  });

  const boxControl = useControls({
    width: { value: 1, min: 0.1, max: 10, step: 0.1 },
    height: { value: 1, min: 0.1, max: 10, step: 0.1 },
    depth: { value: 1, min: 0.1, max: 10, step: 0.1 },
    widthSegment: { value: 1, min: 0.1, max: 10, step: 1 },
    heightSegment: { value: 1, min: 0.1, max: 10, step: 1 },
    depthSegment: { value: 1, min: 0.1, max: 10, step: 1 },
  });

  const circleControl = useControls({
    radius: { value: 1, min: 0.1, max: 10, step: 0.1 },
    segments: { value: 32, min: 1, max: 100, step: 1 },
    thetaStart: { value: 0, min: 0, max: 360, step: 0.1 },
    thetaLength: { value: 360, min: 0, max: 360, step: 0.1 },
  });

  useEffect(() => {
    console.log(boxCopyRef.current);
    // if (boxCopyRef.current) {
    //   const newGeometry = new Three.BoxGeometry(
    //     boxControl.width,
    //     boxControl.height,
    //     boxControl.depth,
    //     boxControl.widthSegment,
    //     boxControl.heightSegment,
    //     boxControl.depthSegment
    //   );
    //   // Dispose the old geometry
    //   boxCopyRef.current.geometry.dispose();
    //   // Set the new geometry
    //   boxCopyRef.current.geometry = newGeometry;
    // }

    if (boxCopyRef.current)
      boxCopyRef.current.geometry = boxRef.current?.geometry as any;
  }, [
    boxControl.width,
    boxControl.height,
    boxControl.depth,
    boxControl.widthSegment,
    boxControl.heightSegment,
    boxControl.depthSegment,
  ]);

  return (
    <>
      <directionalLight position={[5, 5, 5]} />
      <group position={[0, 0, 0]}>
        {/* <mesh
          ref={boxRef}
          //   position={[0, 0, 0]}
          //   position-x={[2]}
          scale={[1, 1, 1]}
          rotation={[
            Three.MathUtils.degToRad(0),
            Three.MathUtils.degToRad(0),
            Three.MathUtils.degToRad(0),
          ]}
        >
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>

        <mesh
          ref={boxRef}
          position={[2, 0, 0]}
          //   position-x={[2]}
          scale={[1, 1, 1]}
          rotation={[
            Three.MathUtils.degToRad(0),
            Three.MathUtils.degToRad(0),
            Three.MathUtils.degToRad(0),
          ]}
        >
          <boxGeometry />
          <meshStandardMaterial color="blue" />
        </mesh> */}

        {/* <mesh ref={boxRef} position={[0, 0, 0]}>
          <boxGeometry
            args={[
              boxControl.width,
              boxControl.height,
              boxControl.depth,
              boxControl.widthSegment,
              boxControl.heightSegment,
              boxControl.depthSegment,
            ]}
          />
          <meshStandardMaterial wireframe />
        </mesh>

        <mesh ref={boxCopyRef}>
          <meshStandardMaterial color="green" />
        </mesh> */}
      </group>

      <mesh>
        <circleGeometry
          args={[
            circleControl.radius,
            circleControl.segments,
            Three.MathUtils.degToRad(circleControl.thetaStart),
            Three.MathUtils.degToRad(circleControl.thetaLength),
          ]}
        ></circleGeometry>
        <meshStandardMaterial color="purple"></meshStandardMaterial>
      </mesh>
    </>
  );
}
