'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useLanguage } from '@/contexts/LanguageContext';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

interface InfoPackDownloadProps {
  className?: string;
}

export function InfoPackDownload({ className }: InfoPackDownloadProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const supabase = createClientComponentClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Record the download in Supabase
      const { error } = await supabase
        .from('info_pack_downloads')
        .insert([
          {
            name: values.name,
            email: values.email,
          }
        ]);

      if (error) throw error;

      // Trigger the download
      const link = document.createElement('a');
      link.href = '/downloads/dannys-ckt-business-info-pack.pdf';
      link.download = 'DannysCKT-Business-Information-Pack.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setShowForm(false);
      toast.success('Thank you! Your download should begin shortly.');
    } catch (error) {
      toast.error('Failed to process your request. Please try again.');
      console.error('Info pack download error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className={className}>
          {t('business.hero.download')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Download Business Information Pack</DialogTitle>
          <DialogDescription>
            Get detailed information about starting your Danny's CKT business. Enter your details below to download our comprehensive business information pack.
          </DialogDescription>
        </DialogHeader>
        {showForm ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t('common.submitting') : t('business.hero.download')}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">
              Your download should begin automatically. If it doesn't,
              <Button
                variant="link"
                className="px-1"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/downloads/dannys-ckt-business-info-pack.pdf';
                  link.download = 'DannysCKT-Business-Information-Pack.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                click here
              </Button>
              to try again.
            </p>
            <Button variant="outline" onClick={() => setShowForm(true)}>
              {t('business.hero.download')}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 