const User = require("../Modal/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        hasError: true,
        error: {
          type: "BadRequestError",
          message: "Please give all valid information",
        },
        data: null,
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        hasError: true,
        error: {
          type: "AlreadyExistsError",
          message: "User already registered",
        },
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      hasError: false,
      error: null,
      data: savedUser,
    });
  } catch (err) {
    return res.status(500).json({
      hasError: true,
      error: {
        type: "UnknownRuntimeError",
        message: err.message,
      },
      data: null,
    });
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        hasError: true,
        error: {
          type: "BadRequestError",
          message: "Please give all valid information",
        },
        data: null,
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        hasError: true,
        error: {
          type: "NotFoundError",
          message: "User not found",
        },
        data: null,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        hasError: true,
        error: {
          type: "UnauthorizedError",
          message: "Invalid credentials",
        },
        data: null,
      });
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      hasError: false,
      error: null,
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    return res.status(500).json({
      hasError: true,
      error: {
        type: "UnknownRuntimeError",
        message: err.message,
      },
      data: null,
    });
  }
}

module.exports = {
  signUp,
  signIn,
};
