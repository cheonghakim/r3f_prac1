import { useEffect, useRef } from "react";
import * as Three from "three";
import { useTexture } from "@react-three/drei";

export default function Materials() {
  const groupRef: any = useRef(null);
  const meshRef: any = useRef(null);

  const matcap1 = useTexture("/imgs/mat1.png");

  // 그레디언트 맵 이미지 필요
  // const gradient = useTexture("/imgs/grad.png");
  // gradient.minFilter = Three.NearestFilter
  // gradient.magFilter = Three.NearestFilter

  useEffect(() => {
    const meshLength = groupRef.current!.children.length;
    for (let i = 0; i < meshLength; i++) {
      const mesh = groupRef.current!.children[i] as Three.Mesh;
      mesh.geometry = meshRef.current!.geometry;
      mesh.position.x = (i % (meshLength / 2)) * 2 - 4;
      mesh.position.z = 0;
      if (i >= meshLength / 2) {
        mesh.position.z = 2;
      }
    }
  });

  return (
    <>
      <directionalLight position={[5, 5, 5]}></directionalLight>
      {/* 색상, 시작지점, 끝지점 */}
      {/* <fog attach={"fog"} args={["blue", 4, 3]}></fog> */}

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
          <meshBasicMaterial wireframe color="green"></meshBasicMaterial>
        </mesh>

        <mesh>
          <meshBasicMaterial color="orange"></meshBasicMaterial>
        </mesh>

        <mesh>
          <meshLambertMaterial
            // 메테리얼 자체에서 방출하는 빛의 색
            emissive={"yellow"}
          ></meshLambertMaterial>
        </mesh>

        <mesh>
          <meshPhongMaterial
            color="blue"
            emissive={"black"}
            // 반사광
            specular={"#fff"}
            shininess={40}
            // 각진 표현, 각이 살아 있는 금속에서 유용할듯
            flatShading={true}
          ></meshPhongMaterial>
        </mesh>

        <mesh>
          <meshNormalMaterial></meshNormalMaterial>
        </mesh>

        {/* PBR -> standardMaterial, physicalMaterial 정반사/난반사를 표현하여 거친느낌, 금속성을 표현*/}
        <mesh>
          <meshStandardMaterial
            color="blue"
            emissive={"black"}
            // 반사광
            roughness={0.1}
            metalness={0.3}
            // 각진 표현, 각이 살아 있는 금속에서 유용할듯
            flatShading={false}
          ></meshStandardMaterial>
        </mesh>

        <mesh>
          {/* 대부분 속성이 스탠다드와 비슷함 */}
          <meshPhysicalMaterial
            color="white"
            emissive={"black"}
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

        <mesh>
          {/* 카메라의 뎁스, 거리에 따라 다르게 보임 */}
          <meshDepthMaterial></meshDepthMaterial>
        </mesh>

        <mesh>
          <meshMatcapMaterial matcap={matcap1}></meshMatcapMaterial>
        </mesh>

        {/* 
        만화같은 느낌
        <mesh>
          <meshToonMaterial gradientMap={gradient}></meshToonMaterial>
        </mesh> */}
      </group>
    </>
  );
}
