'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import GoogleMap from '@/components/maps/GoogleMap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

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

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      // TODO: Implement actual form submission logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      toast.success('Message sent successfully!');
      form.reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-orange-600/10 py-16 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              {t('contact.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('contact.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-5xl mx-auto"
        >
          {/* Contact Info Cards */}
          <motion.div 
            variants={fadeIn}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            <div className="p-6 rounded-lg bg-card border flex flex-col items-center text-center">
              <Phone className="h-8 w-8 mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{t('contact.info.phone.title')}</h3>
              <p className="text-muted-foreground">{t('contact.info.phone.value')}</p>
            </div>
            <div className="p-6 rounded-lg bg-card border flex flex-col items-center text-center">
              <Mail className="h-8 w-8 mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{t('contact.info.email.title')}</h3>
              <p className="text-muted-foreground">{t('contact.info.email.value')}</p>
            </div>
            <div className="p-6 rounded-lg bg-card border flex flex-col items-center text-center">
              <MapPin className="h-8 w-8 mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{t('contact.info.address.title')}</h3>
              <p className="text-muted-foreground">{t('contact.info.address.value')}</p>
            </div>
            <div className="p-6 rounded-lg bg-card border flex flex-col items-center text-center">
              <Clock className="h-8 w-8 mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{t('contact.hours.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('contact.hours.weekdays')}
                <br />
                {t('contact.hours.weekends')}
              </p>
            </div>
          </motion.div>

          {/* Map Section */}
          <section className="container mx-auto px-4 py-12">
            <GoogleMap 
              address="Jalan Tun Dr Awang, 11900 Bayan Lepas, Pulau Pinang"
              height="450px"
            />
          </section>

          {/* Contact Form */}
          <motion.div variants={fadeIn} className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">{t('contact.form.title')}</h2>
              <p className="text-muted-foreground">{t('contact.form.description')}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t('contact.form.name')}
                  </label>
                  <Input
                    id="name"
                    {...register('name')}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t('contact.form.email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  {t('contact.form.subject')}
                </label>
                <Input
                  id="subject"
                  {...register('subject')}
                  className={errors.subject ? 'border-destructive' : ''}
                />
                {errors.subject && (
                  <p className="text-sm text-destructive">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t('contact.form.message')}
                </label>
                <Textarea
                  id="message"
                  {...register('message')}
                  className={`w-full min-h-[150px] ${errors.message ? 'border-destructive' : ''}`}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t('common.submitting') : t('contact.form.submit')}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 