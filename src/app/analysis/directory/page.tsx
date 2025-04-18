'use client';

import { Header } from '@/components/Header';
import { IntroSqrAnim } from '@/components/IntroSqrAnim';
import { IntroSquare } from '@/components/IntroSquare';
import { NavBtn } from '@/components/NavBtn';
import { Popup } from '@/components/Popup';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const DirectoryPage = () => {
    const [loading, setloading] = useState(true);
    const animRef = React.useRef<gsap.core.Timeline | null>(null);
    const router = useRouter();

    useGSAP(() => {
        const context = gsap.context(() => {
            const tl = gsap.timeline();
            animRef.current = tl;

            tl.from('.introSquare', { opacity: 0, duration: 0.7, stagger: 0.2, delay: 0.2 });

            tl.from('.directoryDiamond > *', {
                opacity: 0,
                duration: 0.7,
                stagger: 0.2,
                delay: 0.1,
                ease: 'power2.out',
                y: 20,
                x: 20,
            });
        });

        return () => {
            context.revert();
        };
    }, [loading]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault(); 
        if (animRef.current) {
            animRef.current.reverse().then(() => {
                router.push(href);
            });
        } else {
            router.push(href);
        }
    };

    return (
        <>
            {loading ? (
                <IntroSqrAnim onComplete={() => setloading(false)}></IntroSqrAnim>
            ) : (
                <>
                    <Popup popupMsg={`Choose the skin data you'd like to see.`}></Popup>
                    <Header></Header>
                    <main>
                        <div className="w-full h-full flex justify-center items-center pt-[150px]">
                            <IntroSquare
                                maxSize="420"
                                minSize="200"
                                clampVW="50"
                                opacity={0.2}
                                startVisible={true}
                            />
                            <IntroSquare
                                maxSize="380"
                                minSize="160"
                                clampVW="45"
                                opacity={0.5}
                                startVisible={true}
                            />
                            <IntroSquare maxSize="340" minSize="140" startVisible={true} />

                            <div
                                className="directoryDiamond rotate-45 flex flex-wrap gap-1"
                                style={{
                                    width: `clamp(70px, 40vw, 260px)`,
                                    height: `clamp(70px, 40vw, 260px)`,
                                }}
                            >
                                <Link
                                    href="/analysis/demographics"
                                    onClick={(e) => handleLinkClick(e, '/analysis/demographics')}
                                    className="hover:cursor-pointer text-[12px] font-semibold tracking-tighter hover:bg-gray-200 w-[49%] h-[49%] bg-gray-100"
                                >
                                    <p className="-rotate-45">DEMOGRAPHICS</p>
                                </Link>
                                <Link
                                    href="#"
                                    onClick={(e) => handleLinkClick(e, '#')}
                                    className="hover:cursor-pointer text-[12px] font-semibold tracking-tighter hover:bg-gray-200 w-[49%] h-[49%] bg-gray-100"
                                >
                                    <p className="-rotate-45">SKIN TYPE DATA</p>
                                </Link>
                                <Link
                                    href="/analysis/weatherData"
                                    onClick={(e) => handleLinkClick(e, '/analysis/weatherData')}
                                    className="hover:cursor-pointer text-[12px] font-semibold tracking-tighter hover:bg-gray-200 w-[49%] h-[49%] bg-gray-100"
                                >
                                    <p className="-rotate-45">WEATHER</p>
                                </Link>
                                <Link
                                    href="#"
                                    onClick={(e) => handleLinkClick(e, '#')}
                                    className="hover:cursor-pointer text-[12px] font-semibold tracking-tighter hover:bg-gray-200 w-[49%] h-[49%] bg-gray-100"
                                >
                                    <p className="-rotate-45">COSMETIC CONCERNS</p>
                                </Link>
                            </div>
                        </div>
                    </main>
                    <footer>
                        <NavBtn direction="left" backButton />
                    </footer>
                </>
            )}
        </>
    );
};

export default DirectoryPage;