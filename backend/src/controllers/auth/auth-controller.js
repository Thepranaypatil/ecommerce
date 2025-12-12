import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

/* ============================================================
   1️⃣ REGISTER USER
   ------------------------------------------------------------
   Steps:
   - Read user data from request body
   - Check if user already exists
   - Hash password using bcrypt
   - Create new user and save to DB
   - Send response
============================================================== */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Step 1: Check if user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists! Please try again",
      });
    }

    // Step 2: Hash the password (salt rounds = 12)
    const hashPassword = await bcrypt.hash(password, 12);

    // Step 3: Create new user object
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    // Step 4: Save user to DB
    await newUser.save();

    // Step 5: Success response
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

/* ============================================================
   2️⃣ LOGIN USER
   ------------------------------------------------------------
   Steps:
   - Read email & password
   - Verify user exists
   - Compare password using bcrypt
   - Create JWT token
   - Store token in httpOnly cookie
   - Return user data
============================================================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Check if user exists
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    // Step 2: Compare password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password!",
      });
    }

    // Step 3: Create JWT token
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" } // 1 hour validity
    );

    // Step 4: Store token in cookie
    res
      .cookie("token", token, {
        httpOnly: true, // prevents frontend JS from accessing the cookie
        secure: process.env.NODE_ENV === "production", // HTTPS in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // required for frontend-hosted apps
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          id: checkUser._id,
          email: checkUser.email,
          role: checkUser.role,
          username: checkUser.username,
        },
      });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

/* ============================================================
   3️⃣ LOGOUT USER
   ------------------------------------------------------------
   Steps:
   - Clear the authentication cookie
   - Send success response
============================================================== */
export const logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .json({
      success: true,
      message: "Logged out successfully!",
    });
};

/* ============================================================
   4️⃣ AUTH MIDDLEWARE
   ------------------------------------------------------------
   Steps:
   - Read JWT token from cookies
   - If missing → block request
   - Verify token using JWT_SECRET
   - Attach decoded user data to req.user
   - Call next()
============================================================== */
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // read token from cookie

  // Step 1: If no token → block request
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    // Step 2: Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 3: Attach decoded details to request
    req.user = decoded;

    next(); // Step 4: Continue
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};
