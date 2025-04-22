'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tables } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Check, PackageCheck } from 'lucide-react';

type Benefits = {
  discount_percentage?: number;
  free_delivery?: boolean;
  priority_support?: boolean;
  training_sessions?: number;
  max_order_value?: number;
};

type BenefitKey = keyof Benefits;

type DistributorPackage = Tables['distributor_packages'];

interface DistributorRegistrationFormProps {
  packages: DistributorPackage[];
  userId: string;
}

const businessSchema = z.object({
  package_id: z.string().uuid(),
  business_name: z.string().min(2, 'Business name is required'),
  business_type: z.enum(['stall', 'restaurant', 'catering']),
  contact_person: z.string().min(2, 'Contact person name is required'),
  contact_number: z.string().min(8, 'Valid contact number is required'),
  address_line1: z.string().min(5, 'Address is required'),
  address_line2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postal_code: z.string().min(5, 'Valid postal code is required'),
});

type BusinessFormData = z.infer<typeof businessSchema>;

export function DistributorRegistrationForm({ packages, userId }: DistributorRegistrationFormProps) {
  const [selectedPackage, setSelectedPackage] = useState<DistributorPackage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
  });

  const onSubmit = async (data: BusinessFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/distributor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          business_address: {
            line1: data.address_line1,
            line2: data.address_line2,
            city: data.city,
            state: data.state,
            postal_code: data.postal_code,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      toast.success('Registration successful!');
      router.push('/distributor/dashboard');
    } catch (error) {
      toast.error('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Package Selection */}
      <div className="grid gap-4 md:grid-cols-3">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`relative cursor-pointer transition-all ${
              selectedPackage?.id === pkg.id
                ? 'border-primary shadow-lg'
                : 'hover:border-primary/50'
            }`}
            onClick={() => {
              setSelectedPackage(pkg);
              setValue('package_id', pkg.id);
              setValue('business_type', pkg.business_type as 'stall' | 'restaurant' | 'catering');
            }}
          >
            {selectedPackage?.id === pkg.id && (
              <div className="absolute right-4 top-4">
                <Check className="h-5 w-5 text-primary" />
              </div>
            )}
            <CardHeader>
              <CardTitle>{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">RM {pkg.price}</span>
                <span className="text-muted-foreground">/{pkg.duration_months} months</span>
              </div>
              <ul className="space-y-2 text-sm">
                {Object.entries(pkg.benefits as Benefits).map(([key, value]) => {
                  const typedKey = key as BenefitKey;
                  return (
                    <li key={key} className="flex items-center">
                      <PackageCheck className="mr-2 h-4 w-4 text-primary" />
                      {typedKey === 'discount_percentage' && typeof value === 'number' && (
                        <span>{value}% discount on all products</span>
                      )}
                      {typedKey === 'free_delivery' && value === true && (
                        <span>Free delivery on all orders</span>
                      )}
                      {typedKey === 'priority_support' && value === true && (
                        <span>Priority customer support</span>
                      )}
                      {typedKey === 'training_sessions' && typeof value === 'number' && (
                        <span>{value} free training sessions</span>
                      )}
                      {typedKey === 'max_order_value' && typeof value === 'number' && (
                        <span>Up to RM{value} order value</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPackage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Please provide your business details for registration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="business_name">Business Name</Label>
                  <Input
                    {...register('business_name')}
                    id="business_name"
                    placeholder="Your business name"
                  />
                  {errors.business_name && (
                    <p className="text-sm text-destructive">
                      {errors.business_name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_type">Business Type</Label>
                  <Select
                    value={watch('business_type')}
                    onValueChange={(value) =>
                      setValue('business_type', value as 'stall' | 'restaurant' | 'catering')
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stall">Food Stall</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="catering">Catering Service</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.business_type && (
                    <p className="text-sm text-destructive">
                      {errors.business_type.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_person">Contact Person</Label>
                  <Input
                    {...register('contact_person')}
                    id="contact_person"
                    placeholder="Full name"
                  />
                  {errors.contact_person && (
                    <p className="text-sm text-destructive">
                      {errors.contact_person.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_number">Contact Number</Label>
                  <Input
                    {...register('contact_number')}
                    id="contact_number"
                    placeholder="Phone number"
                  />
                  {errors.contact_number && (
                    <p className="text-sm text-destructive">
                      {errors.contact_number.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Business Address</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address_line1">Address Line 1</Label>
                    <Input
                      {...register('address_line1')}
                      id="address_line1"
                      placeholder="Street address"
                    />
                    {errors.address_line1 && (
                      <p className="text-sm text-destructive">
                        {errors.address_line1.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address_line2">Address Line 2 (Optional)</Label>
                    <Input
                      {...register('address_line2')}
                      id="address_line2"
                      placeholder="Apartment, suite, etc."
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input {...register('city')} id="city" placeholder="City" />
                      {errors.city && (
                        <p className="text-sm text-destructive">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input {...register('state')} id="state" placeholder="State" />
                      {errors.state && (
                        <p className="text-sm text-destructive">
                          {errors.state.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postal_code">Postal Code</Label>
                      <Input
                        {...register('postal_code')}
                        id="postal_code"
                        placeholder="Postal code"
                      />
                      {errors.postal_code && (
                        <p className="text-sm text-destructive">
                          {errors.postal_code.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Complete Registration'}
          </Button>
        </motion.div>
      )}
    </form>
  );
} 