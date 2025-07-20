// import jwt from "jsonwebtoken";

// export const generateToken = (res, user, message) => {
//   const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//     expiresIn: "1d", 
//   });

//   return res
//     .status(200)
//     .cookie("token", token, {
//       httpOnly: true,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     }).json({
//         success:true,
//         message,
//         user
//     });
// };

import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",             // ✅ Required for HTTPS in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",  // ✅ Allow cross-origin in prod
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: "/", // ✅ Allow cookie to be sent to all routes
    })
    .json({
      success: true,
      message,
      user,
    });
};

