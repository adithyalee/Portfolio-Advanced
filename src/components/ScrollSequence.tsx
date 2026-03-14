import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoading } from '../context/LoadingProvider';
import { setProgress } from './Loading';
import './styles/ScrollSequence.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollSequence: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { setLoading } = useLoading();
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    const frameCount = 192;
    const currentFrame = (index: number) => 
        `/ezgif-split/frame_${index.toString().padStart(3, '0')}_delay-0.066s.png`;

    useEffect(() => {
        const preloadedImages: HTMLImageElement[] = [];
        let loaded = 0;
        const progress = setProgress((value) => setLoading(value));

        const handleImageLoad = () => {
            loaded++;
            if (loaded === frameCount) {
                setImages(preloadedImages);
                progress.loaded();
            }
        };

        const handleImageError = () => {
            console.error("Failed to load an image frame");
            loaded++; // Still increment to avoid getting stuck
            if (loaded === frameCount) {
                setImages(preloadedImages);
                progress.loaded();
            }
        };

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = handleImageLoad;
            img.onerror = handleImageError;
            preloadedImages.push(img);
        }
    }, [setLoading]);

    useEffect(() => {
        if (images.length === 0 || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const render = (index: number) => {
            if (images[index]) {
                const img = images[index];
                context.clearRect(0, 0, canvas.width, canvas.height);
                
                const wrh = img.width / img.height;
                let newWidth = canvas.width;
                let newHeight = newWidth / wrh;
                if (newHeight < canvas.height) {
                    newHeight = canvas.height;
                    newWidth = newHeight * wrh;
                }
                
                const x = (canvas.width - newWidth) / 2;
                const y = (canvas.height - newHeight) / 2;
                
                context.drawImage(img, x, y, newWidth, newHeight);
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(0);
        };

        window.addEventListener('resize', resize);
        resize();

        const airpods = { frame: 0 };
        
        gsap.to(airpods, {
            frame: frameCount - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
                trigger: '#smooth-content',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2.5,
            },
            onUpdate: () => render(Math.round(airpods.frame)),
        });

        return () => {
            window.removeEventListener('resize', resize);
            ScrollTrigger.getAll().forEach(st => {
                if (st.vars.trigger === '#smooth-content') st.kill();
            });
        };
    }, [images]);

    return (
        <div ref={containerRef} className="scroll-sequence-container">
            <canvas ref={canvasRef} />
        </div>
    );
};

export default ScrollSequence;
