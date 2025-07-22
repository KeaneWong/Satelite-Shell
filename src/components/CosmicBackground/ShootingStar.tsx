import * as THREE from 'three'
import {useEffect, useRef, useState} from 'react'
import {useFrame} from '@react-three/fiber'
import {Trail} from '@react-three/drei'
import {Flow} from 'three/examples/jsm/modifiers/CurveModifier.js';
import {CatmullRomCurve3} from "three/src/extras/curves/CatmullRomCurve3";

// import { EffectComposer, Bloom } from '@react-three/postprocessing'

interface ShootingStarInterface {
    curvePositions: Array<[number, number, number]>;
    speed: number,
    delay: number,
}

export const ShootingStar = ({
                                 curvePositions,
                                 speed,
                                 delay
                             }: ShootingStarInterface) => {
    const ref = useRef(null)
    const curveRef = useRef<CatmullRomCurve3 | null>(null)
    useEffect(() => {
        curveRef.current = new THREE.CatmullRomCurve3(curvePositions.map(
            (arr) => new THREE.Vector3(...arr))
        )
        curveRef.current.curveType = 'centripetal' +
            ''



    }, [curvePositions])
    const progressRef = useRef<number>(0);
    useFrame((state, delta) => {
        try {

            if (state.clock.elapsedTime < delay) {
                return
            }
            progressRef.current += delta * speed;
            if (progressRef.current < 1 &&
                ref.current !== null &&
                curveRef.current !== null) {
                ref.current.position.copy(
                    curveRef.current.getPointAt(progressRef.current)
                )
            } else if (progressRef.current > 1 &&
                ref.current !== null &&
                curveRef.current !== null) {
                // ref.current.position.copy(
                //     new THREE.Vector3(...curvePositions[0])
                // )

                progressRef.current = 0;

            }
        } catch (e) {
            console.log(e)
        }


    })

    return (
        <Trail
            width={5}
            length={8}
            color={new THREE.Color(2, 1, 10)}
            attenuation={(t) => t * t}
        >
            <mesh ref={ref} position={curvePositions[0]}>
                <icosahedronGeometry args={[.5]}/>
                <meshBasicMaterial color={[10, 1, 10]} toneMapped={false}/>
            </mesh>
        </Trail>
    )
}
