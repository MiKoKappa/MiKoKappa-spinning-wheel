import React from 'react'
import { useEffect, useState } from 'react';
import gsap from "gsap"


const Cursor = () => {
    const [mousePos, setMousePos] = useState({});

    useEffect(() => {
        gsap.to("#cursor-top", { duration: 0.5, height: mousePos.y - 24, left: mousePos.x })
        gsap.to("#cursor-bottom", { duration: 0.5, height: window.innerHeight - mousePos.y - 24, left: mousePos.x })
        gsap.to("#cursor-left", { duration: 0.5, width: mousePos.x - 24, top: mousePos.y })
        gsap.to("#cursor-right", { duration: 0.5, width: window.innerWidth - mousePos.x - 24, top: mousePos.y, right: 0 })
        gsap.to("#cursor-main", { duration: 0, top: mousePos.y - 12, left: mousePos.x - 12 })
    }, [mousePos])

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

    return (
        <div className='h-screen w-screen fixed pointer-events-none z-50 text-neutral-300'>
            <div id="cursor-top" className='bg-neutral-400 absolute opacity-20' style={{ height: mousePos.y - 24 || 0, width: 2, left: mousePos.x }} />
            <div id="cursor-left" className='bg-neutral-400 absolute opacity-20' style={{ width: mousePos.x - 24 || 0, height: 2, top: mousePos.y }} />
            <svg id="cursor-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute" style={{ top: mousePos.y - 12 || 0, left: mousePos.x - 12 || 0 }}>
                <path strokeLinecap="square" strokeLinejoin="square" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div id="cursor-right" className='bg-neutral-400 absolute opacity-20' style={{ width: window.innerWidth - mousePos.x - 24 || 0, height: 2, top: mousePos.y, right: 0 }} />
            <div id="cursor-bottom" className='bg-neutral-400 absolute opacity-20' style={{ height: window.innerHeight - mousePos.y - 24 || 0, width: 2, left: mousePos.x, bottom: 0 }} />
        </div>
    );
}

export default Cursor