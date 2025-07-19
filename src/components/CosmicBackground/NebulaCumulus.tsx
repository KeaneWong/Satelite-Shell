import {useFrame} from "@react-three/fiber";
import {useEffect, useMemo, useRef, useState} from "react";
import {Nebula} from "./Nebula.tsx";

const PARALLAX = 2

export const CLOUD_NUMBER = 50;

export const NebulaCumulus = () => {
    const [rotateSpeedModifier, setRotateSpeedModifier] = useState<number>(0);
    const previousScrollPosRef = useRef<number>(
        window.scrollY || document.documentElement.scrollTop
    )
    useEffect(() => {
        const rotateChangeOnScroll = () => {
            const st = window.scrollY || document.documentElement.scrollTop;
            if (st > previousScrollPosRef.current) {
                // INCrease rotate speed when scroll down
                setRotateSpeedModifier(0.004)
            } else if (st < previousScrollPosRef.current) {
                // reverse scroll speed when scrolling up
                setRotateSpeedModifier(-.006)
            }

            previousScrollPosRef.current = st <= 0 ? 0 : st;
        }

        const resetScrollSpeed = () => {
            setRotateSpeedModifier(0)
        }

        document.addEventListener("scroll", rotateChangeOnScroll);
        document.addEventListener("scrollend", resetScrollSpeed);

        return () => {
            document.removeEventListener("scroll", rotateChangeOnScroll);
            document.removeEventListener("scrollend", resetScrollSpeed);
        }
    }, []);

    // NOTE: YOu have to memoize any random argument, otherwise
    // the clouds will rerender.
    const cloudArgs = useMemo(() => {
        const tempCloudArgs = []
        for (let i = 0; i < CLOUD_NUMBER; i++) {
            tempCloudArgs.push(
                {
                    position: [
                        Math.random() * 1000 - 500,
                        500,
                        Math.random() * 600 - 600,
                    ],
                    rotation: [1.16, -0.12, Math.random() * 2 * Math.PI],

                }
            );
        }
        return tempCloudArgs;

    }, [])

    return (
        <>{cloudArgs.map((cloudArg, i) => {
            return (
                <Nebula
                    key={String(i)}
                    rotateSpeedModifier={rotateSpeedModifier}
                    position={cloudArg.position}
                    rotation={cloudArg.rotation}
                />
            )
        })}</>
    )
}