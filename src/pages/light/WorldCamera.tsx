import { useThree } from "@react-three/fiber";
import {useEffect} from "react";

export const WorldCamera = ()=>{
    const {camera} = useThree()
    useEffect(()=>{
        camera.position.set(0,0,1)
        camera.rotation.set(1.16, -0.12, 0.27)
    },[camera])
    return null
}