import {ShootingStar} from "./ShootingStar.tsx";
import {useMemo} from "react";

export interface ShootingStarsProps {
    count: number,
    // startArea: [number, number, number],
    // endArea: [number, number, number],
    areas: Array<[number, number, number]>,
    variance: number,
    baseSpeed: number,
    speedVariance: number,
    delayVariance?: number
}

// Too lazy to do multidimensional variance lol just using one value for now.

export const ShootingStars = ({
                                  count,
                                  // startArea,
                                  // endArea,
                                  areas,
                                  variance,
                                  baseSpeed,
                                  speedVariance,
                                  delayVariance = 0
                              }: ShootingStarsProps) => {
    const pathsArray = useMemo(() => {
        const starPaths = []
        for (let i = 0; i < count; i++) {
            const posS = []
            for (const area of areas) {
                const pos = [
                    area[0] + ((Math.random() - .5) * variance),
                    area[1] + ((Math.random() - .5) * variance),
                    area[2] + ((Math.random() - .5) * variance),
                ]
                posS.push(pos)
            }
            // const startPos = [
            //     startArea[0] + ((Math.random() - .5) * variance),
            //     startArea[1] + ((Math.random() - .5) * variance),
            //     startArea[2] + ((Math.random() - .5) * variance),
            // ]
            // const endPos = [
            //     endArea[0] + ((Math.random() - .5) * variance),
            //     endArea[1] + ((Math.random() - .5) * variance),
            //     endArea[2] + ((Math.random() - .5) * variance),
            // ]
            // const middlePos = [
            //     ((endPos[0] + startPos[0]) / 2) + ((Math.random() - .5) * variance),
            //     ((endPos[1] + startPos[1]) / 2) + ((Math.random() - .5) * variance),
            //     ((endPos[2] + startPos[2]) / 2) + ((Math.random() - .5) * variance),
            // ]

            starPaths.push(
                {
                    // curvePositions: [startPos,
                    //     middlePos,
                    //     endPos,
                    // ],
                    curvePositions: posS,
                    speed: baseSpeed + ((Math.random() - .5) * speedVariance),
                    delay: (Math.random()) * delayVariance,
                }
            )
        }
        // console.log(starPaths)
        return starPaths
    }, [count])
    return (
        <>
            {
                pathsArray.map((arg, index) => {
                    return (
                        <ShootingStar
                            key={index}
                            curvePositions={arg.curvePositions}
                            speed={arg.speed}
                            delay={arg.delay}
                        />
                    )
                })
            }
        </>


    )
}