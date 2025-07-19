export const Star = ({

                         ...rest
                     }) => {
    return (
        <mesh {...rest}>
            <icosahedronGeometry args={[2]}/>

            <meshStandardMaterial
                //yellow
                // color={0xFFDB00}
                color={0xffffff}

            />

        </mesh>
    )
}