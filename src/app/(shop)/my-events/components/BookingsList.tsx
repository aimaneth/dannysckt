'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import {
  Calendar,
  MapPin,
  Users,
  MoreVertical,
  Edit2,
  Trash2,
} from 'lucide-react';
import { Tables } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

type BookingWithEvent = Tables['event_bookings'] & {
  event: Tables['events'];
};

interface BookingsListProps {
  initialBookings?: BookingWithEvent[];
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function BookingsList({ initialBookings = [] }: BookingsListProps) {
  const [bookings, setBookings] = useState<BookingWithEvent[]>(initialBookings);
  const [isLoading, setIsLoading] = useState(!initialBookings.length);
  const [selectedBooking, setSelectedBooking] = useState<BookingWithEvent | null>(
    null
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/events/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedBooking) return;

    try {
      const response = await fetch(
        `/api/events/bookings/${selectedBooking.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) throw new Error('Failed to delete booking');

      setBookings((prev) =>
        prev.filter((booking) => booking.id !== selectedBooking.id)
      );
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel booking');
    } finally {
      setShowDeleteDialog(false);
      setSelectedBooking(null);
    }
  };

  // Load bookings if not provided initially
  if (!initialBookings.length && !isLoading && !bookings.length) {
    fetchBookings();
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="mt-4 h-4 w-1/4" />
            <Skeleton className="mt-2 h-4 w-1/5" />
          </div>
        ))}
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border bg-card p-6 text-center text-card-foreground shadow-sm"
      >
        <p className="text-muted-foreground">No bookings found</p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {bookings.map((booking) => (
          <motion.div
            key={booking.id}
            variants={item}
            className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{booking.event.title}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(booking.event.date), 'PPP')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{booking.event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{booking.number_of_guests} guests</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={statusColors[booking.status as keyof typeof statusColors]}
                >
                  {booking.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => {
                        // Handle edit
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                      <span>Edit Booking</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-destructive"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowDeleteDialog(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Cancel Booking</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 