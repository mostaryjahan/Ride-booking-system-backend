import { Types } from 'mongoose';

export type RideStatus = 'requested' | 'accepted' | 'rejected' | 'picked_up' | 'in_transit' | 'completed' | 'canceled';

export interface ILocation {
  address: string;
  lat: number;
  lng: number;
}

export interface IRide {
  _id?: string;
  riderId: Types.ObjectId;
  driverId?: Types.ObjectId;
  pickupLocation: ILocation; 
  dropOffLocation: ILocation; 
  fare: number;
  status: RideStatus;
  requestedAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
}