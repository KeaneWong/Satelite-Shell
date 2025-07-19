import {useFrame, useLoader, useThree} from '@react-three/fiber'
import {useMemo, useRef} from 'react'
import * as THREE from 'three'
import WispPNG from "../../assets/wisp.png"

export const CloudPath = ({nebulaPosition}: {
    nebulaPosition: [number, number, number]
}) => {
    // const smokeTexture = Wisp.src
    const {camera} = useThree()
    const smokeTexture = useLoader(THREE.TextureLoader, WispPNG.src)
    const groupRef = useRef(null)

    // Generate path points
    const pathPoints = useMemo(() => {
        const points = []
        const segments = 60
        const nebulaVector = new THREE.Vector3(...nebulaPosition)
        for (let i = 0; i <= segments; i++) {
            const t = i / segments
            // Linear interpolation with some noise
            const point = new THREE.Vector3().lerpVectors(
                nebulaVector,
                new THREE.Vector3(0,0,1),
                // camera.position,
                t
            )

            // Add some randomness for organic feel
            point.add(new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            ))
            console.log(point)
            points.push(point)
        }
        return points
    }, [nebulaPosition, camera.position])

    useFrame(() => {
        if (groupRef.current !== null) {
            groupRef.current.children.forEach(sprite => {
                sprite.lookAt(camera.position)
                // console.log(sprite)
            })
        }
    })

    return (
        <group ref={groupRef}>
            {pathPoints.map((point, index) => (
                <sprite
                    key={index}
                    position={point}
                    scale={[10, 10, 10]}
                >
                    <spriteMaterial
                        map={smokeTexture}
                        transparent
                        opacity={1 - (index / pathPoints.length)} // Fade along path

                        blending={THREE.AdditiveBlending}
                    />
                </sprite>
            ))}
        </group>
    )
}