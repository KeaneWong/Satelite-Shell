import {Canvas,} from "@react-three/fiber";
import {WorldCamera} from "./WorldCamera.tsx";
import {NebulaCumulus} from "./NebulaCumulus.tsx";
import {LightTrail} from "./LightTrail.tsx";

export const FOG_COLOR = 0x43444E;
export const LightCanvas = () => {


    return (
        <Canvas
            onCreated={({gl}) => {
                gl.setClearColor(FOG_COLOR)
                gl.setSize(window.innerWidth, window.innerHeight);
            }}
            // flat
            // linear
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

            {/*<pointLight // orange light*/}
            {/*    args={[0xcc6600, 20000, 450, 1.7]}*/}
            {/*    // color={0xcc6600}*/}
            {/*    // intensity={50}*/}
            {/*    // distance={450}*/}
            {/*    // decay={1.7}*/}
            {/*    position={[-100, 400, -300]}*/}
            {/*/>*/}
            <pointLight // voidlight
                args={[0x7F00FF, 80000, 450, 1.6]}
                // color={0xcc6600}
                // intensity={50}
                // distance={450}
                // decay={1.7}
                position={[-250, 200, -400]}

            />
            <pointLight // corrupted investiture
                args={[0xD8547e, 90000, 450, 1.9]}
                // color={0xd8547e}
                // intensity={50}
                // distance={450}
                // decay={1.7}
                position={[0, 200, -200]}

            />
            <pointLight // stormlight
                args={[0x3677ac, 700000, 450, 1.6]}
                // color={0x3677ac}
                // intensity={50}
                // distance={450}
                // decay={1.7}
                position={[250, 200, 100]}
            />
            <LightTrail
                start={[300, 200, 0]}
                end={[0, 0, 1]}
            />

            <WorldCamera/>
            <ambientLight color={FOG_COLOR}></ambientLight>

            <fogExp2 args={[0x035443, 0.001]}/>

        </Canvas>
    )
}