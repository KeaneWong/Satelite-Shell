export const Star = ({
                         size = 1.5,
                         ...rest

                     }) => {
    return (
        <mesh {...rest}>
            <icosahedronGeometry args={[size]}/>

            <meshStandardMaterial
                //yellow
                // color={0xFFDB00}
                color={0xffffff}

            />

        </mesh>
    )
}