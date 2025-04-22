'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChefHat, Clock, MapPin, Phone, Utensils } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Note: metadata export is not needed in client components
// export const metadata: Metadata = {
//   title: 'About Us | Danny\'s CKT',
//   description: 'Learn about Danny\'s Char Kuey Teow, our story, and our commitment to authentic Malaysian street food.',
// };

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-background z-10" />
        <Image
          src="/images/about-hero.jpg"
          alt="Danny's CKT Kitchen"
          fill
          className="object-cover object-[center_59%]"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div 
            className="text-center text-white max-w-4xl px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-amber-500"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {t('about.hero.title')}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t('about.hero.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-16 items-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="space-y-8"
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                {t('about.story.title')}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t('about.story.description')}
              </p>
            </motion.div>
            <motion.div 
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              variants={fadeInUp}
            >
              <Image
                src="/images/chef-cooking.jpg"
                alt="Chef cooking Char Kuey Teow"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              {t('about.philosophy.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              {t('about.philosophy.description')}
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="group bg-card hover:bg-card/80 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
              variants={fadeInUp}
            >
              <ChefHat className="w-12 h-12 mb-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                {t('about.philosophy.expertChefs.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.philosophy.expertChefs.description')}
              </p>
            </motion.div>

            <motion.div 
              className="group bg-card hover:bg-card/80 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
              variants={fadeInUp}
            >
              <Utensils className="w-12 h-12 mb-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                {t('about.philosophy.quality.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.philosophy.quality.description')}
              </p>
            </motion.div>

            <motion.div 
              className="group bg-card hover:bg-card/80 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 md:col-span-2 lg:col-span-1"
              variants={fadeInUp}
            >
              <ChefHat className="w-12 h-12 mb-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                {t('about.philosophy.traditional.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.philosophy.traditional.description')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="bg-card rounded-3xl p-12 md:p-16 shadow-xl border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              {t('about.visit.title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <motion.div 
                className="flex items-start space-x-6 group"
                variants={fadeInUp}
              >
                <Clock className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                    {t('about.visit.hours.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{t('about.visit.hours.weekdays')}</p>
                  <p className="text-muted-foreground leading-relaxed">{t('about.visit.hours.weekends')}</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-6 group"
                variants={fadeInUp}
              >
                <MapPin className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                    {t('about.visit.location.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{t('about.visit.location.address1')}</p>
                  <p className="text-muted-foreground leading-relaxed">{t('about.visit.location.address2')}</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-6 group"
                variants={fadeInUp}
              >
                <Phone className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                    {t('about.visit.contact.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{t('about.visit.contact.phone')}</p>
                  <p className="text-muted-foreground leading-relaxed">{t('about.visit.contact.email')}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {t('cta.title')} <span className="block">{t('cta.subtitle')}</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t('cta.description')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors duration-200"
              >
                {t('cta.orderNow')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 