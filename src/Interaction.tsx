import { useThree } from "@react-three/fiber";
import * as Three from "three";

export default function Interaction() {
  const { scene, camera, raycaster, pointer } = useThree();

  const onClick = (evt: any) => {
    // evt.stopPropagation() 으로 이벤트 버블링을 막을 수 있다.

    // evt.eventObject -> 콜백함수를 달고 있는 객체

    // 그룹에 이벤트를 걸면 evt.eventObject 만 바뀐다

    const mesh = evt.object;
    mesh.material.color = new Three.Color("green");
  };

  const groupClick = (evt: any) => {
    // raycaster를 특정 카메라로 부터 포인터 방향으로 만든다
    raycaster.setFromCamera(pointer, camera);

    // 광선에서 검사할 오브젝트의 부모 객체, 검사할 객체의 부모를 넣으면 된다. 두번째 인자는 child를 모두 검사할지 여부
    // 여기서 evt.eventObject를 넣으면 그룹 객체가 선택되어 하위 요소만 검사한다.
    const intersect = raycaster.intersectObject(evt.eventObject, true);

    if (intersect.length > 0) {
      const mesh = intersect[0].object as any;
      mesh.material.color = new Three.Color("red");
    }
  };

  return (
    <>
      <ambientLight></ambientLight>
      <directionalLight intensity={3}></directionalLight>

      <group onClick={groupClick}>
        <mesh
          //  onClick={onClick}
          position={[-2, 0, 0]}
        >
          <boxGeometry></boxGeometry>
          <meshStandardMaterial></meshStandardMaterial>
        </mesh>

        <mesh
        //  onClick={onClick}
        >
          <boxGeometry></boxGeometry>
          <meshStandardMaterial></meshStandardMaterial>
        </mesh>

        <mesh
          // onClick={onClick}
          position={[2, 0, 0]}
        >
          <boxGeometry></boxGeometry>
          <meshStandardMaterial></meshStandardMaterial>
        </mesh>
      </group>
    </>
  );
}
