import React, { useEffect, useRef, useLayoutEffect } from 'react'
import { useGLTF, useAnimations, Environment, useProgress } from "@react-three/drei"
import { ColorAverage, DotScreen, EffectComposer, Glitch, Noise, Vignette } from '@react-three/postprocessing'
import { GlitchMode, BlendFunction } from 'postprocessing'
// import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const SpinningWheel = ({ ...props }) => {

    gsap.registerPlugin(ScrollTrigger);

    const group = useRef()
    // const { viewport } = useThree()

    const { nodes, materials, animations } = useGLTF(
        "kolowrotek.gltf"
    );
    const { actions, mixer } = useAnimations(animations, group);

    useEffect(() => {
        actions.Animation.play();
    }, [mixer])

    useEffect(() => {
        gsap.fromTo("canvas", { opacity: 0 }, { opacity: 1, delay: 0, duration: 2 })
        gsap.to(group.current.position, {
            x: -3,
            z: 2,
            scrollTrigger: {
                trigger: '#about',
                markers: false,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
        })
        gsap.to(group.current.rotation, {
            y: Math.PI * 1.5,
            scrollTrigger: {
                trigger: '#about',
                markers: false,
                start: "80px bottom",
                end: "bottom center",
                scrub: true
            }
        })
    }, [])

    // useFrame(({ pointer }) => {
    //     const scroll = window.scrollY
    //     const x = (pointer.x * viewport.width) / 2
    //     const y = (pointer.y * viewport.height) / 2
    //     // group.current.rotation.set(Math.PI * 0.01 * y, Math.PI * 0.02 * x, 0)
    //     // gsap.to(group.current.rotation, { duration: 1, x: Math.PI * 0.05 + Math.PI * 0.005 * y, y: Math.PI * 0.2 + Math.PI * 0.007 * x, z: 0, ease: "power.out" })
    //     // gsap.to(group.current.position, { duration: 0.1, x: 1.5 - scroll * 0.001, ease: "power.out" })
    // });

    return (
        <>
            <ambientLight intensity={4} />
            <directionalLight color="#3f3f3f" position={[0, 0, 5]} intensity={7} />
            <Environment preset='night' />
            <group ref={group} {...props} dispose={null} rotation={[0, Math.PI * 0.10, 0]} position={[1.5, -6.4, 0]}>
                <group name="Scene">
                    <mesh
                        name="ratins"
                        castShadow
                        receiveShadow
                        geometry={nodes.ratins.geometry}
                        material={materials.ratins_Material_u1_v1}
                        position={[0, 0, -1.385]}
                    />
                    <mesh
                        name="ratins001"
                        castShadow
                        receiveShadow
                        geometry={nodes.ratins001.geometry}
                        material={materials.ratins_Material_u1_v1}
                        position={[-0.169, 6.797, 0.113]}
                    />
                    <mesh
                        name="ratins002"
                        castShadow
                        receiveShadow
                        geometry={nodes.ratins002.geometry}
                        material={materials.ratins_Material_u1_v1}
                        position={[3.659, 8.003, -0.433]}
                        rotation={[0, 0, 2.998]}
                    />
                    <mesh
                        name="ratins003"
                        castShadow
                        receiveShadow
                        geometry={nodes.ratins003.geometry}
                        material={materials.ratins_Material_u1_v1}
                        position={[-0.185, 6.782, 0.877]}
                    >
                        <group name="Empty001" position={[0, -0.528, 0.138]} />
                    </mesh>
                    <group name="Empty" position={[-0.185, 6.782, 0.877]} />
                    <mesh
                        name="ratins004"
                        castShadow
                        receiveShadow
                        geometry={nodes.ratins004.geometry}
                        material={materials.ratins_Material_u1_v1}
                        position={[-0.185, 6.253, 1.163]}
                        rotation={[0, 0, 0.13]}
                    >
                        <group name="Empty002" />
                        <group
                            name="Empty004"
                            position={[-0.319, -4.972, 0.124]}
                            rotation={[0, 0, -0.099]}
                        />
                    </mesh>
                    <group
                        name="Empty003"
                        position={[0.372, 1.99, 1.163]}
                        rotation={[0.025, -0.054, -0.026]}
                    />
                    <mesh
                        name="ratins005"
                        castShadow
                        receiveShadow
                        geometry={nodes.ratins005.geometry}
                        material={materials.ratins_Material_u1_v1}
                        position={[4.012, 1.005, -0.269]}
                        rotation={[2.966, 1.183, -2.881]}
                        scale={[1.063, 1.063, 0.884]}
                    >
                        <group name="Empty006" />
                        <group
                            name="Empty008"
                            position={[-0.212, 0.149, -3.264]}
                            rotation={[-2.924, -1.177, -2.84]}
                            scale={[1.102, 0.943, 0.97]}
                        />
                    </mesh>
                    <group
                        name="Empty005"
                        position={[-0.44, 1.005, 1.083]}
                        rotation={[-1.479, 0.001, 0.016]}
                    />
                    <mesh
                        name="ratins006"
                        castShadow
                        receiveShadow
                        geometry={nodes.ratins006.geometry}
                        material={materials.ratins_Material_u1_v1}
                        position={[1.933, 1.005, -1.815]}
                        rotation={[3.027, 0.172, -3.122]}
                        scale={[1.159, 1.159, 1.115]}
                    >
                        <group name="Empty007" />
                    </mesh>
                </group>
            </group>
            <EffectComposer>
                <ColorAverage blendFunction={BlendFunction.COLOR} />
                <Noise opacity={0.08} />
                {/* <Glitch
                    delay={[2.2, 5.7]} // min and max glitch delay
                    duration={[0.6, 1.0]} // min and max glitch duration
                    strength={[0.3, 1.0]} // min and max glitch strength
                    mode={GlitchMode.SPORADIC} // glitch mode
                    active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                    ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
                /> */}
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
                <DotScreen
                    blendFunction={BlendFunction.LUMINOSITY} // blend mode
                    angle={Math.PI * 0.1} // angle of the dot pattern
                    scale={1.0} // scale of the dot pattern
                    opacity={0.02}
                />
            </EffectComposer>
        </>
    )
}

export default SpinningWheel