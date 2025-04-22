'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, ChefHat, Clock, Utensils } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function EventsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <Image
          src="/images/events-hero.jpg"
          alt="Event Catering"
          fill
          className="object-cover object-[center_55%] brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('events.hero.title')}
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('events.hero.description')}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-card rounded-lg p-6 text-center"
            variants={fadeInUp}
          >
            <ChefHat className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{t('events.stats.chefsCount')}</div>
            <div className="text-sm text-muted-foreground">{t('events.stats.chefs')}</div>
          </motion.div>
          <motion.div 
            className="bg-card rounded-lg p-6 text-center"
            variants={fadeInUp}
          >
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{t('events.stats.eventsCateredCount')}</div>
            <div className="text-sm text-muted-foreground">{t('events.stats.eventsCatered')}</div>
          </motion.div>
          <motion.div 
            className="bg-card rounded-lg p-6 text-center"
            variants={fadeInUp}
          >
            <Utensils className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{t('events.stats.menuItemsCount')}</div>
            <div className="text-sm text-muted-foreground">{t('events.stats.menuItems')}</div>
          </motion.div>
          <motion.div 
            className="bg-card rounded-lg p-6 text-center"
            variants={fadeInUp}
          >
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{t('events.stats.support')}</div>
            <div className="text-sm text-muted-foreground">{t('events.stats.supportDesc')}</div>
          </motion.div>
        </motion.div>

        {/* Services Section */}
        <motion.div 
          className="space-y-12 mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div 
            className="relative overflow-hidden bg-card rounded-lg shadow-lg"
            variants={fadeInUp}
          >
            <div className="md:grid md:grid-cols-2">
              <div className="relative h-64 md:h-full min-h-[300px]">
                <Image
                  src="/images/corporate-events.jpg"
                  alt="Corporate Events"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-4">{t('events.corporate.title')}</h2>
                <p className="text-muted-foreground mb-6">
                  {t('events.corporate.description')}
                </p>
                <ul className="space-y-3">
                  {(t('events.corporate.items') as string[]).map((item, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <span className="h-2 w-2 bg-primary rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {t('events.corporate.minPax')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative overflow-hidden bg-card rounded-lg shadow-lg"
            variants={fadeInUp}
          >
            <div className="md:grid md:grid-cols-2 md:flex-row-reverse">
              <div className="relative h-64 md:h-full min-h-[300px] md:order-2">
                <Image
                  src="/images/private-events.jpg"
                  alt="Private Celebrations"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:order-1">
                <h2 className="text-2xl font-semibold mb-4">{t('events.private.title')}</h2>
                <p className="text-muted-foreground mb-6">
                  {t('events.private.description')}
                </p>
                <ul className="space-y-3">
                  {(t('events.private.items') as string[]).map((item, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <span className="h-2 w-2 bg-primary rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {t('events.private.minPax')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative overflow-hidden bg-card rounded-lg shadow-lg"
            variants={fadeInUp}
          >
            <div className="md:grid md:grid-cols-2">
              <div className="relative h-64 md:h-full min-h-[300px]">
                <Image
                  src="/images/festivals.jpg"
                  alt="Food Festivals & Markets"
                  fill
                  className="object-cover object-[center_57%]"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-4">{t('events.festivals.title')}</h2>
                <p className="text-muted-foreground mb-6">
                  {t('events.festivals.description')}
                </p>
                <ul className="space-y-3">
                  {(t('events.festivals.items') as string[]).map((item, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <span className="h-2 w-2 bg-primary rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Booking Form */}
        <motion.div 
          className="bg-card p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-8 text-center">{t('events.booking.title')}</h2>
          <form className="space-y-6 max-w-3xl mx-auto">
            <div className="space-y-4">
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium mb-2">
                  {t('events.booking.eventType.label')}
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                >
                  <option value="">{t('events.booking.eventType.placeholder')}</option>
                  <option value="corporate">{t('events.booking.eventType.corporate')}</option>
                  <option value="private">{t('events.booking.eventType.private')}</option>
                  <option value="festival">{t('events.booking.eventType.festival')}</option>
                  <option value="other">{t('events.booking.eventType.other')}</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('events.booking.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium mb-2">
                    {t('events.booking.organization')}
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('events.booking.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    {t('events.booking.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-2">
                    {t('events.booking.date')}
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium mb-2">
                    {t('events.booking.guests')}
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    min="30"
                    className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-2">
                  {t('events.booking.location')}
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder={t('events.booking.locationPlaceholder') as string}
                  className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium mb-2">
                  {t('events.booking.requirements')}
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  placeholder={t('events.booking.requirementsPlaceholder') as string}
                  className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="rounded border-gray-300"
                required
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                {t('events.booking.terms')}
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all font-medium hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('events.booking.submit')}
            </button>
          </form>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div 
          className="mt-16 bg-muted p-8 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-8 text-center">{t('events.whyChoose.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-card rounded-lg p-6 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChefHat className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('events.whyChoose.live.title')}</h3>
              <p className="text-muted-foreground">
                {t('events.whyChoose.live.description')}
              </p>
            </motion.div>
            <motion.div 
              className="bg-card rounded-lg p-6 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('events.whyChoose.service.title')}</h3>
              <p className="text-muted-foreground">
                {t('events.whyChoose.service.description')}
              </p>
            </motion.div>
            <motion.div 
              className="bg-card rounded-lg p-6 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Utensils className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('events.whyChoose.packages.title')}</h3>
              <p className="text-muted-foreground">
                {t('events.whyChoose.packages.description')}
              </p>
            </motion.div>
            <motion.div 
              className="bg-card rounded-lg p-6 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Clock className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('events.whyChoose.quality.title')}</h3>
              <p className="text-muted-foreground">
                {t('events.whyChoose.quality.description')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 