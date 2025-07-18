import {useFrame, useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";
import SmokePNG from "../../assets/smoke.png";
import React, {useRef} from "react";


export const Nebula =  ({
    ...rest
                       })=> {

    const tex = useLoader(TextureLoader, SmokePNG.src);
    const nebulaRef = useRef(null);
    useFrame(()=>{
        if (nebulaRef.current){
            nebulaRef.current.rotation.z -= 0.001;
        }
    })
    return (
        <mesh
            {...rest}
            ref={nebulaRef}
        >
            <planeGeometry args={[500,500]}/>
            <meshLambertMaterial
                map={tex}
                transparent={true}
                opacity={0.5}
            />
        </mesh>
    )
}
