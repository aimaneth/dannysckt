'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Tables } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const bookingSchema = z.object({
  number_of_guests: z.number().min(1, 'At least 1 guest required').max(50, 'Maximum 50 guests allowed'),
  special_requests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  event: Tables['events'];
  onSuccess: () => void;
}

export default function BookingForm({ event, onSuccess }: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      number_of_guests: 1,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/events/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_id: event.id,
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create booking');
      }

      toast.success('Booking Successful!', {
        description: 'Your booking request has been submitted.'
      });
      onSuccess();
    } catch (error) {
      toast.error('Failed to create booking', {
        description: error instanceof Error ? error.message : 'Please try again or contact support if the problem persists.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
    >
      <div className="mb-6 space-y-2">
        <h3 className="text-2xl font-semibold tracking-tight">Book Your Spot</h3>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to reserve your place at this event.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 rounded-lg bg-muted p-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{format(new Date(event.date), 'PPP')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{event.capacity} spots available</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="number_of_guests"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Number of Guests
          </label>
          <Input
            {...register('number_of_guests', { valueAsNumber: true })}
            type="number"
            min={1}
            max={50}
            disabled={isLoading}
          />
          {errors.number_of_guests && (
            <AnimatePresence>
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive"
              >
                {errors.number_of_guests.message}
              </motion.p>
            </AnimatePresence>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="special_requests"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Special Requests
          </label>
          <Textarea
            {...register('special_requests')}
            placeholder="Any dietary requirements or special requests?"
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>Processing...</span>
            </motion.div>
          ) : (
            'Book Now'
          )}
        </Button>
      </form>
    </motion.div>
  );
} 