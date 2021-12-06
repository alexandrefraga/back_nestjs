import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String },
    email: { type: String, unique: true },
    name: String,
    ranking: String,
    position: Number,
    imageUrl: String,
  },
  {
    timestamps: true,
    collection: 'players',
  },
);
