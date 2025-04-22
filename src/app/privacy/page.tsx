'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">{t('privacy.title')}</h1>
            <p className="text-muted-foreground">{t('privacy.lastUpdated')}</p>
          </motion.div>

          {/* Introduction */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('privacy.intro.title')}</h2>
            <p>{t('privacy.intro.description')}</p>
          </motion.section>

          {/* Information Collection */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('privacy.collection.title')}</h2>
            <p className="text-lg mb-4">{t('privacy.collection.description')}</p>
            <ul className="space-y-3">
              {(t('privacy.collection.items') as string[]).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 bg-primary rounded-full mr-3 mt-2"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Information Use */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('privacy.use.title')}</h2>
            <p className="text-lg mb-4">{t('privacy.use.description')}</p>
            <ul className="space-y-3">
              {(t('privacy.use.items') as string[]).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 bg-primary rounded-full mr-3 mt-2"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Information Sharing */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('privacy.sharing.title')}</h2>
            <p className="text-lg mb-4">{t('privacy.sharing.description')}</p>
            <ul className="space-y-3">
              {(t('privacy.sharing.items') as string[]).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 bg-primary rounded-full mr-3 mt-2"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Security */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('privacy.security.title')}</h2>
            <p className="text-lg">{t('privacy.security.description')}</p>
          </motion.section>

          {/* Cookies */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('privacy.cookies.title')}</h2>
            <p className="text-lg">{t('privacy.cookies.description')}</p>
          </motion.section>

          {/* Your Rights */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('privacy.rights.title')}</h2>
            <p className="text-lg mb-4">{t('privacy.rights.description')}</p>
            <ul className="space-y-3">
              {(t('privacy.rights.items') as string[]).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 bg-primary rounded-full mr-3 mt-2"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Contact */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('privacy.contact.title')}</h2>
            <p className="text-lg">{t('privacy.contact.description')}</p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
} 