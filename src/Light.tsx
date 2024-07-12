import { useEffect, useRef } from "react";
import * as Three from "three";
import { Environment, useHelper } from "@react-three/drei";

export default function Light() {
  const groupRef: any = useRef(null);
  const meshRef: any = useRef(null);
  const dLightRef: any = useRef(null);
  const sLight: any = useRef(null);

  useHelper(dLightRef, Three.DirectionalLightHelper);
  useHelper(sLight, Three.SpotLightHelper);

  useEffect(() => {
    const meshLength = groupRef.current!.children.length;
    for (let i = 0; i < meshLength; i++) {
      const mesh = groupRef.current!.children[i] as Three.Mesh;
      mesh.geometry = meshRef.current!.geometry;
      mesh.position.x = (i % (meshLength / 2)) * 2 - 2;
      mesh.position.z = 0;
      if (i >= meshLength / 2) {
        mesh.position.z = 2;
      }
    }
  });

  return (
    <>
      {/* <directionalLight
        color={"fff"}
        castShadow={true}
        shadow-camera-top={10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-mapSize={[1024, 1024]}
        position={[0, 5, 0]}
        intensity={5}
        target-position={[0, 0, 2]}
      ></directionalLight> */}

      {/* 주변광, 간접광, intensity를 낮게 */}
      {/* <ambientLight color={"blue"} intensity={0.3}></ambientLight> */}

      {/* 돔라이트(주변광, 간접광) 하늘색/지면색/빛세기  */}
      {/* <hemisphereLight args={["blue", "yellow", 4]}></hemisphereLight> */}

      {/* 직사광선, 방향이 있는 빛 */}
      {/* <directionalLight
        ref={dLightRef}
        position={[5, 5, 5]}
        target-position={[4, 4, 4]}
      ></directionalLight> */}

      {/* 한 포인트에서 사방으로 퍼지는 빛(전구) */}
      {/* <pointLight
        color={"fff"}
        position={[0, 0, 2]}
        intensity={20}
        distance={20}
        castShadow
      ></pointLight> */}

      {/* 핀조명(집중조명/무대조명) */}
      {/* <spotLight
        ref={sLight}
        position={[0, 10, 0]}
        intensity={200}
        // 빛의 범위
        angle={Three.MathUtils.degToRad(50)}
        // 빛의 감쇠율
        penumbra={0.4}
      ></spotLight>

      <Environment
        blur={0.5}
        background={true}
        files={"/imgs/hdr.hdr"}
      ></Environment> */}

      <mesh
        rotation-x={Three.MathUtils.degToRad(-90)}
        position-y={-1}
        // 그림자를 받음 -> 위치를 기억하자!. 이게 없으면 그림자가 안생김
        receiveShadow
      >
        <planeGeometry args={[15, 15]}></planeGeometry>
        <meshStandardMaterial
          color="gray"
          side={Three.DoubleSide}
        ></meshStandardMaterial>
      </mesh>

      <mesh position={[0, 0, 0]} ref={meshRef}>
        <torusKnotGeometry args={[0.5, 0.2]}></torusKnotGeometry>
        <meshBasicMaterial
          color="red"
          visible={false}
          // 노말값이 [-1, 1] 영역중 어디를 렌더할건지, 둘다도 가능
          side={Three.FrontSide}
          // depthTest가 false일때 피사체가 다른 피사체에 가려지는 것이 해제됨
          depthTest={false}
          // depthWrite false일때 z-index 무시
          depthWrite={false}
          // fog가 씬에 있을 때 사용 가능
          fog={false}
        ></meshBasicMaterial>
      </mesh>

      <group ref={groupRef}>
        <mesh>
          <meshLambertMaterial

          // 메테리얼 자체에서 방출하는 빛의 색
          ></meshLambertMaterial>
        </mesh>

        <mesh
          // 이 메쉬에 의해 그림자를 생성
          castShadow
          // 자기 자신의 그림자도 생성
          receiveShadow
        >
          <meshPhongMaterial
            color="blue"
            // 반사광
            specular={"#fff"}
            shininess={40}
            // 각진 표현, 각이 살아 있는 금속에서 유용할듯
            flatShading={true}
          ></meshPhongMaterial>
        </mesh>

        {/* PBR -> standardMaterial, physicalMaterial 정반사/난반사를 표현하여 거친느낌, 금속성을 표현*/}
        <mesh castShadow receiveShadow>
          <meshStandardMaterial
            color="blue"
            // 반사광
            roughness={0.1}
            metalness={0.3}
            // 각진 표현, 각이 살아 있는 금속에서 유용할듯
            flatShading={false}
          ></meshStandardMaterial>
        </mesh>

        <mesh castShadow receiveShadow>
          {/* 대부분 속성이 스탠다드와 비슷함 */}
          <meshPhysicalMaterial
            color="white"
            // 반사광
            roughness={1}
            metalness={0}
            // 각진 표현, 각이 살아 있는 금속에서 유용할듯
            flatShading={false}
            // 코팅한 느낌,
            clearcoat={1}
            clearcoatRoughness={0}
            // 유리같은 느낌을 내는 속성
            transparent={true}
            transmission={1}
            thickness={0.2}
            // 굴절율
            ior={2.3}
          ></meshPhysicalMaterial>
        </mesh>
      </group>
    </>
  );
}
