import * as mongoose from 'mongoose';

export const CategoriesSchema = new mongoose.Schema(
  {
    category: { type: String, unique: true },
    descryption: String,
    events: [
      {
        event: { type: String },
        operator: String,
        value: Number,
      },
    ],
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  },
  {
    timestamps: true,
    collection: 'categories',
  },
);
