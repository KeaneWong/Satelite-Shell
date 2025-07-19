import {useFrame, useLoader, useThree} from '@react-three/fiber'
import {useMemo, useRef} from 'react'
import * as THREE from 'three'
import WispPNG from "../../assets/wisp.png"
import {TextureLoader} from "three";

export const noise3D = (x, y, z) => {
    const hash = (x * 374761393 + y * 668265263 + z * 1274126177) % 2147483647
    return ((hash * 16807) % 2147483647) / 2147483647 * 2 - 1
}


// NOTE: This unused function works but the right png is critical.
// TODO: Need to draw a line between the points. Maybe makes
//  it more obvious its a path?
export const CloudPath = ({
                              nebulaCoordinates
                          }: {
    nebulaCoordinates: [number, number, number]
}) => {
    const {camera} = useThree()
    const groupRef = useRef(null)
    const timeRef = useRef(0)
    const smokeTexture = useLoader(
        TextureLoader, WispPNG.src
    )

    // Generate curved path points with noise
    const pathData = useMemo(() => {
        const nebulaPosition = new THREE.Vector3(...nebulaCoordinates)
        const segments = 30
        const points = []
        const baseDirection = new THREE.Vector3()
            .subVectors(camera.position, nebulaPosition)
            .normalize()
        const distance = nebulaPosition.distanceTo(camera.position)

        for (let i = 0; i <= segments; i++) {
            const t = i / segments

            // Base interpolation
            const basePoint = new THREE.Vector3().lerpVectors(
                nebulaPosition,
                camera.position,
                t,
            )

            // Create perpendicular vectors for noise displacement
            const up = new THREE.Vector3(0, 1, 0)
            const right = new THREE.Vector3().crossVectors(baseDirection, up).normalize()
            const forward = new THREE.Vector3().crossVectors(right, baseDirection).normalize()

            // Apply 3D Perlin-like noise
            const noiseScale = 0.1
            const amplitude = distance * 0.3 * Math.sin(Math.PI * t) // Stronger curve in middle

            const noiseX = noise3D(t * 5, 0, 0) * amplitude
            const noiseY = noise3D(0, t * 5, 0) * amplitude
            const noiseZ = noise3D(0, 0, t * 5) * amplitude

            // Apply noise in perpendicular directions
            basePoint.add(right.clone().multiplyScalar(noiseX))
            basePoint.add(forward.clone().multiplyScalar(noiseY))
            basePoint.add(baseDirection.clone().multiplyScalar(noiseZ * 0.5))

            points.push({
                position: basePoint,
                opacity: 1 - (t * 0.8),
                scale: 1 + Math.sin(t * Math.PI) * 0.5,
                originalT: t
            })
        }

        return {points, segments}
    }, [nebulaCoordinates, camera.position])
    const currentPath = pathData.points

    useFrame((state) => {
        timeRef.current = state.clock.elapsedTime

        if (groupRef.current) {
            groupRef.current.children.forEach((sprite, index) => {
                sprite.lookAt(camera.position)

                const flowOffset = Math.sin(timeRef.current * 2 + index * 0.1) * 0.1
                const originalPos = currentPath[index]?.position
                if (originalPos) {
                    sprite.position.copy(originalPos)
                    sprite.position.y += flowOffset

                    const baseOpacity = currentPath[index]?.opacity || 0
                    sprite.material.opacity = baseOpacity * (0.7 + Math.sin(timeRef.current + index) * 0.3)

                    const baseScale = currentPath[index]?.scale || 1
                    const animatedScale = baseScale * (1 + Math.sin(timeRef.current * 3 + index * 0.2) * 0.1)
                    sprite.scale.setScalar(animatedScale * 2)
                }
            })
        }
    })


    return (
        <group ref={groupRef}>
            {currentPath.map((pointData, index) => (
                <sprite key={index} position={pointData.position}>
                    <spriteMaterial
                        map={smokeTexture}
                        // transparent
                        // opacity={pointData.opacity}
                        opacity={1}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </sprite>
            ))}
        </group>
    )
}