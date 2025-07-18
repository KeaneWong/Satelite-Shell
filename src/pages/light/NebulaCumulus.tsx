import {useFrame} from "@react-three/fiber";
import {useEffect, useMemo, useRef} from "react";
import {Nebula} from "./Nebula.tsx";


export const CLOUD_NUMBER = 50;

export const NebulaCumulus = () => {


     const clouds = []
        for (let i = 0; i < CLOUD_NUMBER; i++) {
            clouds.push(
                Nebula({
                    key: i,
                position: [Math.random() * 800 - 400, 500, Math.random() * 500 - 500],
                rotation: [1.16, -0.12, Math.random() * 2 * Math.PI],
                    // ref: (el) => nebulaRef.current[i] = el,
            }))
        }
        // return tempClouds;



    return (
        <>{clouds}</>
    )
}