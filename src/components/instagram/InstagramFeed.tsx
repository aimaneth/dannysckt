'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data generator - Replace with actual Instagram API data
const generateMockPosts = (page: number) => {
  const baseIndex = (page - 1) * 6;
  return Array(6).fill(null).map((_, i) => ({
    id: `${baseIndex + i + 1}`,
    mediaUrl: `https://source.unsplash.com/1600x900/?food,noodles&sig=${baseIndex + i}`,
    caption: [
      'Delicious Char Kway Teow fresh from the wok! 🍜',
      'Our signature wok hei flavor in every bite 🔥',
      'Master Chef Danny in action! 👨‍🍳',
      'Join us for a memorable dining experience 🏮',
      'Fresh ingredients make all the difference! 🌿',
      'Behind the scenes at Danny\'s CKT 👨‍🍳',
    ][i % 6],
    permalink: 'https://instagram.com',
  }));
};

const AUTOPLAY_INTERVAL = 4000; // 4 seconds between slides

export function InstagramFeed() {
  const [posts, setPosts] = useState(generateMockPosts(1));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const startAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    if (autoplayEnabled) {
      autoplayIntervalRef.current = setInterval(scrollNext, AUTOPLAY_INTERVAL);
    }
  }, [scrollNext, autoplayEnabled]);

  const stopAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

  // Handle autoplay
  useEffect(() => {
    if (!emblaApi || !autoplayEnabled) return;
    startAutoplay();
    return () => stopAutoplay();
  }, [emblaApi, autoplayEnabled, startAutoplay, stopAutoplay]);

  // Handle scroll position updates
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Handle infinite loading
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const nextPage = page + 1;
      const newPosts = generateMockPosts(nextPage);
      setPosts(prev => [...prev, ...newPosts]);
      setPage(nextPage);
      
      if (nextPage >= 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  // Handle mouse interactions
  const handleMouseEnter = useCallback(() => {
    setAutoplayEnabled(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setAutoplayEnabled(true);
  }, []);

  return (
    <div className="relative w-full">
      {/* Instagram Icon */}
      <a
        href="https://instagram.com/dannysckt"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
      >
        <Instagram className="h-4 w-4" />
        <span className="text-sm font-medium">Follow Us</span>
      </a>

      {/* Carousel Navigation */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70",
          !canScrollPrev && "opacity-0"
        )}
        onClick={scrollPrev}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={!canScrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70",
          !canScrollNext && "opacity-0"
        )}
        onClick={scrollNext}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={!canScrollNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Carousel */}
      <div 
        ref={emblaRef} 
        className="overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex -ml-4">
          {posts.map((post) => (
            <div key={post.id} className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] flex-[0_0_20%] pl-4">
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative overflow-hidden"
              >
                <AspectRatio ratio={1}>
                  <img
                    src={post.mediaUrl}
                    alt={post.caption}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-center px-4 text-sm line-clamp-3">{post.caption}</p>
                  </div>
                </AspectRatio>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
        </div>
      )}
    </div>
  );
} 