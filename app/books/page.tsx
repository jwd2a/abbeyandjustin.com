'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type NextVolume = {
  label: string;
  url?: string;
};

type Series = {
  title: string;
  volumes: string;
  emoji: string;
  photo: string;
  nextVolumes?: NextVolume[];
  totalVolumes?: string;
};

type BookItem = {
  title: string;
  emoji: string;
  photo: string;
};

const photos = [
  { src: '/books/IMG_1457.JPG', alt: 'Full bookshelf overview' },
  { src: '/books/IMG_1458.JPG', alt: 'Top shelf — Jujutsu Kaisen, Tokyo Ghoul, Hunter x Hunter, TMNT' },
  { src: '/books/IMG_1459.JPG', alt: 'Middle shelf — Yokaiden, From the Red Fog, Island in a Puddle' },
  { src: '/books/IMG_1460.JPG', alt: 'Lower shelf — Heaven Official\'s Blessing, Rachel Reid, Boys Run the Riot' },
  { src: '/books/IMG_1461.JPG', alt: 'Bottom shelf — Chainsaw Man, Killing Stalking, Fire Punch, Haikyu!!' },
];

const mangaSeries: Series[] = [
  { title: 'Jujutsu Kaisen', volumes: 'Vols 1–6', emoji: '👹', photo: '/books/IMG_1458.JPG', nextVolumes: [
    { label: 'Vol 7', url: 'https://www.amazon.com/Jujutsu-Kaisen-Vol-7/dp/1974717119' },
    { label: 'Vols 7–12 bundle', url: 'https://www.amazon.com/Jujutsu-Kaisen-Vol-Bundle-Collection/dp/B09WM2PTC1' },
  ], totalVolumes: '29' },
  { title: 'Tokyo Ghoul', volumes: 'Multiple volumes', emoji: '🦴', photo: '/books/IMG_1458.JPG' },
  { title: 'Hunter x Hunter', volumes: 'Vol 1', emoji: '⚡', photo: '/books/IMG_1458.JPG', nextVolumes: [
    { label: 'Vol 2', url: 'https://www.amazon.com/Hunter-x-Vol-2/dp/159116785X' },
  ], totalVolumes: '38' },
  { title: 'Chainsaw Man', volumes: 'Vols 1, 3, 7–16, 19–20', emoji: '🪚', photo: '/books/IMG_1461.JPG', nextVolumes: [
    { label: 'Vol 2', url: 'https://www.amazon.com/Chainsaw-Man-Vol-2/dp/1974709949' },
    { label: 'Vol 4', url: 'https://www.amazon.com/Chainsaw-Man-Vol-4/dp/1974717275' },
    { label: 'Vol 5', url: 'https://www.amazon.com/Chainsaw-Man-Vol-5/dp/1974719227' },
    { label: 'Vol 6', url: 'https://www.amazon.com/Chainsaw-Man-Vol-Tatsuki-Fujimoto/dp/1974720713' },
    { label: 'Vol 17', url: 'https://www.amazon.com/Chainsaw-Man-Vol-17/dp/1974752690' },
    { label: 'Vol 18', url: 'https://www.amazon.com/Chainsaw-Man-Vol-18/dp/1974754936' },
  ], totalVolumes: 'Ongoing' },
  { title: 'A Certain Magical Index', volumes: 'Vols 1–14', emoji: '✨', photo: '/books/IMG_1460.JPG', nextVolumes: [
    { label: 'Vol 15', url: 'https://www.amazon.com/Certain-Magical-Index-Vol-manga/dp/1975354443' },
  ], totalVolumes: 'Ongoing' },
  { title: 'From the Red Fog', volumes: 'Vols 1–3', emoji: '🌫️', photo: '/books/IMG_1459.JPG' },
  { title: 'I Cannot Reach You', volumes: 'Vols 1–3', emoji: '💔', photo: '/books/IMG_1460.JPG' },
  { title: 'Island in a Puddle', volumes: 'Multiple vols', emoji: '🏝️', photo: '/books/IMG_1459.JPG' },
  { title: "Heaven Official's Blessing", volumes: 'Novels', emoji: '🙏', photo: '/books/IMG_1460.JPG' },
  { title: 'Boys Run the Riot', volumes: '—', emoji: '🏃', photo: '/books/IMG_1460.JPG' },
  { title: 'Fire Punch', volumes: 'Vol 1', emoji: '🔥', photo: '/books/IMG_1461.JPG', nextVolumes: [
    { label: 'Vol 2', url: 'https://www.amazon.com/Fire-Punch-Vol-Tatsuki-Fujimoto/dp/1421597187' },
  ], totalVolumes: '8' },
  { title: "Hell's Paradise", volumes: 'Vol 1', emoji: '🌺', photo: '/books/IMG_1461.JPG', nextVolumes: [
    { label: 'Vol 2', url: 'https://www.amazon.com/Hells-Paradise-Jigokuraku-Yuji-Kaku/dp/1974713210' },
  ], totalVolumes: '13' },
  { title: 'Gachiakuta', volumes: 'Vol 1', emoji: '🗑️', photo: '/books/IMG_1461.JPG', nextVolumes: [
    { label: 'Vol 2', url: 'https://www.amazon.com/Gachiakuta-2-Kei-Urana/dp/B0CD5GYVVZ' },
  ], totalVolumes: 'Ongoing' },
  { title: 'Killing Stalking', volumes: 'Vols 1–2', emoji: '🔪', photo: '/books/IMG_1461.JPG', nextVolumes: [
    { label: 'Deluxe Vol 3', url: 'https://www.amazon.com/Killing-Stalking-Deluxe-Vol-3/dp/1638587973' },
  ], totalVolumes: '—' },
  { title: 'Haikyu!!', volumes: 'Vol 1', emoji: '🏐', photo: '/books/IMG_1461.JPG', nextVolumes: [
    { label: 'Vol 2', url: 'https://www.amazon.com/Haikyu-Vol-2-Haruichi-Furudate/dp/142158767X' },
  ], totalVolumes: '45' },
  { title: 'Toilet-bound Hanako-kun', volumes: '—', emoji: '👻', photo: '/books/IMG_1460.JPG' },
  { title: 'Yokaiden', volumes: 'Vol 0', emoji: '🎭', photo: '/books/IMG_1459.JPG' },
  { title: 'TMNT: The Last Ronin', volumes: 'Complete', emoji: '🐢', photo: '/books/IMG_1458.JPG' },
];

