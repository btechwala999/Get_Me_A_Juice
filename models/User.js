import mongoose from "mongoose";

const {Schema, model} = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String },
    username: { type: String, required: true, unique: true },
    profilepic: { type: String },
    coverpic: { type: String },
    description: { type: String, default: "Creating Videos and Content" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    razorpayid: { type: String },
    razorpaysecret: { type: String },
    provider: { type: String, required: true },
    providerId: { type: String },
    password: { type: String },
    linkedAccounts: [{
        provider: { type: String },
        providerId: { type: String },
        username: { type: String },
        profilepic: { type: String }
    }]
});

UserSchema.methods.hasPassword = function() {
    return !!this.password;
};

// Compound index for email + provider
UserSchema.index({ email: 1, provider: 1 }, { unique: true });

const UserModel = mongoose.models.User || model("User", UserSchema);

export default UserModel;