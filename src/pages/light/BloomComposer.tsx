import {
    Bloom,
    DepthOfField,
    EffectComposer,
    Noise,
    Vignette,

} from '@react-three/postprocessing'
import {BlendFunction, KernelSize} from "postprocessing";

export const BloomComposer = () => {
    return (
        <EffectComposer>
            <DepthOfField
                focusDistance={0} focalLength={0.02} bokehScale={2} height={480}/>
            <Bloom
                blendFunction={BlendFunction.COLOR_DODGE}
                kernelSize={KernelSize.SMALL}
                useLuminanceFilter
                luminanceThreshold={0.3}
                luminanceSmoothing={0.75}

            />

            <Noise opacity={0.02}/>
            <Vignette eskil={false} offset={0.1} darkness={1.1}/>
        </EffectComposer>
    )
}