const oneShots: BookItem[] = [
  { title: 'Look Back', emoji: '🎨', photo: '/books/IMG_1460.JPG' },
  { title: 'Boy Meets Maria', emoji: '💐', photo: '/books/IMG_1460.JPG' },
  { title: 'I Want to Eat Your Pancreas', emoji: '📖', photo: '/books/IMG_1460.JPG' },
];

const booksList: BookItem[] = [
  { title: 'Rachel Reid — Common Goal', emoji: '🏒', photo: '/books/IMG_1460.JPG' },
  { title: 'Rachel Reid — Tough Guy', emoji: '🏒', photo: '/books/IMG_1461.JPG' },
  { title: 'Rachel Reid — Role Model', emoji: '🏒', photo: '/books/IMG_1461.JPG' },
  { title: 'Pirate Recipes', emoji: '🏴‍☠️', photo: '/books/IMG_1458.JPG' },
  { title: 'Perspective Made Easy', emoji: '📐', photo: '/books/IMG_1460.JPG' },
  { title: 'Junji Ito — Tomie', emoji: '😱', photo: '/books/IMG_1461.JPG' },
];

const reidShoppingList: { title: string; note: string; url?: string }[] = [
  { title: 'Game Changer (#1)', note: 'Missing earlier book', url: 'https://www.amazon.com/Game-Changer-Changers-1/dp/1335534628' },
  { title: 'Heated Rivalry (#2)', note: 'Missing earlier book', url: 'https://www.amazon.com/Heated-Rivalry-Game-Changers-2/dp/1335468439' },
  { title: 'The Long Game (#6)', note: 'Next in series', url: 'https://www.amazon.com/Long-Game-Changers/dp/1335534644' },
  { title: 'Unrivaled (#7)', note: 'Releases June 2027' },
];

type FilterTab = 'all' | 'manga' | 'oneshots' | 'books' | 'shopping' | 'photos';

