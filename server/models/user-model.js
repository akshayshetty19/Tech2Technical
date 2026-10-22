const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// password hashing
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// json web token
userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        userID: this.id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    return token;
  } catch (error) {
    console.log("Error generating auth token:", error);
    throw error; // error ko externally check karne ke liye
  }
};

// password match

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log("Error matching password");
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
