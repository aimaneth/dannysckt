'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FAQPage() {
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
            <h1 className="text-4xl font-bold mb-4">{t('faq.title')}</h1>
            <p className="text-muted-foreground">{t('faq.description')}</p>
          </motion.div>

          {/* General Questions */}
          <motion.section variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-6">{t('faq.general.title')}</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">{t('faq.general.q1')}</AccordionTrigger>
                <AccordionContent>{t('faq.general.a1')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">{t('faq.general.q2')}</AccordionTrigger>
                <AccordionContent>{t('faq.general.a2')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">{t('faq.general.q3')}</AccordionTrigger>
                <AccordionContent>{t('faq.general.a3')}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.section>

          {/* Business Questions */}
          <motion.section variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-6">{t('faq.business.title')}</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">{t('faq.business.q1')}</AccordionTrigger>
                <AccordionContent>{t('faq.business.a1')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">{t('faq.business.q2')}</AccordionTrigger>
                <AccordionContent>{t('faq.business.a2')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">{t('faq.business.q3')}</AccordionTrigger>
                <AccordionContent>{t('faq.business.a3')}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.section>

          {/* Events Questions */}
          <motion.section variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-6">{t('faq.events.title')}</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">{t('faq.events.q1')}</AccordionTrigger>
                <AccordionContent>{t('faq.events.a1')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">{t('faq.events.q2')}</AccordionTrigger>
                <AccordionContent>{t('faq.events.a2')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">{t('faq.events.q3')}</AccordionTrigger>
                <AccordionContent>{t('faq.events.a3')}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.section>

          {/* Contact Section */}
          <motion.section variants={fadeIn} className="text-center mt-16">
            <h2 className="text-2xl font-semibold mb-4">{t('faq.questions.title')}</h2>
            <p className="text-muted-foreground mb-6">{t('faq.questions.description')}</p>
            <Button asChild>
              <Link href="/contact">{t('faq.questions.contact')}</Link>
            </Button>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
} 