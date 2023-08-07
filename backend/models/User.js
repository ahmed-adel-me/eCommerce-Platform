const { hash, compare } = require("bcryptjs");
const { Schema, model } = require("mongoose");
const { default: isEmail } = require("validator/lib/isemail");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is missing!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is missing!"],
      validate: [isEmail, "Enter a valid email!"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is missing!"],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "confirmPassword is missing!"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match!",
      },
    },
    photo: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      select: false,
      default: true,
    },
    wishList: [
      {
        type: Schema.ObjectId,
        ref: "Product",
        required: [true, "product is required"],
      },
    ],
    passwordChangedAt: Date,
  },
  { toJSON: { versionKey: false } }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    console.log(JWTTimestamp, this.passwordChangedAt);
    return true;
  }
  return false;
};
const User = model("User", userSchema);
module.exports = User;
