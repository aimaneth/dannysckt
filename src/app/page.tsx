'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChefHat, Clock, Star, Users, Award, Utensils, Heart } from 'lucide-react';
import { MotionDiv, fadeIn, staggerContainer } from '@/components/home/HomeAnimations';
import { useLanguage } from '@/contexts/LanguageContext';
import { InstagramFeed } from '@/components/instagram/InstagramFeed';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
        {/* Background Video/Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-10" />
          <Image
            src="/images/hero-bg.jpg"
            alt="Char Kuey Teow"
            fill
            className="object-cover scale-105 animate-[zoom_20s_ease-in-out_infinite_alternate]"
            priority
          />
        </div>
        
        {/* Content */}
        <MotionDiv 
          className="relative z-10 container mx-auto px-4 text-center text-white"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <MotionDiv variants={fadeIn} className="mb-8">
            <span className="text-orange-400 text-lg md:text-xl font-medium tracking-wider uppercase mb-4 block">
              {t('hero.welcome')}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {t('hero.title')}
              <span className="block text-orange-400 mt-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 animate-[shimmer_2s_infinite] bg-[length:200%_auto] bg-clip-text text-transparent">
                {t('hero.subtitle')}
              </span>
          </h1>
          </MotionDiv>
          <MotionDiv 
            variants={fadeIn}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200"
          >
            {t('hero.description')}
          </MotionDiv>
          <MotionDiv 
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              asChild 
              className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-6 rounded-full transition-transform hover:scale-105"
            >
              <Link href="/products">
                {t('hero.viewProducts')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 hover:bg-white/10 text-lg px-8 py-6 rounded-full transition-transform hover:scale-105"
              asChild
            >
              <Link href="/events">{t('hero.bookEvent')}</Link>
            </Button>
          </MotionDiv>
        </MotionDiv>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-[scroll_1.5s_infinite]" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted">
        <MotionDiv 
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <span className="text-orange-500 text-sm uppercase tracking-wider font-medium">{t('features.subtitle')}</span>
            <h2 className="text-4xl font-bold mt-2">{t('features.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ChefHat,
                title: t('features.chef.title'),
                description: t('features.chef.description')
              },
              {
                icon: Award,
                title: t('features.quality.title'),
                description: t('features.quality.description')
              },
              {
                icon: Heart,
                title: t('features.love.title'),
                description: t('features.love.description')
              }
            ].map((feature, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative">
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="rounded-full w-16 h-16 bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                      <feature.icon className="h-8 w-8 text-orange-500" />
                  </div>
                    <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg">{feature.description}</p>
                </CardContent>
              </Card>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-sm uppercase tracking-wider font-medium">{t('gallery.subtitle')}</span>
            <h2 className="text-4xl font-bold mt-2">{t('gallery.title')}</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t('gallery.description')}
            </p>
          </div>
          <InstagramFeed />
        </div>
      </section>

      {/* Special Events Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <MotionDiv 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/events-bg.jpg"
                alt="Private Events"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="space-y-8">
              <div>
                <span className="text-orange-500 text-sm uppercase tracking-wider font-medium">{t('events.subtitle')}</span>
                <h2 className="text-4xl font-bold mt-2">{t('events.title')}</h2>
              </div>
              <p className="text-xl text-muted-foreground">
                {t('events.description')}
              </p>
              <ul className="space-y-4">
                {[
                  t('events.private'),
                  t('events.corporate'),
                  t('events.cooking'),
                  t('events.tasting')
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link href="/events">
                  {t('events.learnMore')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cta-bg.jpg"
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-orange-600/90 mix-blend-multiply" />
        </div>
        <MotionDiv 
          className="container mx-auto px-4 text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('cta.title')}
            <span className="block mt-2">{t('cta.subtitle')}</span>
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90">
            {t('cta.description')}
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="rounded-full px-10 py-6 text-lg bg-white text-orange-600 hover:bg-white/90 hover:scale-105 transition-transform"
            asChild
          >
            <Link href="/products">{t('cta.orderNow')}</Link>
          </Button>
        </MotionDiv>
      </section>
    </>
  );
}
