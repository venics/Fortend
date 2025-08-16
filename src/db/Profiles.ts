import { Schema, model } from "mongoose";

interface IProfile {
    accountId: string;
    profile: any;
}

const ProfileSchema = new Schema<IProfile>({
    accountId: { type: String, required: true, unique: true },
    profile: { type: Object, required: true },
});

const Profiles = model<IProfile>("Profiles", ProfileSchema);

export default Profiles;
