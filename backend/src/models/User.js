const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema(
  {
    theme: { type: String, default: 'system' },
    notifications: { type: Boolean, default: true },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['Admin', 'Member', 'Guest'],
      default: 'Guest',
    },
    plan: {
      type: String,
      enum: ['Free', 'Basic', 'Pro'],
      default: 'Free',
    },
    preferences: {
      type: preferencesSchema,
      default: () => ({}),
    },
    profile: {
      type: profileSchema,
      default: () => ({}),
    },
    resetToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.methods.toSafeObject = function toSafeObject() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('User', userSchema);

