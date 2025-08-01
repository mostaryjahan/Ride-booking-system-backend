import { z } from 'zod';

export const createRideZodSchema = z.object({
  pickupLocation: z.object({
    address: z.string().min(3, 'Pickup address must be at least 3 characters'),
    lat: z.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
    lng: z.number().min(-180).max(180, 'Longitude must be between -180 and 180'),
  }),
  dropOffLocation: z.object({
    address: z.string().min(3, 'Drop-off address must be at least 3 characters'),
    lat: z.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
    lng: z.number().min(-180).max(180, 'Longitude must be between -180 and 180'),
  }),
  fare: z.number().min(0, 'Fare cannot be negative'),
});

export const updateRideStatusZodSchema = z.object({
  status: z.enum(
    ['accepted', 'rejected', 'picked_up', 'in_transit', 'completed', 'canceled'] as const,
    {
      errorMap: () => ({ message: 'Invalid status' }),
    }
  ),

});