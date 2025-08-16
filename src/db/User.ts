import { Schema, model } from "mongoose";

interface IUser {
  accountId: string;
  email: string;
  password: string;
  username: string;
  banned: boolean;
  discordId: string;
  created: Date;
  vbucks: number;
}

const UserSchema: Schema<IUser> = new Schema({
  accountId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  banned: { type: Boolean, required: false, unique: false, default: false },
  created: { type: Date, required: true, default: Date.now },
  discordId: { type: String, required: false, unique: true },
  vbucks: { type: Number, required: true, default: 0 },
});

const User = model<IUser>("Users", UserSchema);

export default User;
