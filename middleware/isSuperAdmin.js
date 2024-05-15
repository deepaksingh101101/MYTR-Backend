import userModel from "../models/userModel.js";

// Define a function to check if the user is a super admin
export const isSuperAdmin = async (req, res, next) => {
  try {
    // Access userInfo from the request
    const userInfo = req.userInfo;

    // Assuming userInfo contains the email
    const { email } = userInfo;

    const isSuper = await userModel.findOne({ email });

    if (isSuper?.isSuperAdmin) {
      // If user is super admin, proceed to the next middleware
      next();
    } else {
      // If not a super admin, return a response indicating unauthorized access
      return res.status(403).json({
        status: false,
        message: "Access Forbidden: User is not a super admin",
      });
    }
  } catch (error) {
    // If an error occurs, return a generic server error response
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
