'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
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
            <h1 className="text-5xl font-bold mb-4">{t('terms.title')}</h1>
            <p className="text-muted-foreground">{t('terms.lastUpdated')}</p>
          </motion.div>

          {/* Introduction */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('terms.intro.title')}</h2>
            <p className="text-lg">{t('terms.intro.description')}</p>
          </motion.section>

          {/* Acceptance */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('terms.acceptance.title')}</h2>
            <p className="text-lg">{t('terms.acceptance.description')}</p>
          </motion.section>

          {/* Services */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('terms.services.title')}</h2>
            <p className="text-lg mb-4">{t('terms.services.description')}</p>
            <ul className="space-y-3">
              {(t('terms.services.items') as string[]).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 bg-primary rounded-full mr-3 mt-2"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Account Responsibilities */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('terms.account.title')}</h2>
            <p className="text-lg mb-4">{t('terms.account.description')}</p>
            <ul className="space-y-3">
              {(t('terms.account.items') as string[]).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 bg-primary rounded-full mr-3 mt-2"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Intellectual Property */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('terms.ip.title')}</h2>
            <p className="text-lg">{t('terms.ip.description')}</p>
          </motion.section>

          {/* Limitation of Liability */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('terms.liability.title')}</h2>
            <p className="text-lg">{t('terms.liability.description')}</p>
          </motion.section>

          {/* Termination */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('terms.termination.title')}</h2>
            <p className="text-lg">{t('terms.termination.description')}</p>
          </motion.section>

          {/* Governing Law */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('terms.governing.title')}</h2>
            <p className="text-lg">{t('terms.governing.description')}</p>
          </motion.section>

          {/* Contact */}
          <motion.section variants={fadeIn} className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">{t('terms.contact.title')}</h2>
            <p className="text-lg">{t('terms.contact.description')}</p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
} 