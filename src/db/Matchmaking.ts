import { Schema, model } from "mongoose";

interface IMatchmaking {
  status: string;
}

const MatchmakingSchema = new Schema<IMatchmaking>({
  status: { type: String, required: false },
});

const Matchmaking = model<IMatchmaking>("Matchmaking", MatchmakingSchema);

export default Matchmaking;
