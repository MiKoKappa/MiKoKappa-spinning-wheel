import { useEffect, useLayoutEffect, useState } from 'react'
import SpinningWheel from './components/SpinningWheel'
import { Canvas, useLoader } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useProgress } from '@react-three/drei'
import { Timeline } from 'gsap/gsap-core'
import Cursor from './components/Cursor'
export default function App() {

  gsap.registerPlugin(ScrollTrigger);

  const [scrollPercent, setScrollPercent] = useState(1)

  const { active, progress, errors, item, loaded, total } = useProgress()

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      const h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';

      const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
      setScrollPercent(Math.floor(percent));

    })

    const tl = new Timeline()

    tl.to("#hero-text", { delay: 1, opacity: 1 })
    tl.to("#tkaczyk_logo", { delay: 0, top: 0 });
    tl.to(".text-down", { delay: 0, stagger: 0.2, top: 0 })
    gsap.fromTo("#hero-text", { opacity: 1 }, {
      opacity: 0,
      scrollTrigger: {
        trigger: '#about',
        markers: false,
        start: "10px bottom",
        end: "center bottom",
        scrub: true
      }
    })
    gsap.fromTo("#hero-scroll", { opacity: 1 }, {
      opacity: 0,
      scrollTrigger: {
        trigger: '#about',
        markers: false,
        start: "-80px bottom",
        end: "center bottom",
        scrub: true
      }
    })
    gsap.fromTo("#about", { opacity: 0 }, {
      opacity: 1, scrollTrigger: {
        trigger: '#about',
        markers: false,
        start: "-80px center",
        end: "center bottom",
        scrub: true,
      }
    })

  }, [])


  return (
    <div className='overflow-x-hidden'>
      <Cursor />
      <div id="canvas-container" className='h-screen fixed w-screen pointer-events-none'>
        <Canvas gl={{ antialias: false }} dpr={window.devicePixelRatio * 0.6}>
          <color attach="background" args={["#2f2f2f"]} />
          <SpinningWheel />
        </Canvas>
      </div>
      <div className='overflow-hidden fixed top-20 2xl:top-28 left-48 2xl:left-52'>
        <h1 className=' text-neutral-700 title_logo text-3xl 2xl:text-4xl relative -top-10' id="tkaczyk_logo">TKACZYK</h1>
      </div>
      <div className='relative min-h-screen w-screen pointer-events-none'>
        <div className='relative h-screen w-screen px-48 2xl:px-52 py-20 2xl:py-28 pointer-events-none flex flex-col justify-center'>
          <div id="hero-text" className='w-1/3 mt-20 2xl:mt-28 opacity-0'>
            <p className='title_sub text-neutral-500 text-3xl xl:text-4xl font-normal leading-tight'>
              <span className='overflow-hidden inline-block -mb-2 xl:-mb-3 xl:py-1'><span className='text-cyan-500 font-semibold relative -top-24 text-down'>Weaving</span></span> the intelligent future with <span className='overflow-hidden inline-block -mb-2 xl:-mb-3 xl:py-1'><span className='text-cyan-500 font-semibold relative -top-24 text-down'>cutting-edge</span></span> technology.
            </p>
            <hr className='border-neutral-500 my-6 2xl:my-10' />
            <p className='title_sub text-neutral-500 text-xl 2xl:text-2xl font-extralight'>
              Matured R&D Specialist devoted to integration and developement of futuristic IT use-cases. Lets tailor something new together!
            </p>
          </div>
        </div>
      </div>
      {/* Side menu with scroll indicator */}
      <div className='fixed top-20 2xl:top-28 right-48 2xl:right-52'>
        <div className='flex flex-row justify-center items-center'>
          <div className=' w-32 h-px bg-neutral-500 mr-3' />
          <span className='title_logo text-neutral-500'>{(scrollPercent).toString().padStart(3, "0")}</span>
        </div>
        <div className='flex flex-row justify-end items-center'>
          <div className=' w-px h-32 bg-neutral-500 mt-2 mb-4 mr-1' />
        </div>
        <div className='flex flex-row justify-end items-center'>
          <a href="#about" className='title_logo text-neutral-500 relative -right-1 cursor-none' style={{ writingMode: 'vertical-rl' }}>ABOUT ME</a>
        </div>
        <div className='flex flex-row justify-end items-center'>
          <div className=' w-px h-6 bg-neutral-500 my-4 mr-1' />
        </div>
        <div className='flex flex-row justify-end items-center'>
          <a href="#about" className='title_logo text-neutral-500 relative -right-1 cursor-none' style={{ writingMode: 'vertical-rl' }}>PROJECTS</a>
        </div>
        <div className='flex flex-row justify-end items-center'>
          <div className=' w-px h-32 bg-neutral-500 mt-4 mr-1' />
        </div>
      </div>
      <div id="hero-scroll" className='absolute left-1/2 bottom-20'>
        <a href='#about' className='text-3xl text-cyan-500 animate-bounce cursor-none'>\/</a>
      </div>
      <div id="about" className='min-h-screen relative flex flex-row justify-end px-48 2xl:px-52 py-20 2xl:py-28'>
        {/* <img src="photo.png" alt="Photography" className='w-1/3 opacity-25' /> */}
        <div className='flex flex-col justify-start w-1/2 overflow-visible'>
          <h2 className='text-5xl text-cyan-500 title_sub font-semibold mb-8'>About me</h2>
          <div className='flex flex-row justify-start items-start'>
            <div className='text_sub text-neutral-50 px-6 py-4 bg-neutral-700 min-w-24 min-h-16 opacity-40 relative right-6'>
              <img src="SGGW.svg" alt="University" className='w-48' />
            </div>
            <div className='bg-neutral-700 w-24 min-h-16 opacity-40 relative top-6 left-8'>
              <img src="Orange_logo.svg" alt="Orange" className='w-full' />
            </div>
          </div>
          <div className='flex flex-row justify-start items-start'>
            <div className='bg-neutral-700 min-w-24 min-h-16 opacity-40 relative top-8 right-12'>
              <img src="wisniowski-logo.png" alt="Wiśniowski" className='w-full invert contrast-200' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

