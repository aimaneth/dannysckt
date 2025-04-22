'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ConsultationForm } from './ConsultationForm';
import { ArrowRight } from 'lucide-react';

interface ConsultationDialogProps {
  className?: string;
}

export function ConsultationDialog({ className }: ConsultationDialogProps) {
  const { t } = useLanguage();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className={className}>
          {t('business.hero.consultation')}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule a Business Consultation</DialogTitle>
          <DialogDescription>
            Fill out the form below to schedule a consultation with our business development team. We will contact you to confirm the appointment.
          </DialogDescription>
        </DialogHeader>
        <ConsultationForm />
      </DialogContent>
    </Dialog>
  );
} 