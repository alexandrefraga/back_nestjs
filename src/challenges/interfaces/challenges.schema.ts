import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema(
  {
    dateTimeChallenge: { type: Date },
    status: { type: String },
    dateTimeSolicitation: { type: Date },
    dateTimeAnswer: { type: Date },
    challenger: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  },
  {
    timestamps: true,
    collection: 'challenges',
  },
);
