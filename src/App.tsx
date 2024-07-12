// 문서 확인
// https://sbcode.net/react-three-fiber/orbit-controls/

import ThreeElements from "./ThreeElement";
import Materials from "./Materials";
import MaterialComparison from "./MaterialComparison";
import Light from "./Light";
import Interaction from "./Interaction";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { useControls, Leva } from "leva";

// <React.StrictMode> 모드에서는 콘솔이 두번 찍힘
function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { color } = useControls({
    color: { value: "#ffffff" },
  });

  const { segment } = useControls({
    segment: { value: 10, min: 2, max: 100, step: 1 },
  });

  return (
    <>
      <Canvas
        // 그림자 사용 옵션! 이게 true여야 그림자를 쓸 수 있다
        shadows={true}
        camera={{
          near: 1,
          far: 100,
          fov: 75,
          position: [5, 5, 5],
        }}
        style={{ width: windowSize.width, height: windowSize.height }}
      >
        <color attach="background" args={["black"]} />

        {/* 그리드 크기(기본적으로 m 단위), 세그먼트(크기/세그먼트), 그리드 센터 색상, 전체 그리드 색 */}
        <gridHelper args={[20, segment, 0xff0000, "teal"]} />
        <axesHelper args={[5]} />

        {/* 
          옆으로 회전 제한
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          위아래 회전 제한
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}   
        */}
        <OrbitControls />
        {/* <ThreeElements /> */}
        {/* <Materials /> */}
        {/* <MaterialComparison /> */}
        {/* <Light></Light> */}
        <Interaction />
      </Canvas>
    </>
  );
}

export default App;
