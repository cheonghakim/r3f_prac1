import * as Three from "three";

export default function Materials() {
  return (
    <>
      <directionalLight position={[5, 5, 5]}></directionalLight>
      {/* 색상, 시작지점, 끝지점 */}
      {/* <fog attach={"fog"} args={["blue", 4, 3]}></fog> */}
      <mesh>
        <boxGeometry></boxGeometry>
        <meshBasicMaterial wireframe color="red"></meshBasicMaterial>
      </mesh>

      <mesh position={[2, 0, 0]}>
        <planeGeometry></planeGeometry>
        <meshBasicMaterial
          color="red"
          // transparent가 true 일때만 opacity가 적용된다
          //   transparent={true}
          //   opacity={0.45}
          // opacity가 alphaTest보다 낮을 때 메쉬가 안보이게 된다
          //   alphaTest={0.5}

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

      <mesh position={[4, 0, 0]}>
        <boxGeometry></boxGeometry>
        <meshBasicMaterial color="red"></meshBasicMaterial>
      </mesh>

      <mesh position={[0, 0, 5]}>
        <sphereGeometry></sphereGeometry>
        <meshLambertMaterial
          // 메테리얼 자체에서 방출하는 빛의 색
          emissive={"yellow"}
        ></meshLambertMaterial>
      </mesh>

      <mesh position={[3, 0, 5]}>
        <sphereGeometry></sphereGeometry>
        <meshPhongMaterial></meshPhongMaterial>
      </mesh>
    </>
  );
}
