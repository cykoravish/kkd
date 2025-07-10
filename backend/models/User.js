import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    userId: { type: String, unique: true },
    phone: { type: String, required: true, unique: true }, //
    email: { type: String, required: true, unique: true }, //
    password: { type: String, required: true },

    profilePick: { type: String, default: "" },
    coinsEarned: { type: Number, default: 0 },
    dob: { type: String, default: "" }, //
    address: { type: String, default: "" }, //
    pinCode: { type: String, default: "" }, //
    state: { type: String, default: "" }, //
    country: { type: String, default: "" }, //
    accountNumber: { type: String, default: "" }, //
    accountHolderName: { type: String, default: "" }, //
    bankName: { type: String, default: "" }, //
    ifscCode: { type: String, default: "" }, //
    passbookPhoto: { type: String, default: "" }, //
    isPassbookVerified: { type: Boolean, default: false },
    panPhoto: { type: String, default: "" },
    isPanVerified: { type: Boolean, default: false }, //
    aadharPhoto: { type: String, default: "" },
    isAadharVerified: { type: Boolean, default: false }, //
    productsQrScanned: [{ type: String }],
  },
  { timestamps: true }
);

// Password hash middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
