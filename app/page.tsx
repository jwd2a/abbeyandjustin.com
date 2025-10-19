'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home() {
  const [stage, setStage] = useState<'intro' | 'flying' | 'reveal'>('intro');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReveal = () => {
    setStage('flying');
    // Airplane animation plays, then reveals PR
    setTimeout(() => {
      setStage('reveal');
    }, 6000); // 6 seconds for complete animation
  };

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Intro Stage - "Something special is coming" */}
      {stage === 'intro' && (
        <section className="fixed inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 z-50">
          {/* Background image for intro */}
          <div className="absolute inset-0">
            <Image
              src="/rincon_sunset_beach.jpg"
              alt="Puerto Rico beach at dusk"
              fill
              className="object-cover"
              style={{ filter: 'brightness(0.7) blur(1px)' }}
              priority
            />
          </div>

          <div className={`relative z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Lottie animation - sparkles */}
            <div className="mb-8 flex justify-center">
              <Lottie
                animationData={{
                  v: "5.7.4",
                  fr: 60,
                  ip: 0,
                  op: 180,
                  w: 500,
                  h: 500,
                  nm: "Sparkle",
                  ddd: 0,
                  assets: [],
                  layers: [
                    {
                      ddd: 0,
                      ind: 1,
                      ty: 4,
                      nm: "star",
                      sr: 1,
                      ks: {
                        o: { a: 1, k: [
                          { t: 0, s: [0] },
                          { t: 30, s: [100] },
                          { t: 150, s: [100] },
                          { t: 180, s: [0] }
                        ]},
                        r: { a: 1, k: [
                          { t: 0, s: [0] },
                          { t: 180, s: [360] }
                        ]},
                        p: { a: 0, k: [250, 250, 0] },
                        a: { a: 0, k: [0, 0, 0] },
                        s: { a: 1, k: [
                          { t: 0, s: [0, 0, 100] },
                          { t: 30, s: [100, 100, 100] },
                          { t: 90, s: [120, 120, 100] },
                          { t: 150, s: [100, 100, 100] },
                          { t: 180, s: [0, 0, 100] }
                        ]}
                      },
                      ao: 0,
                      shapes: [
                        {
                          ty: "gr",
                          it: [
                            {
                              ty: "sr",
                              sy: 1,
                              d: 1,
                              pt: { a: 0, k: 5 },
                              p: { a: 0, k: [0, 0] },
                              r: { a: 0, k: 0 },
                              ir: { a: 0, k: 30 },
                              or: { a: 0, k: 80 },
                              nm: "Star Path"
                            },
                            {
                              ty: "fl",
                              c: { a: 0, k: [1, 0.84, 0.2, 1] },
                              o: { a: 0, k: 100 },
                              r: 1,
                              nm: "Fill"
                            }
                          ],
                          nm: "Star",
                          np: 2
                        }
                      ],
                      ip: 0,
                      op: 180,
                      st: 0
                    }
                  ]
                }}
                loop
                className="w-48 h-48 sm:w-64 sm:h-64"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 animate-fade-in drop-shadow-2xl">
              Something special is coming...
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-12 animate-fade-in-delayed drop-shadow-lg">
              January 2026
            </p>

            {/* Fun interactive button */}
            <button
              onClick={handleReveal}
              className="group relative px-12 py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full text-white text-xl sm:text-2xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 animate-pulse-slow"
            >
              <span className="relative z-10">Reveal the Surprise!</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <div className="mt-8 text-white/70 text-sm animate-bounce drop-shadow-lg">
              ✨ Click to discover ✨
            </div>
          </div>
        </section>
      )}

      {/* Flying Stage - Airplane Lottie animation on white */}
      {stage === 'flying' && (
        <section className="fixed inset-0 z-50 bg-white flex items-center justify-center animate-fade-in">
          {/* DotLottie Airplane Animation */}
          <div className="w-full max-w-3xl px-4">
            <DotLottieReact
              src="/Airplane.lottie"
              loop={false}
              autoplay
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </section>
      )}

      {/* Reveal Stage - Puerto Rico reveal */}
      {stage === 'reveal' && (
        <>
          {/* Hero Section with Puerto Rico reveal */}
          <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Full bleed background image */}
            <div className="fixed inset-0 z-0 animate-zoom-in">
              <Image
                src="/rincon-puerto-rico.jpg"
                alt="Rincon Puerto Rico Beach"
                fill
                className="object-cover"
                style={{
                  filter: 'brightness(0.8)',
                  transform: `scale(${1 + scrollY * 0.0002})`
                }}
                priority
              />
              {/* Dark overlay scrim for text readability */}
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-20 text-center animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 tracking-wide drop-shadow-lg">
                You're going to
              </h2>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight leading-none animate-title-appear">
                <span className="inline-block bg-gradient-to-r from-orange-200 via-yellow-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl">
                  Puerto Rico
                </span>
              </h1>
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-white/70" />
                <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light italic drop-shadow-lg">
                  South Coast Adventure
                </p>
                <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-white/70" />
              </div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                January 8-11, 2026
              </p>
              <p className="text-xl sm:text-2xl text-white/90 font-light mb-8 drop-shadow-lg">
                Celebrating our 2 year anniversary
              </p>
              <div className="animate-pulse-slow">
                <span className="text-5xl sm:text-6xl md:text-7xl drop-shadow-2xl">❤️</span>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce-delayed">
              <div className="flex flex-col items-center gap-2 text-white/90">
                <span className="text-sm tracking-widest drop-shadow-lg">DISCOVER MORE</span>
                <svg className="w-6 h-6 animate-bounce drop-shadow-lg" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </div>
          </section>

          {/* Destinations Section with Full Bleed Backgrounds */}
          <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            {/* Full bleed background */}
            <div className="fixed inset-0 z-0">
              <Image
                src="/south_bahia_guanica.jpg"
                alt="Puerto Rico coastline"
                fill
                className="object-cover"
                style={{
                  filter: 'brightness(0.65)',
                  transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0001})`
                }}
              />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-16 drop-shadow-2xl"
                style={{
                  opacity: Math.min(1, (scrollY - 200) / 300)
                }}
              >
                Our Destinations
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {/* Rincon Card */}
                <div
                  className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  style={{
                    opacity: Math.min(1, (scrollY - 300) / 300),
                    transform: `translateY(${Math.max(0, (500 - scrollY) * 0.1)}px)`
                  }}
                >
                  <div className="relative h-[500px]">
                    <Image
                      src="/rincon_beach.jpg"
                      alt="Rincon Beach"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="text-6xl mb-4 drop-shadow-lg">🏄‍♀️</div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">Rincón</h3>
                    <p className="text-lg text-white/90 leading-relaxed mb-4 drop-shadow-md">
                      The surfing capital of the Caribbean. Crystal-clear waters, stunning sunsets,
                      and laid-back beach vibes await us in this coastal paradise.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white drop-shadow-md">Beaches</span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white drop-shadow-md">Surfing</span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white drop-shadow-md">Sunsets</span>
                    </div>
                  </div>
                </div>

                {/* Ponce Card */}
                <div
                  className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  style={{
                    opacity: Math.min(1, (scrollY - 400) / 300),
                    transform: `translateY(${Math.max(0, (600 - scrollY) * 0.1)}px)`
                  }}
                >
                  <div className="relative h-[500px]">
                    <Image
                      src="/ponce_parque_bombas.jpg"
                      alt="Ponce Architecture"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="text-6xl mb-4 drop-shadow-lg">🏛️</div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">Ponce</h3>
                    <p className="text-lg text-white/90 leading-relaxed mb-4 drop-shadow-md">
                      The Pearl of the South. Rich history, colorful architecture,
                      vibrant culture, and authentic Puerto Rican charm in every corner.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white drop-shadow-md">Culture</span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white drop-shadow-md">History</span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white drop-shadow-md">Food</span>
                    </div>
                  </div>
                </div>

                {/* Isla De Culebra Card */}
                <div
                  className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  style={{
                    opacity: Math.min(1, (scrollY - 500) / 300),
                    transform: `translateY(${Math.max(0, (700 - scrollY) * 0.1)}px)`
                  }}
                >
                  <div className="relative h-[500px]">
                    <Image
                      src="/south_salinas_beach.jpg"
                      alt="Isla De Culebra Beach"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="text-6xl mb-4 drop-shadow-lg">🏝️</div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">Isla De Culebra</h3>
                    <p className="text-lg text-white/90 leading-relaxed mb-4 drop-shadow-md">
                      A pristine island paradise with world-famous Flamenco Beach. Turquoise waters, white sand, and untouched natural beauty make this a true Caribbean gem.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white drop-shadow-md">Snorkeling</span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white drop-shadow-md">Paradise</span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white drop-shadow-md">Adventure</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* More adventures teaser */}
              <div
                className="text-center"
                style={{
                  opacity: Math.min(1, (scrollY - 600) / 300)
                }}
              >
                <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/30 shadow-2xl">
                  <p className="text-2xl sm:text-3xl text-white/90 mb-2 drop-shadow-lg">
                    And more amazing experiences...
                  </p>
                  <p className="text-lg text-white/80 drop-shadow-md">
                    ✨ Hidden gems • 🌴 Beach days • 🍽️ Local cuisine • 🌅 Unforgettable moments
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Paradise Gallery Section */}
          <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
            {/* Full bleed background */}
            <div className="fixed inset-0 z-0">
              <Image
                src="/rincon_rainbow.jpg"
                alt="Palm trees Puerto Rico"
                fill
                className="object-cover"
                style={{
                  filter: 'brightness(0.6)',
                  transform: `translateY(${scrollY * 0.2}px) scale(${1.1 + scrollY * 0.00005})`
                }}
              />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-4 drop-shadow-2xl"
                style={{
                  opacity: Math.min(1, (scrollY - 1200) / 300)
                }}
              >
                Paradise Awaits
              </h2>
              <p
                className="text-xl text-white/90 text-center mb-16 drop-shadow-lg"
                style={{
                  opacity: Math.min(1, (scrollY - 1300) / 300)
                }}
              >
                A glimpse of what&apos;s to come
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { src: "/rincon_dome_beach.jpg", alt: "Beach sunset" },
                  { src: "/south_salinas_beach.jpg", alt: "Tropical beach" },
                  { src: "/south_cabo_rojo_lighthouse.jpg", alt: "Lighthouse" },
                  { src: "/rincon_house_water.jpg", alt: "Ocean view" },
                  { src: "/ponce_city_hall.jpg", alt: "Ponce city hall" },
                  { src: "/south_punta_tuna_lighthouse.jpg", alt: "Beach vibes" },
                ].map((image, index) => (
                  <div
                    key={index}
                    className="relative h-64 overflow-hidden rounded-2xl group cursor-pointer shadow-2xl"
                    style={{
                      opacity: Math.min(1, (scrollY - (1400 + index * 100)) / 300),
                      transform: `translateY(${Math.max(0, (1500 + index * 100 - scrollY) * 0.05)}px)`
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Agenda Coming Soon Section */}
          <section className="relative min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            {/* Full bleed background */}
            <div className="fixed inset-0 z-0">
              <Image
                src="/south_malecon_guanica.jpg"
                alt="Puerto Rico coastline sunset"
                fill
                className="object-cover"
                style={{
                  filter: 'brightness(0.65)',
                  transform: `translateY(${scrollY * 0.15}px)`
                }}
              />
            </div>

            <div
              className="relative z-10 text-center max-w-3xl"
              style={{
                opacity: Math.min(1, (scrollY - 2200) / 300),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2200) * 0.1)}px)`
              }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/30 shadow-2xl">
                <div className="text-5xl mb-6 drop-shadow-lg">📋</div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                  Detailed Agenda
                </h2>
                <p className="text-2xl text-white/90 mb-4 drop-shadow-md">
                  Coming Soon
                </p>
                <p className="text-lg text-white/80 leading-relaxed drop-shadow-md">
                  Every detail is being carefully planned to make this trip unforgettable.
                  Get ready for the adventure of a lifetime!
                </p>
                <div className="mt-8 flex justify-center gap-2">
                  <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse drop-shadow-lg" />
                  <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse drop-shadow-lg" style={{ animationDelay: '0.2s' }} />
                  <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse drop-shadow-lg" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="relative py-12 text-center border-t border-white/20">
            {/* Full bleed background */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/ponce_parque_ecologico.jpg"
                alt="Puerto Rico sunset beach"
                fill
                className="object-cover"
                style={{ filter: 'brightness(0.6)' }}
              />
            </div>
            <div className="relative z-10">
              <p className="text-white/80 text-lg drop-shadow-lg">
                Made with love for an unforgettable anniversary
              </p>
              <p className="text-white/60 text-sm mt-2 drop-shadow-md">
                2 years of us • Forever to go
              </p>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
