import { Schema, model, Types } from 'mongoose';
import { IRide } from './ride.interface';


const rideSchema = new Schema<IRide>({
  riderId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  driverId: { type: Types.ObjectId, ref: 'User' },
  pickupLocation: {
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  dropOffLocation: {
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  fare: { type: Number, required: true },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'rejected', 'picked_up', 'in_transit', 'completed', 'canceled'],
    default: 'requested',
  },
  requestedAt: { type: Date, default: Date.now },
  acceptedAt: { type: Date },
  completedAt: { type: Date },
});

// Middleware to set timestamps on status changes
rideSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    if (this.status === 'accepted') this.acceptedAt = new Date();
    if (this.status === 'completed') this.completedAt = new Date();
  }
  next();
});

export const Ride = model<IRide>('Ride', rideSchema);