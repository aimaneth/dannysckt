'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  Calendar,
  Filter,
  Users,
  MapPin,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Tables } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

type BookingWithDetails = Tables['event_bookings'] & {
  event: Tables['events'];
  user: Pick<Tables['users'], 'id' | 'email'>;
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function VendorBookingsPage() {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    event: '',
    fromDate: '',
    toDate: '',
  });
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState<'confirmed' | 'cancelled'>('confirmed');

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.event) params.append('event_id', filters.event);
      if (filters.fromDate) params.append('from_date', filters.fromDate);
      if (filters.toDate) params.append('to_date', filters.toDate);

      const response = await fetch(`/api/vendor/bookings?${params}`);
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkStatusUpdate = async () => {
    try {
      const response = await fetch('/api/vendor/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_ids: selectedBookings,
          status: newStatus,
        }),
      });

      if (!response.ok) throw new Error('Failed to update bookings');

      await fetchBookings();
      setSelectedBookings([]);
      toast.success(`Successfully updated ${selectedBookings.length} bookings`);
    } catch (error) {
      toast.error('Failed to update bookings');
    } finally {
      setShowStatusDialog(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filters]);

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
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-1/5" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Bookings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage and track all event bookings
          </p>
        </div>

        {selectedBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <Button
              variant="outline"
              onClick={() => {
                setNewStatus('confirmed');
                setShowStatusDialog(true);
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirm Selected
            </Button>
            <Button
              variant="outline"
              className="text-destructive"
              onClick={() => {
                setNewStatus('cancelled');
                setShowStatusDialog(true);
              }}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Selected
            </Button>
          </motion.div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Refine the bookings list</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">From Date</label>
              <Input
                type="date"
                value={filters.fromDate}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, fromDate: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">To Date</label>
              <Input
                type="date"
                value={filters.toDate}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, toDate: e.target.value }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {bookings.map((booking) => (
          <motion.div key={booking.id} variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={selectedBookings.includes(booking.id)}
                    onCheckedChange={(checked) => {
                      setSelectedBookings((prev) =>
                        checked
                          ? [...prev, booking.id]
                          : prev.filter((id) => id !== booking.id)
                      );
                    }}
                  />
                  <div>
                    <CardTitle>{booking.event.title}</CardTitle>
                    <CardDescription>{booking.user.email}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    statusColors[booking.status as keyof typeof statusColors]
                  }
                >
                  {booking.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(booking.event.date), 'PPP')}</span>
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
                {booking.special_requests && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Special requests: {booking.special_requests}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Booking Status</DialogTitle>
            <DialogDescription>
              Are you sure you want to {newStatus === 'confirmed' ? 'confirm' : 'cancel'}{' '}
              {selectedBookings.length} booking(s)?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleBulkStatusUpdate}>
              {newStatus === 'confirmed' ? 'Confirm' : 'Cancel'} Bookings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 