import {useMemo} from "react";
import * as THREE from "three";
import {LineCurve3} from "three";

export interface LightTrailProps {
    start: [number, number, number],
    end: [number, number, number],
}
export const LightTrail = ({
    start,
    end
                           }:LightTrailProps)=>{
    const interim = []
    // const pathPoints = [start, ...interim, end]
    const path = useMemo(() => {
        // return new THREE.Curve(pathPoints)
        const curvePath  = new THREE.CurvePath(

        )
        curvePath.add(new LineCurve3(
            new THREE.Vector3(start[0], start[1], start[2]),
            new THREE.Vector3(end[0], end[1], end[2])
        ))
        return curvePath
    },[start[0], start[1], start[2], end[0], end[1], end[2]])
    return(
        <mesh>
            <tubeGeometry args={[path, 20, 2, 8, false]}>

            </tubeGeometry>
            <meshStandardMaterial/>
        </mesh>
    )
}