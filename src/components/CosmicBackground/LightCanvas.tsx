import {Canvas,} from "@react-three/fiber";
import {WorldCamera} from "./WorldCamera.tsx";
import {NebulaCumulus} from "./NebulaCumulus.tsx";
import {Stars} from "./Stars.tsx";
import {BloomComposer} from "./BloomComposer.tsx";

export const FOG_COLOR = 0x222222;


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

            <pointLight // voidlight
                args={[0x7F00FF, 80000, 450, 1.6]}

                position={[-250, 200, -400]}

            />
            <pointLight // corrupted investiture
                args={[0xD8547e, 90000, 450, 1.9]}

                position={[0, 200, -200]}

            />
            <pointLight // stormlight
                args={[0x3677ac, 650000, 450, 1.7]}

                position={[250, 200, 100]}
            />

            <Stars
                positionY={400}
                offsets={[0, 0, -300]}
            />

            <WorldCamera/>
            <ambientLight color={FOG_COLOR}></ambientLight>

            <fogExp2 args={[0x035443, 0.001]}/>
            <BloomComposer/>

        </Canvas>
    )
}