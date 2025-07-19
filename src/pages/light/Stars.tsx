import {starList, type StarListType, starMap, type StarType} from "./StarList.ts"
import {Star} from "./Star.tsx";
import {ConstellationLines} from "./ConstellationLines.tsx";
import {useMemo} from "react";
import {transitionEnabledOnThisPage} from "astro:transitions/client";

export interface StarsProps {
    // position: [number, number, number]
    positionY: number;
    offsets: [number, number, number]
}


const WORLD_LOWER_BOUND_X = -600
const WORLD_UPPER_BOUND_X = 700
const WORLD_LOWER_BOUND_Y = -300
const WORLD_UPPER_BOUND_Y = 350

const ORIGINAL_X_SCALE = 230;
const ORIGINAL_Y_SCALE = 170;

const yWorldAxis: number = WORLD_UPPER_BOUND_Y - WORLD_LOWER_BOUND_Y;
const xWorldAxis: number = WORLD_UPPER_BOUND_X - WORLD_LOWER_BOUND_X;

const yFactor: number = yWorldAxis / ORIGINAL_Y_SCALE;
const xFactor: number = xWorldAxis / ORIGINAL_X_SCALE;

// Assumes x and y are 0 indexed and start
// from top left (no negative numbers) like
// most images have pixels scaled.
const ScaleCoords = (x: number, y: number): [number, number] => {

    const adjustedY: number = WORLD_UPPER_BOUND_Y - (y * yFactor);
    const adjustedX: number = WORLD_LOWER_BOUND_X + (x * xFactor);
    return [adjustedX, adjustedY];
}


export const Stars = ({
                          positionY,
    offsets
                      }: StarsProps) => {
    console.log(yFactor)
    console.log(xFactor)
    const adjustedStarList: StarListType = useMemo(() => {
        const tempStarList = JSON.parse(JSON.stringify(starList));
        for (const [key, starr] of  Object.entries(tempStarList)) {
            const adjustedxz = ScaleCoords(starr.x, starr.y)
            tempStarList[key].x = adjustedxz[0] + offsets[0]
            tempStarList[key].y = adjustedxz[1] + offsets[2]
        }
        return tempStarList
    }, [starList, ORIGINAL_X_SCALE, ORIGINAL_Y_SCALE, yWorldAxis, xWorldAxis]);
    return (
        <>
            {
                 Object.entries(adjustedStarList).map(([key, starr]) => {
                    // const adjustedXZ = ScaleCoords(starr.x, starr.y)
                    // YEs I know it says xz while the coordinates say xy. The
                    // program is actually looking up so the plane is xz, not xy.
                    // Apologies to future keane/maintainers.
                    return (
                        <Star
                            key={key}
                            position={
                                [
                                    starr.x,
                                    positionY + offsets[1],
                                    starr.y
                                    // adjustedXZ[0] + offsets[0],
                                    // positionY + offsets[1],
                                    // adjustedXZ[1] + offsets[2],
                                ]
                            }
                        />
                    )
                })
                // Object.entries(starList).map(([key, starr]) => {
                //     const adjustedXZ = ScaleCoords(starr.x, starr.y)
                //     // YEs I know it says xz while the coordinates say xy. The
                //     // program is actually looking up so the plane is xz, not xy.
                //     // Apologies to future keane/maintainers.
                //     return (
                //         <Star
                //             key={key}
                //             position={
                //                 [
                //                     adjustedXZ[0] + offsets[0],
                //                     positionY + offsets[1],
                //                     adjustedXZ[1] + offsets[2],
                //                 ]
                //             }
                //         />
                //     )
                // })
            }
            <ConstellationLines
                positionY={positionY}
                adjustedStarList={adjustedStarList}
            />


        </>
    )
}