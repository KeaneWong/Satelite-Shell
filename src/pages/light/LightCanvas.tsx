import {Canvas,} from "@react-three/fiber";
import {WorldCamera} from "./WorldCamera.tsx";
import {NebulaCumulus} from "./NebulaCumulus.tsx";

export const FOG_COLOR = 0x555555;
export const LightCanvas = () => {


    return (
        <Canvas
            onCreated={({gl}) => {
                gl.setClearColor(FOG_COLOR)
                gl.setSize(window.innerWidth, window.innerHeight);
            }}
        >
            <NebulaCumulus/>

            <perspectiveCamera
                makeDefault
                args={[
                    60,
                    window.innerWidth / window.innerHeight,
                    1,
                    1000
                ]}
                position={[0, 0, 1]}
                rotation={[1.16, -0.12, 0.27]}
            />
            <directionalLight
                color={0xff8c19}
                position={[0, 0, 1]}
            />

            <pointLight // orange light
                args={[0xcc6600, 80000, 450, 1.7]}
                // color={0xcc6600}
                // intensity={50}
                // distance={450}
                // decay={1.7}
                position={[200, 300, 0]}
            />
            <pointLight // red light
                args={[0xD8547e, 80000, 450, 1.7]}
                // color={0xd8547e}
                // intensity={50}
                // distance={450}
                // decay={1.7}
                position={[-100, 400, 0]}
            />
            <pointLight // blue light
                args={[0x3677ac, 500000, 450, 1.6]}
                // color={0x3677ac}
                // intensity={50}
                // distance={450}
                // decay={1.7}
                position={[300, 200, 0]}
            />


            <WorldCamera/>
            <ambientLight color={FOG_COLOR}></ambientLight>

            <fogExp2 args={[0x035443, 0.001]}/>

        </Canvas>
    )
}