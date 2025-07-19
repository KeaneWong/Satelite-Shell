import {type StarListType, starMap} from "./StarList.ts"
import {useRef, useEffect, Fragment, useMemo} from 'react'
import * as THREE from 'three'


interface LineProps {
    start: [number, number, number],
    end: [number, number, number]
}

const Line = ({start, end}: LineProps) => {
    const ref = useRef(null)
    // useEffect(() => {
    //     if (ref.current !== null)
    //         ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
    // }, [start[0], start[1], start[2], end[0], end[1], end[2]])
    const lineGeom = useMemo(() => {
        const points = []
        points.push(new THREE.Vector3(start[0], start[1], start[2]))
        points.push(new THREE.Vector3(end[0], end[1], end[2]))
        return new THREE.BufferGeometry().setFromPoints(points)
    }, [start[0], start[1], start[2], end[0], end[1], end[2]])

    return (
        <line ref={ref}>
            <bufferGeometry attach="geometry" {...lineGeom} />
            <lineBasicMaterial
                attach='material'
                               color="white"
                opacity={0.3}
                transparent
                fog
            />
        </line>
    )
}

export interface ConstellationLinesProps {
    positionY: number,
    adjustedStarList: StarListType
}

export const ConstellationLines = ({
                                       positionY,
                                       adjustedStarList,
                                   }: ConstellationLinesProps) => {
    return (
        <>
            {
                Object.entries(starMap).map(([constName, pairList]) => {
                    return (
                        <Fragment key={constName}>
                            {
                                pairList.map((pair) => {
                                    return (
                                        <mesh
                                            key={pair[0] + pair[1]}
                                        >
                                            <lineBasicMaterial
                                                color={0xffffff}
                                                opacity={0.5}
                                            />
                                            <Line
                                                // each pair is start, end mapped
                                                // to the star list.
                                                start={[
                                                    adjustedStarList[pair[0]].x,
                                                    positionY,
                                                    adjustedStarList[pair[0]].y,
                                                ]}
                                                end={[
                                                    adjustedStarList[pair[1]].x,
                                                    positionY,
                                                    adjustedStarList[pair[1]].y,
                                                ]}
                                            />
                                        </mesh>
                                    )
                                })
                            }
                        </Fragment>
                    )
                })
            }
        </>
    )
}