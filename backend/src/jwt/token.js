/*import jwt from "jsonwebtoken";
import User from "../models/user.js";
const generateTokenandsaveincookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.jwt_secret, {
    expriesIn: "10d",
  });

  res.cookie({
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  // id,update,options
  await User.findByIdAndUpdate(userId, { token });
  return token;
};
*/