export default function BooksPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState('');

  const seriesWithNext = mangaSeries.filter(s => s.nextVolumes && s.nextVolumes.length > 0);

  const openLightbox = (src: string, alt?: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt || '');
  };

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
    setLightboxAlt('');
  }, []);

  const navigateLightbox = useCallback((direction: number) => {
    if (!lightboxSrc) return;
    const currentIndex = photos.findIndex(p => p.src === lightboxSrc);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + photos.length) % photos.length;
    setLightboxSrc(photos[nextIndex].src);
    setLightboxAlt(photos[nextIndex].alt);
  }, [lightboxSrc]);

  useEffect(() => {
    if (!lightboxSrc) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxSrc, closeLightbox, navigateLightbox]);

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'photos', label: 'Photos' },
    { key: 'manga', label: 'Manga' },
    { key: 'oneshots', label: 'One-Shots' },
    { key: 'books', label: 'Books' },
    { key: 'shopping', label: 'Shopping List' },
  ];

  const PhotoTag = ({ photo, alt }: { photo: string; alt?: string }) => (
    <button
      onClick={() => openLightbox(photo, alt)}
      className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/60 transition-colors"
      title="View on shelf"
    >
      View on shelf
    </button>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] text-white">
      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white/60 hover:text-white text-3xl w-10 h-10 flex items-center justify-center"
          >
            &times;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/40 hover:text-white text-4xl w-12 h-12 flex items-center justify-center"
          >
            &lsaquo;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/40 hover:text-white text-4xl w-12 h-12 flex items-center justify-center"
          >
            &rsaquo;
          </button>
          <div
            className="relative w-[95vw] h-[90vh] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt={lightboxAlt}
              fill
              className="object-contain"
              sizes="95vw"
              priority
            />
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/40">
            {lightboxAlt}
            <span className="ml-4 text-white/20">← → to navigate · ESC to close</span>
          </p>
        </div>
      )}

      {/* Header */}
      <header className="relative px-6 pt-12 pb-8 text-center">
        <Link
          href="/"
          className="absolute top-6 left-6 text-sm text-white/50 hover:text-white/80 transition-colors"
        >
          ← Back
        </Link>
        <p className="text-sm uppercase tracking-[0.3em] text-pink-300/70 mb-3">
          The Collection
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-200 via-yellow-200 to-pink-200 bg-clip-text text-transparent">
          Our Bookshelf
        </h1>
        <p className="mt-4 text-white/50 max-w-md mx-auto text-sm sm:text-base">
          Manga, novels, and everything in between — plus what to grab next.
        </p>
      </header>

      {/* Tabs */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto flex gap-1 px-4 py-3 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-white border border-pink-400/30'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        {/* Photos Gallery */}
        {(activeTab === 'all' || activeTab === 'photos') && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-transparent" />
              Shelf Photos
              <span className="text-sm font-normal text-white/30 ml-2">{photos.length} photos</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {photos.map(photo => (
                <button
                  key={photo.src}
                  onClick={() => openLightbox(photo.src, photo.alt)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/[0.06] hover:border-white/20 transition-all"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="absolute bottom-2 left-3 right-3 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                    {photo.alt}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Manga Series */}
        {(activeTab === 'all' || activeTab === 'manga') && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gradient-to-r from-pink-500 to-transparent" />
              Manga Series
              <span className="text-sm font-normal text-white/30 ml-2">{mangaSeries.length} titles</span>
            </h2>
            <div className="grid gap-3">
              {mangaSeries.map(series => (
                <div
                  key={series.title}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all"
                >
                  <span className="text-2xl mt-0.5 shrink-0">{series.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors">
                        {series.title}
                      </h3>
                      <PhotoTag photo={series.photo} alt={`${series.title} on the shelf`} />
                    </div>
                    <p className="text-sm text-white/40 mt-0.5">
                      {series.volumes}
                      {series.totalVolumes && (
                        <span className="text-white/20"> · {series.totalVolumes} total</span>
                      )}
                    </p>
                    {series.nextVolumes && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {series.nextVolumes.map(vol => (
                          vol.url ? (
                            <a
                              key={vol.label}
                              href={vol.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-300/70 border border-pink-500/10 hover:bg-pink-500/20 hover:text-pink-200 transition-colors"
                            >
                              Need: {vol.label} ↗
                            </a>
                          ) : (
                            <span
                              key={vol.label}
                              className="text-xs px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-300/70 border border-pink-500/10"
                            >
                              Need: {vol.label}
                            </span>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* One-Shots */}
        {(activeTab === 'all' || activeTab === 'oneshots') && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gradient-to-r from-yellow-500 to-transparent" />
              One-Shots &amp; Complete
              <span className="text-sm font-normal text-white/30 ml-2">{oneShots.length} titles</span>
            </h2>
            <div className="grid gap-3">
              {oneShots.map(book => (
                <div
                  key={book.title}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all"
                >
                  <span className="text-2xl shrink-0">{book.emoji}</span>
                  <span className="font-semibold text-white/90">{book.title}</span>
                  <PhotoTag photo={book.photo} alt={`${book.title} on the shelf`} />
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-300/60 border border-green-500/10">
                    Complete
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Books */}
        {(activeTab === 'all' || activeTab === 'books') && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gradient-to-r from-purple-500 to-transparent" />
              Books
              <span className="text-sm font-normal text-white/30 ml-2">{booksList.length} titles</span>
            </h2>
            <div className="grid gap-3">
              {booksList.map(book => (
                <div
                  key={book.title}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all"
                >
                  <span className="text-2xl shrink-0">{book.emoji}</span>
                  <span className="font-semibold text-white/90">{book.title}</span>
                  <PhotoTag photo={book.photo} alt={`${book.title} on the shelf`} />
                </div>
              ))}

              {/* Rachel Reid sub-section */}
              <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-purple-500/[0.08] to-pink-500/[0.05] border border-purple-500/10">
                <h3 className="text-sm font-semibold text-purple-300/80 uppercase tracking-wider mb-3">
                  Rachel Reid — Game Changers Series
                </h3>
                <p className="text-sm text-white/40 mb-3">
                  Own: Tough Guy (#3), Common Goal (#4), Role Model (#5)
                </p>
                <div className="grid gap-2">
                  {reidShoppingList.map(item => (
                    <div key={item.title} className="flex items-center justify-between text-sm">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-pink-300 transition-colors"
                        >
                          {item.title} ↗
                        </a>
                      ) : (
                        <span className="text-white/70">{item.title}</span>
                      )}
                      <span className="text-xs px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-300/60 border border-pink-500/10">
                        {item.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Shopping List */}
        {(activeTab === 'all' || activeTab === 'shopping') && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gradient-to-r from-orange-500 to-transparent" />
              Next Volumes to Buy
              <span className="text-sm font-normal text-white/30 ml-2">{seriesWithNext.length} series</span>
            </h2>
            <div className="grid gap-4">
              {seriesWithNext.map(series => (
                <div
                  key={series.title}
                  className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/[0.06] to-yellow-500/[0.03] border border-orange-500/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{series.emoji}</span>
                    <h3 className="font-semibold text-white/90">{series.title}</h3>
                    <span className="text-xs text-white/30">
                      Have: {series.volumes}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {series.nextVolumes!.map(vol => (
                      vol.url ? (
                        <a
                          key={vol.label}
                          href={vol.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm px-3 py-1.5 rounded-full bg-orange-500/15 text-orange-200/80 border border-orange-500/15 hover:bg-orange-500/30 hover:text-orange-100 transition-colors"
                        >
                          → {vol.label} ↗
                        </a>
                      ) : (
                        <span
                          key={vol.label}
                          className="text-sm px-3 py-1.5 rounded-full bg-orange-500/15 text-orange-200/80 border border-orange-500/15"
                        >
                          → {vol.label}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              ))}

              {/* Rachel Reid in shopping list */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/[0.06] to-yellow-500/[0.03] border border-orange-500/10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">🏒</span>
                  <h3 className="font-semibold text-white/90">Rachel Reid — Game Changers</h3>
                  <span className="text-xs text-white/30">
                    Have: #3, #4, #5
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {reidShoppingList.map(item => (
                    item.url ? (
                      <a
                        key={item.title}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm px-3 py-1.5 rounded-full bg-orange-500/15 text-orange-200/80 border border-orange-500/15 hover:bg-orange-500/30 hover:text-orange-100 transition-colors"
                      >
                        → {item.title} ↗
                      </a>
                    ) : (
                      <span
                        key={item.title}
                        className="text-sm px-3 py-1.5 rounded-full bg-orange-500/15 text-orange-200/80 border border-orange-500/15"
                      >
                        → {item.title} ({item.note})
                      </span>
                    )
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Stats bar */}
        <div className="mt-16 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-center">
          <div className="flex justify-around">
            <div>
              <p className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                {mangaSeries.length}
              </p>
              <p className="text-xs text-white/30 mt-1">Manga Series</p>
            </div>
            <div>
              <p className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {oneShots.length}
              </p>
              <p className="text-xs text-white/30 mt-1">One-Shots</p>
            </div>
            <div>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                {booksList.length}
              </p>
              <p className="text-xs text-white/30 mt-1">Books</p>
            </div>
            <div>
              <p className="text-2xl font-bold bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                {seriesWithNext.reduce((acc, s) => acc + (s.nextVolumes?.length ?? 0), 0)}
              </p>
              <p className="text-xs text-white/30 mt-1">Volumes Needed</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
