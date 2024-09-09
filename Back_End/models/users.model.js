import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
  },
  pass_changed_at: {
    type: Date,
  },
  is_activated: {
    type: Boolean,
    default: false,
  }
  
},{timestamps: true});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.pass_changed_at = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePass = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

const User = model("User", userSchema);
export default User;
