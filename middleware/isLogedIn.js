import Jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export const isLogedIn = async (req, res, next) => {
    try {
      const token = req.cookies?.accessToken || (req.header("Authorization")?.replace("Bearer ", ""));
      console.log(token)
      if (!token) {
        return res.status(400).json({
          status: "false",
          message: "Unauthorized Request"
        });
      }
  
      const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      if (!decodedToken ) {
        return res.status(401).json({
          status: false,
          message: "Invalid JWT",
        });
      }
  
      console.log(decodedToken)

      const user = await userModel.findOne({ _id: decodedToken.payload }).select("-password -refreshToken");
  
      if (!user) {
        return res.status(401).json({
          status: false,
          message: "User not found"
        });
      }
  
      req.userInfo = user;
  
      next();
    } catch (error) {
      return res.status(401).json({
        status: false,
        error: "UnAuthorized",
        message:"Access Token Expired"
      });
    }
  };
  